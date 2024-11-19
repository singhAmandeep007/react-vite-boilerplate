import { z } from "zod";

export const postSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  userId: z.string().min(1),
});

export type TPost = z.infer<typeof postSchema>;
