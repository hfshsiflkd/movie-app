"use client";
import { useRef, useState, FC } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
// import Seemore from "../components/Seemore";
import DetailCard from "@/components/DetailCard";
import { X } from "lucide-react";
interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
}
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

interface HomePageProps {
  nowPlaying: MovieType[];
}

const HomePage: FC<HomePageProps> = ({ nowPlaying }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [trailer, setTrailer] = useState<{ key: string } | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchTrailer = async (movieId: number) => {
    try {
      console.log("Fetching trailer for movie ID:", movieId);

      const trailerRes = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );

      const officialTrailer = trailerRes.data.results.find(
        (video: { type: string; site: string }) =>
          video.type === "Trailer" && video.site === "YouTube"
      );

      if (officialTrailer) {
        setTrailer(officialTrailer);
        setShowTrailer(true);
      } else {
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  console.log(nowPlaying);

  return (
    <>
      <Carousel
        // plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselPrevious className="left-5 sm:left-11 z-20 top-40 xl:top-80" />
        <CarouselContent>
          {nowPlaying.slice(0, 10).map((movie, index) => (
            <CarouselItem key={index} className="p-0">
              <CarouselItem key={index}>
                <div className="relative ">
                  <Card className="w-full sm:w-screen overflow-hidden ">
                    <CardContent className="flex items-center justify-center h-[300px] sm:h-[600px] w-full relative p-0 overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        objectFit="cover"
                        layout="fill"
                      />
                    </CardContent>
                  </Card>
                  <DetailCard movie={movie} fetchTrailer={fetchTrailer} />
                </div>
              </CarouselItem>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-5 sm:right-11 z-20 top-40 xl:top-80" />
      </Carousel>
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowTrailer(false)}
        >
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
      )}
    </>
  );
};

export default HomePage;
