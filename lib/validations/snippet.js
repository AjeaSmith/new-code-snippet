import * as z from "zod";
import { languages } from "../constants";

const LanguageEnum = z.enum(languages);

export const SnippetValidation = z.object({
	name: z.string().min(3, { message: "Name must be at least 3 characters." }),
	description: z.string().optional(),
	language: LanguageEnum,
	code: z.string().min(1, { message: "Code is required." }),
});
