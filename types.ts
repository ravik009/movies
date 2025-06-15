
export interface Movie {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  posterUrl: string;
  bannerUrl: string;
  duration: string;
  rating: number;
  year: number;
  genres: Genre[];
  trailerUrl?: string; // YouTube embeddable URL is good
  googleDriveLink: string;
  videoSrc: string; // Direct video link or YouTube embeddable URL
  isFeatured?: boolean;
  ageRating?: string;
  type: 'movie' | 'series';
  seasonEpisodeInfo?: string;
}

export const ALL_GENRES = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"] as const;

// Infer Genre type from ALL_GENRES
export type Genre = typeof ALL_GENRES[number];

export type SortOption = "latest" | "year" | "title";
