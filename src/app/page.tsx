"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Nexticon from "./icons/Nexticon";
import MovieCard from "./components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default function Home() {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popularmovies, setpopularMovies] = useState([]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const getMovieData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setpopularMovies(response.data.results);
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

  return (
    <div className="w-full h-auto flex justify-between items-center flex-col mb-10 gap-12 sm:gap-20 ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselPrevious className="absolute left-5 sm:left-11 z-20" />
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1 relative">
                <Card className="w-full sm:w-screen overflow-hidden">
                  <CardContent className="flex  items-center justify-center  h-[300px] sm:h-[600px] w-full object-fill relative p-0">
                    <img
                      src="/img/moon.png"
                      alt=""
                      className="object-fill w-screen h-screen"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-5 sm:right-11 z-20" />
      </Carousel>

      <div className="w-full sm:w-[1440px] h-auto sm:h-[978px] px-5 sm:px-20 flex justify-between items-center flex-col ">
        <div className="w-full sm:w-[1277px] h-[36px] flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold leading-24">
            Upcoming
          </h1>
          <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium">
            See more
            <Nexticon />
          </button>
        </div>
        <div className="w-[350px] sm:w-[1277px] h-auto sm:h-[910px]  flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
          <MovieCard />
          <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
        </div>
      </div>

      <div className="w-full sm:w-[1440px] h-auto sm:h-[978px] px-5 sm:px-20 flex justify-between items-center flex-col space-y-8">
        <div className="w-full sm:w-[1277px] h-[36px] flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold leading-24">
            Upcoming
          </h1>
          <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium">
            See more
            <Nexticon />
          </button>
        </div>
        <div className="w-[350px] sm:w-[1277px] h-auto sm:h-[910px] flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
          <MovieCard />
          <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
        </div>
      </div>

      <div className="w-full sm:w-[1440px] h-auto sm:h-[978px] px-5 sm:px-20 flex justify-between items-center flex-col space-y-8">
        <div className="w-full sm:w-[1277px] h-[36px] flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold leading-24">
            Upcoming
          </h1>
          <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium">
            See more
            <Nexticon />
          </button>
        </div>
        <div className="w-[350px] sm:w-[1277px] h-auto sm:h-[910px] flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
          <MovieCard />
          <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
          <MovieCard /> <MovieCard /> <MovieCard /> <MovieCard />
        </div>
      </div>
    </div>
  );
}
