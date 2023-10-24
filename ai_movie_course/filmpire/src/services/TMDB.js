import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDBApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const tmdbApi = createApi({
  // this name in string is what we pass into the store
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${TMDBApiKey}`,
    }),

    // Get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get searched movie
        if(searchQuery){
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${TMDBApiKey}`
        }

        // Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${TMDBApiKey}`;
        }

        // Get movie by genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${TMDBApiKey}`;
        }

        // Get popular movies
        return `movie/popular?page=${page}&api_key=${TMDBApiKey}`;
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
