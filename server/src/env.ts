import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
