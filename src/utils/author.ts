import { getCollection } from 'astro:content'

export const getAuthor = async () => await getCollection('author')
