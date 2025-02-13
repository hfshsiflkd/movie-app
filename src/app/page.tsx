"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Seemore from "../components/Seemore";
import HomePage from "@/components/homepage/Home";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

export default function Home() {
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const [topRated, setTopRated] = useState<MovieType[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MovieType[]>([]);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        setLoading(true);

        const [upcomingRes, popularRes, topRatedRes, nowPlayingRes] =
          await Promise.all([
            axios.get(`${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`, {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }),
            axios.get(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }),
            axios.get(
              `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${TMDB_API_KEY}`,
                },
              }
            ),
            axios.get(
              `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
              {
                headers: {
                  Authorization: `Bearer ${TMDB_API_KEY}`,
                },
              }
            ),
          ]);

        setUpcomingMovies(upcomingRes.data.results);
        setPopularMovies(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
        setNowPlaying(nowPlayingRes.data.results);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.status_message || "Error fetching data"
          );
        }
      }
    };

    getMovieData();
  }, []);

  return (
    <div className="w-full h-auto flex justify-between items-center flex-col mb-10 gap-12 sm:gap-20">
      <HomePage nowPlaying={nowPlaying} />

      <Seemore
        movies={upcomingMovies}
        title={"Upcoming"}
        loading={false}
        link="/category/upcoming/1"
      />
      <Seemore
        movies={popularMovies}
        title={"Popular"}
        loading={false}
        link="/category/popular/1"
      />
      <Seemore
        movies={topRated}
        title={"Top Rated"}
        loading={false}
        link="/category/top_rated/1"
      />
    </div>
  );
}
