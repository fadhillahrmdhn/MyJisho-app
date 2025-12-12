import { type NextRequest, NextResponse } from 'next/server';
// @ts-ignore: no type declarations for 'kuroshiro'
import Kuroshiro from 'kuroshiro';
// @ts-ignore: no type declarations for 'kuroshiro-analyzer-kuromoji'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';


export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  try {
    
  // Instantiate
  const kuroshiro = new Kuroshiro();
  // Initialize
  // Here uses async/await, you could also use Promise
  await kuroshiro.init(new KuromojiAnalyzer());
  // Convert what you want
  const result = await kuroshiro.convert(text, { to: 'romaji', mode: 'spaced' });
    return NextResponse.json({ result });

  } catch (error) {
    console.error('Failed to convert text to romaji:', error);
    return NextResponse.json({ error: 'Failed to convert text to romaji' }, { status: 500 });
  }
}
