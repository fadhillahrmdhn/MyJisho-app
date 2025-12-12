'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { JishoResponse } from '@/interfaces';
import { fetchJishoData } from '@/services';
import { ContohKalimat } from '@/app/_components';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const DetailPage = () => {
  const { slug: encodedSlug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = decodeURIComponent(encodedSlug);
  const encodedItem = searchParams.get('item'); // Ambil 'item' dari query param, default ke '0'
  let index: string = '0';

  if (encodedItem) {
    try {
      index = atob(encodedItem);
    } catch (e) {
      console.error('we have an error', e);
    }
  }
  const { data, isLoading, error } = useQuery<JishoResponse>({
    queryKey: ['detail', slug],
    queryFn: () => fetchJishoData({ search: slug }),
    enabled: !!slug,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const detailItem = data?.data?.[Number(index)];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Failed to load data.</div>}
      {detailItem && (
        <div className="space-y-8">
          <div className="p-6 bg-card text-card-foreground rounded-lg border shadow-sm">
            {/* Japanese Word and Reading */}
            <div className="flex flex-col">
              {detailItem.japanese.map((item, idx) => (
                <div key={idx} className="flex items-end gap-2">
                  <h1 className="text-5xl font-bold">{item.word || slug}</h1>
                  <p className="text-xl text-muted-foreground">{item.reading}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 my-3.5">
                {detailItem.senses[0].parts_of_speech.map((pos, posIdx) => (
                  <Badge key={posIdx} variant="secondary">
                    {pos}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Senses / Definitions */}
            <div className="space-y-4">
              {detailItem.senses.map((sense, idx) => (
                <div key={idx} className="border-t ">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-muted-foreground">{idx + 1}.</span>
                    <p className="text-lg">{sense.english_definitions.join('; ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Sentences */}
          <div className="p-6 bg-card text-card-foreground rounded-lg border shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Example Sentences</h2>
            <Separator className="mb-4" />
            <ContohKalimat text={detailItem.japanese[0]?.word || slug} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
