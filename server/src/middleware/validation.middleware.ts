import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z as zod, ZodError } from "zod";

function validateResource(schema: AnyZodObject = zod.object({})) {
	return (req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse({
			body: req.body,
			query: req.query,
			params: req.params
		});

		if (!parsed.success) {
			const error: string = JSON.parse(parsed.error.message)
				.reduce((accumulator: string, current: ZodError) => `${accumulator + current.message}|`, "")
				.slice(0, -1);
			return res.status(400).json({ message: error });
		}
		next();
	};
}

export default validateResource;