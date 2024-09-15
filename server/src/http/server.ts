import fastify from "fastify";

const app = fastify();
const port = 3333;

app
	.listen({
		port,
	})
	.then(() => {
		console.log(`HTTP server running in http://localhost:${port}`);
	});
