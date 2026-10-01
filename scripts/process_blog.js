const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('wp_blog_posts.json', 'utf8'));

const processed = posts.map(p => {
  // Extract iframe src
  const iframeMatch = p.content.rendered.match(/<iframe[^>]+src=["']([^"']+)["'][^>]*>/i);
  let videoUrl = iframeMatch ? iframeMatch[1].replace(/&#038;/g, '&') : null;
  
  // Extract external link
  const linkMatch = p.content.rendered.match(/<a[^>]+href=["']([^"']+)["'][^>]*>(?:Полная статья|Читать далее|Подробнее|Статья)?<\/a>/i);
  const fullArticleUrl = linkMatch ? linkMatch[1] : null;

  // Extract clean text paragraphs
  const cleanContent = p.content.rendered
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<p>\s*<a[^>]+>(?:Полная статья|Читать далее)<\/a>\s*<\/p>/gi, '')
    .replace(/<a[^>]+>(?:Полная статья|Читать далее)<\/a>/gi, '')
    .replace(/<\/p>\s*<p>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  // Clean title
  const cleanTitle = p.title.rendered
    .replace(/&#8212;/g, '—')
    .replace(/&#8211;/g, '–')
    .replace(/&quot;/g, '"')
    .replace(/&#171;/g, '«')
    .replace(/&#187;/g, '»');

  // Slug: provide both a clean english/translit slug and support the original WP slug
  let slug = p.slug;
  if (p.id === 496) {
    slug = 'godovoe-sobranie-uchastnikov-ooo-2026-kak';
  }

  // Format date in Russian
  const d = new Date(p.date);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const formattedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  // Category determination
  let category = 'СМИ и аналитика';
  const lower = (cleanTitle + ' ' + cleanContent).toLowerCase();
  if (lower.includes('налог') || lower.includes('фнс')) {
    category = 'Налоговая безопасность';
  } else if (lower.includes('вэд') || lower.includes('таможен')) {
    category = 'ВЭД и таможня';
  } else if (lower.includes('уголовн') || lower.includes('следств')) {
    category = 'Уголовно-правовая защита';
  } else if (lower.includes('собрание') || lower.includes('ооо') || lower.includes('корпоратив')) {
    category = 'Корпоративное право';
  } else if (lower.includes('субсидиар') || lower.includes('банкрот')) {
    category = 'Субсидиарная ответственность';
  }

  return {
    id: String(p.id),
    slug: slug,
    aliases: [p.slug, decodeURIComponent(p.slug)],
    title: cleanTitle,
    category,
    date: formattedDate,
    rawDate: p.date,
    previewText: p.excerpt.rendered.replace(/<[^>]+>/g, '').replace(/Полная статья/g, '').replace(/\[&hellip;\]/g, '').trim(),
    content: cleanContent,
    videoUrl,
    fullArticleUrl,
  };
});

fs.writeFileSync('lib/data/blog-articles.json', JSON.stringify(processed, null, 2));
console.log('Saved lib/data/blog-articles.json with', processed.length, 'articles');
