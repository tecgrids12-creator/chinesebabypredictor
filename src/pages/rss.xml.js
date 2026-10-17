import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => Number(b.data.publishDate) - Number(a.data.publishDate),
  );
  return rss({
    title: 'Chinese Baby Predictor Blog',
    description: 'Guides on the Chinese gender calendar, lunar dates, accuracy science and finding out your baby’s sex.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      categories: [post.data.category],
      link: `/blog/${post.id}/`,
    })),
    trailingSlash: true,
  });
}
