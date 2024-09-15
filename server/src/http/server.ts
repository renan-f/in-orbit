import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoal } from "../functions/create-goal";
import z from "zod";

const port = 3333;
const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
	"/goals",
	{
		schema: {
			body: z.object({
				title: z.string(),
				desiredWeeklyFrequency: z.number().int().min(1).max(7),
			}),
		},
	},
	async (request) => {
		const { title, desiredWeeklyFrequency } = request.body;
		await createGoal({ title, desiredWeeklyFrequency });
	},
);

app
	.listen({
		port,
	})
	.then(() => {
		console.log(`HTTP server running in http://localhost:${port}`);
	});
