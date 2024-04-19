import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 charactors" }),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 charactors" }),
});

export const postValidation = z.object({
  caption: z.string().min(5).max(2000),
  file: z.custom<File[]>(),
  location: z.string().max(2000),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
