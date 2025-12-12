// Interface utama untuk response Jisho API
export interface JishoResponse {
  meta: {
    status: number;
  };
  data: WordEntry[];
}

// Setiap entri kata
export interface WordEntry {
  slug: string;
  is_common: boolean;
  tags: string[];
  jlpt: string[];
  japanese: JapaneseWord[];
  senses: Sense[];
  attribution: Attribution;
}

// Bentuk kata Jepang
export interface JapaneseWord {
  word?: string;   // bisa kosong, kadang hanya reading
  reading: string;
}

// Definisi dan informasi tambahan
export interface Sense {
  english_definitions: string[];
  parts_of_speech: string[];
  links: Link[];
  tags: string[];
  restrictions: string[];
  see_also: string[];
  antonyms: string[];
  source: string[];
  info: string[];
  sentences?: string[];
}

// Link ke Wikipedia atau sumber lain
export interface Link {
  text: string;
  url: string;
}

// Atribut sumber data
export interface Attribution {
  jmdict: boolean;
  jmnedict: boolean;
  dbpedia: boolean | string;
}
