import { z, defineCollection } from 'astro:content'

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.array(z.string()),
    draft: z.optional(z.boolean()),
  }),
})

export const collections = {
  posts: postCollection,
}
