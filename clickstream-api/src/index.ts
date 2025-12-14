import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import { ClickStreamEvent } from "./interfaces/events";
import { PageStat } from "./interfaces/page";
import { INVALID_REQUEST, INTERNAL_SERVER_ERROR, SUCCESSFULLY_CREATED, SUCCESSFULLY_FETCHED } from "./contants/status_codes";
import { PORT, DATABASE_URL } from "./contants/var";

const LOCAL_FRONTEND_URL = "http://localhost:3000";
const LOCAL_DEV_URL = "http://localhost:5173";

if (!DATABASE_URL) {
    console.error("DATABASE_URL env var is not set");
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
})

const app = express();

app.use(
    cors(
        {origin: [LOCAL_FRONTEND_URL, LOCAL_DEV_URL],}
    )
);
app.use(express.json());


// DB INIT
async function initDb() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS click_events (
        id           SERIAL PRIMARY KEY,
        session_id   TEXT    NOT NULL,
        event_type   TEXT    NOT NULL,
        user_id      TEXT,
        timestamp_ms BIGINT  NOT NULL,
        page         TEXT    NOT NULL,
        element      TEXT    NOT NULL,
        metadata     JSONB
      );
    `);
    console.log("Database initialized (click_events table ready).");
}

// Routes
app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ message: "Clickstream API is running" });
});

app.post("/events", async (req: Request, res: Response)=> {
    const body = req.body as Partial<ClickStreamEvent>;
    if (
        !body ||
        typeof body.sessionId !== "string" ||
        typeof body.eventType !== "string" ||
        typeof body.timestamp !== "number" ||
        typeof body.page !== "string" ||
        typeof body.element !== "string"
    ) {
        return res.status(INVALID_REQUEST).json({error: "Invalid request body"});
    }

    const event: ClickStreamEvent = {
        sessionId: body.sessionId,
        eventType: body.eventType,
        timestamp: body.timestamp,
        page: body.page,
        element: body.element,
        userId: body.userId ?? null,
        metadata: body.metadata ?? {},
    }

    try {
        await pool.query(
            `
                INSERT INTO click_events
                    (session_id, event_type, user_id, timestamp_ms, page, element, metadata)
                VALUES
                    ($1,         $2,         $3,      $4,           $5,   $6,      $7)
            `,
        [event.sessionId, event.eventType, event.userId, event.timestamp, event.page, event.element, event.metadata]
        );
    } 
    catch (error) {
        console.error("Error saving event to database:", error);
        return res.status(INTERNAL_SERVER_ERROR).json({error: "Failed to save event to database"});
    }

    return res.status(SUCCESSFULLY_CREATED).
        json({message: "Event created successfully"});
})

app.get("/stats/summary", async (_req: Request, res: Response)=> {
    try {
        const totalEvents = await pool.query(`
            SELECT COUNT(*)::bigint AS total FROM click_events
        `);
        const countByPage = await pool.query(`
            SELECT page, COUNT(*)::bigint AS count
            FROM click_events
            GROUP BY page
            ORDER BY count DESC;
        `);   
        
        const total = Number(totalEvents.rows[0].total);

        const byPage: PageStat[] = countByPage.rows.map((row) => ({
            page: row.page,
            count: Number(row.count),
        }));

        return res.status(200).json({
            total,
            byPage,
        });
        
    }

    catch (error) {
        console.error("Error fetching stats:", error);
        return res.status(INTERNAL_SERVER_ERROR).json({error: "Failed to fetch stats"});
    }
})

app.get("/events", async (_req: Request, res: Response)=> {
    const limit = Math.min(Number(_req.query.limit) || 100, 1000); // MAYBE REMOVE THE MATH OPERATION
    try{
        const result = await pool.query(
            `
            SELECT
              id,
              session_id   AS "sessionId",
              event_type   AS "eventType",
              user_id      AS "userId",
              timestamp_ms AS "timestamp",
              page,
              element,
              metadata
            FROM click_events
            ORDER BY id DESC
            LIMIT $1;
            `,
            [limit]
        );

        return res.status(SUCCESSFULLY_FETCHED).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        return res.status(INTERNAL_SERVER_ERROR).json({error: "Failed to fetch events"});
    }
})

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Clickstream API is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
