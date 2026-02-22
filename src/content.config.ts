import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.coerce.date(),
        image: z.string().optional(),
        alt: z.string().optional(),
    }),
});

const events = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/events" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        location: z.string(),
        description: z.string().optional(),
    }),
});

const portfolio = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/portfolio" }),
    schema: z.object({
        title: z.string(),
        image: z.string(),
        category: z.string(),
    }),
});

export const collections = { blog, events, portfolio };
