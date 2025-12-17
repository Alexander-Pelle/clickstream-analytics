import type { Product } from "../types/product";

export const PRODUCTS: Product[] = [
    {
      id: "p1",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      currency: "USD",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality. Perfect for music lovers and frequent travelers.",
      features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Foldable design", "Built-in microphone"],
    },
    {
      id: "p2",
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 129.0,
      currency: "USD",
      description: "High-performance mechanical keyboard with RGB backlighting and tactile switches. Ideal for gaming and typing enthusiasts.",
      features: ["Cherry MX switches", "RGB backlighting", "Programmable keys", "USB-C connection", "Aluminum frame"],
    },
    {
      id: "p3",
      name: "Ceramic Coffee Mug",
      category: "Home & Kitchen",
      price: 14.5,
      currency: "USD",
      description: "Handcrafted ceramic coffee mug with ergonomic handle. Keeps your beverages warm longer and adds a touch of elegance to your morning routine.",
      features: ["Handcrafted ceramic", "12 oz capacity", "Microwave safe", "Dishwasher safe", "Ergonomic handle"],
    },
    {
      id: "p4",
      name: "Running Shoes",
      category: "Sports",
      price: 79.99,
      currency: "USD",
      description: "Lightweight running shoes with advanced cushioning and breathable mesh upper. Designed for comfort during long-distance runs.",
      features: ["Breathable mesh upper", "Advanced cushioning", "Lightweight design", "Durable rubber outsole", "Reflective details"],
    },
    {
      id: "p5",
      name: "Canvas Backpack",
      category: "Fashion",
      price: 59.0,
      currency: "USD",
      description: "Stylish and durable canvas backpack with multiple compartments. Perfect for daily commutes, travel, or casual outings.",
      features: ["Durable canvas material", "Padded laptop compartment", "Multiple pockets", "Adjustable straps", "Water-resistant"],
    },
];