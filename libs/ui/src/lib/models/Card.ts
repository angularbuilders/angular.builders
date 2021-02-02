export interface Card {
  title: string;
  description: string;
  image?: string;
  url?: string;
  params?: Record<string, unknown>;
  tag?: string;
}
