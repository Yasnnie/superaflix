interface Upload {
  id: number;
  file_name: string;
  uploaded_at: string;
  status: string;
  success_count: number;
  error_count: number;
  processing_duration?: string;
  start_time: string;
  end_time: string;
}

interface Movie {
  movieid: number;
  title: string;
  genres: string;
  average_rating?: number;
  num_votes: number;
  link: {
    imdbid: string;
    tmdbid: string;
  };
}

interface Filters {
  search: string;
  min_votes: string;
  min_rating: string;
  genres: string;
  year_start: string;
  year_end: string;
}
