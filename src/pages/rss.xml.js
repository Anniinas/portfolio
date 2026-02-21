import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: 'Valokuvaaja | Blogi',
        description: 'Tarinoita ja ajatuksia valokuvauksen maailmasta.',
        site: context.site || 'https://anniina-photo.pages.dev',
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
    });
}
