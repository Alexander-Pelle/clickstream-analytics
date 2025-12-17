export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    currency: string;
    description?: string;
    features?: string[];
};