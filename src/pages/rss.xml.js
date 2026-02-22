import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const posts = await getCollection('blog');

    return rss({
        title: 'Valokuvaaja | Blogi',
        description: 'Tarinoita ja ajatuksia valokuvauksen maailmasta.',
        site: context.site || 'https://anniina-photo.pages.dev',
        items: posts.map((post) => {
            const content = parser.render(post.body);
            // Append main image to content if available
            const imageHtml = post.data.image ? `<img src="${new URL(post.data.image, context.site)}" alt="${post.data.alt || ''}" /><br/>` : '';

            return {
                title: post.data.title,
                pubDate: post.data.date,
                description: post.data.description,
                link: `/blog/${post.id}/`,
                content: imageHtml + content,
            };
        }),
        customData: `<language>fi-fi</language>`,
    });
}
