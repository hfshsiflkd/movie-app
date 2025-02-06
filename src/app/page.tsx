"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Nexticon from "./icons/Nexticon";
import { MovieCard } from "./components/Card";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import StarSize from "./icons/StarSize-24";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/legacy/image";
import Seemore from "./components/Seemore";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface PopularMoviesType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

interface UpcomingMoviesType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
}
interface top_ratedType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
interface nowPlayingType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

export default function Home() {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popularmovies, setpopularMovies] = useState<PopularMoviesType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMoviesType[]>(
    []
  );
  const [top_rated, settop_rated] = useState<top_ratedType[]>([]);
  const [nowPlaying, setNowPlaying] = useState<nowPlayingType[]>([]);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const getMovieData = async () => {
    try {
      setLoading(true);

      const upcomingResponse = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const popularResponse = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const top_rated = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const NowPlayingMovie = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      setUpcomingMovies(upcomingResponse.data.results);
      setpopularMovies(popularResponse.data.results);
      settop_rated(top_rated.data.results);
      setNowPlaying(NowPlayingMovie.data.results);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message);
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const formatNumber = (num: number): number => parseFloat(num.toFixed(1));

  return (
    <>
      <div className="w-full h-auto flex justify-between items-center flex-col mb-10 gap-12 sm:gap-20  ">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          {/* <CarouselPrevious className="absolute left-5 sm:left-11 z-20" /> */}

          <CarouselPrevious className="left-5 sm:left-11 z-20 top-40 xl:top-80" />
          <CarouselContent>
            {nowPlaying.slice(0, 10).map((movie, index) => (
              <CarouselItem key={index}>
                <div className=" relative">
                  <Card className="w-full sm:w-screen overflow-hidden">
                    <CardContent className="flex items-center justify-center h-[300px] sm:h-[600px] w-full relative p-0 overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        // className="w-full min-h-full object-cover"
                        objectFit="cover"
                        layout="fill"
                      />
                    </CardContent>
                  </Card>
                  <div className="w-full h-[264px]   p-5 flex flex-col justify-between xl:absolute xl:top-40 xl:text-white xl:left-60">
                    <div className="  xl:w-[335px] flex justify-between items-center xl:text-white ">
                      <div className="w-[252px]  ">
                        <p className="text-sm font-normal">Now Playing:</p>
                        <h1 className="text-2xl font-semibold">
                          {movie.title}
                        </h1>
                      </div>
                      <div className="w-[83px] h-[52px]  flex justify-between items-center">
                        <div className="w-[71px] h-[36px]  flex justify-center items-center ">
                          <StarSize />
                          <div className="w-[43px] h-[36px] flex justify-center items-between flex-col">
                            <div className="w-[43px] h-[20px] flex justify-center items-center font-normal text-sm">
                              {formatNumber(movie.vote_average)}
                              <p className="text-gray-500">/10</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[335px] h-[100px]  overflow-hidden ">
                      <p className="text-customText dark:text-white xl:text-white ">
                        {movie.overview}
                      </p>
                    </div>
                    <div className="w-[335px] h-[52px]  flex justify-between items-center">
                      <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
                        <Play className="w-4 h-4" /> Watch Trailer
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-5 sm:right-11 z-20 top-40 xl:top-80" />
        </Carousel>
        <Seemore
          movies={upcomingMovies}
          title={"Upcoming"}
          loading={false}
          link="/category/upcoming"
        />
        <Seemore
          movies={popularmovies}
          title={"Popular"}
          loading={false}
          link="/category/popular"
        />
        <Seemore
          movies={top_rated}
          title={"Top Rated"}
          loading={false}
          link="/category/top_rated"
        />
      </div>
    </>
  );
}
