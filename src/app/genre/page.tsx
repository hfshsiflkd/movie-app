"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";



const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Page = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const [, setLoading] = useState(false);
  const [, setError] = useState("");

  const getMovieData = async () => {
    try {
      setLoading(true);
      const genreResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
    //   const genreMovie = await axios.get(
    //     `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genres}&page=${Page}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${TMDB_API_KEY}`,
    //       },
    //     }
    //   );
    //   setGenreMovie(genreMovie.data.result);
      setGenres(genreResponse.data.genres);
      console.log(genreResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message || "Алдаа гарлаа.");
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);
  return (
    <div className="w-full px-5">
      <div>Search Filter</div>
      <div className="w-auto h-auto">
        <div className="flex justify-between items-start flex-col">
          <div>Genre</div>
          <div>See list of movies by genre</div>
        </div>
        <div className="flex flex-wrap">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold "
            >
              {genre.name}
              <ChevronRight className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div>81 titles in “Animation”</div>
        <div><Card/></div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
