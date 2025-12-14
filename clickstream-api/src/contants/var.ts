import { config } from "dotenv";

// Load environment variables from .env file
config();

export const PORT = process.env.PORT || 5000;
export const DATABASE_URL = process.env.DATABASE_URL;