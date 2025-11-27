import {type NextRequest, NextResponse} from 'next/server';
import {tatoebaApi} from '@/lib/api';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({error: 'Query parameter is required'}, {status: 400});
    }

    try {
        const response = await tatoebaApi.get('/search', {
            params: {
                from: 'jpn',
                to: 'eng',
                sort:'created',
                query
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Failed to fetch data from Tatoeba API:', error);
        return NextResponse.json({error: 'Failed to fetch data from Tatoeba API'}, {status: 500});
    }
}