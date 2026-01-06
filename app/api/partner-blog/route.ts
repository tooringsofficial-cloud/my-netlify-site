import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://rss.blog.naver.com/semusatax.xml');
    
    // [수정] 무조건 최신글 9개를 긁어옵니다. (더미 없이 실제 데이터만)
    const items = feed.items.slice(0, 9).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      snippet: item.contentSnippet?.slice(0, 100) + '...', 
    }));

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: '블로그 글을 가져오는데 실패했습니다.' }, { status: 500 });
  }
}