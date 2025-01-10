export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  time: number;
  by: string;
  descendants: number;
}

export interface Story {
  objectID: string;
  title: string;
  url: string;
  points: number;
  created_at: string;
  author: string;
  num_comments: number;
}