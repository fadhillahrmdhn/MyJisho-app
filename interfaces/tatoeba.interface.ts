// Interface untuk satu hasil terjemahan
interface Translation {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script?: string | null;
  lang_name: string;
  dir: string;
  lang_tag: string;
}

// Interface untuk transkripsi (furigana, romanisasi, dll.)
interface Transcription {
  id: number;
  sentence_id: number;
  script: string;
  text: string;
  lang_tag: string;
  html?: string;
  needsReview: boolean;
}

// Interface untuk satu hasil kalimat
export interface TatoebaResult {
  id: number;
  text: string;
  lang: string;
  correctness: number;
  script?: string | null;
  license: string;
  translations: Translation[][]; // biasanya nested array (direct vs indirect)
  transcriptions: Transcription[];
  user?: {
    username: string;
  };
  lang_name: string;
  dir: string;
  lang_tag: string;
}

// Interface untuk response utama
export interface TatoebaResponse {
  paging: {
    Sentences: {
      page: number;
      count: number;
      perPage: number;
      pageCount: number;
      sort: string;
      direction: string;
    };
  };
  results: TatoebaResult[];
}
