export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date?: string;
  author?: string;
  category?: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Новость 1",
    description: "Краткое описание новости 1",
    date: "2024-01-15",
    author: "Автор 1",
    category: "Технологии",
  },
  {
    id: 2,
    title: "Новость 2", 
    description: "Краткое описание новости 2",
    date: "2024-01-14",
    author: "Автор 2",
    category: "Бизнес",
  },
  {
    id: 3,
    title: "Новость 3",
    description: "Краткое описание новости 3",
    date: "2024-01-13",
    author: "Автор 3",
    category: "Наука",
  },
];