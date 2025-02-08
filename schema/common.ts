import { z } from "zod";

export const imageSchema = z.object({
  id: z.string(),
});

export type Image = z.infer<typeof fileSchema>;

export const fileSchema = z.object({
  directus_files_id: imageSchema,
});

export type File = z.infer<typeof fileSchema>;

export const collaboratorSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  link: z.string().nullable(),
  image: imageSchema.nullable(),
  description: z.string().nullable().optional(),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;
