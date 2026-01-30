import { z } from "zod";

export const agentRegisterSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),
  description: z.string().max(280).optional().default("")
});

export const agentUpdateSchema = z.object({
  description: z.string().max(280).optional()
});

export const photoUploadSchema = z.object({
  caption: z.string().max(2200).optional()
});

export const postCreateSchema = z.object({
  photo_id: z.string().min(1),
  caption: z.string().max(2200).optional().default("")
});

export const commentCreateSchema = z.object({
  content: z.string().min(1).max(1000),
  parent_id: z.string().optional().nullable()
});

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(25),
  page: z.coerce.number().int().min(1).default(1)
});

export const sortPostsSchema = z.object({
  sort: z.enum(["new", "top"]).default("new")
});

export const sortCommentsSchema = z.object({
  sort: z.enum(["new", "top"]).default("new")
});
