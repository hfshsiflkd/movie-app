"use client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/legacy/image";
import Seemore from "../components/Seemore";
import DetailCard from "../components/DetailCard";
import { X } from "lucide-react";
import { useParams } from "next/navigation";

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
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [popularmovies, setpopularMovies] = useState<PopularMoviesType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMoviesType[]>(
    []
  );
  const [top_rated, settop_rated] = useState<top_ratedType[]>([]);
  const [nowPlaying, setNowPlaying] = useState<nowPlayingType[]>([]);
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
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
        const Trailer = await axios.get(
          `${TMDB_BASE_URL}/movie/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
            },
          }
        );
        const videos = Trailer.data.results;
        const officialTrailer = videos.find(
          (video: { type: string; site: string }) =>
            video.type.toLowerCase() === "trailer" &&
            video.site.toLowerCase() === "youtube"
        );
        if (officialTrailer) {
          setTrailer(officialTrailer);
          setShowTrailer(true);
        }
        setTrailer(officialTrailer);

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

    getMovieData();
  }, [id]);
  useEffect(() => {
    if (!id) return;
    console.log("Fetched Movie ID:", id);
  }, [id]);
  console.log("Movie ID:", id);
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
                  <DetailCard movie={movie} setShowTrailer={setShowTrailer} />
                </div>
                {showTrailer && trailer?.key ? (
                  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <iframe
                      width="800"
                      height="450"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="Trailer"
                      allowFullScreen
                    ></iframe>
                    <X
                      onClick={() => setShowTrailer(false)}
                      className="absolute top-4 right-4 text-white cursor-pointer"
                    />
                  </div>
                ) : (
                  showTrailer && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                      <p className="text-white text-xl">Трейлер олдсонгүй!</p>
                      <X
                        onClick={() => setShowTrailer(false)}
                        className="absolute top-4 right-4 text-white cursor-pointer"
                      />
                    </div>
                  )
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-5 sm:right-11 z-20 top-40 xl:top-80" />
        </Carousel>

        <Seemore
          movies={upcomingMovies}
          title={"Upcoming"}
          loading={false}
          link="/category/upcoming/1"
        />
        <Seemore
          movies={popularmovies}
          title={"Popular"}
          loading={false}
          link="/category/popular/1"
        />
        <Seemore
          movies={top_rated}
          title={"Top Rated"}
          loading={false}
          link="/category/top_rated/1"
        />
      </div>
    </>
  );
}
