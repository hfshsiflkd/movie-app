// DetailCard.tsx
import React, { FC } from "react";
import { Play } from "lucide-react";
import StarSize from "../app/icons/StarSize-24";


interface Movie {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
}

// interface DetailCardProps {
//   movie: Movie;
//   setShowTrailer: (show: boolean) => void;
// }

interface DetailCardProps {
  movie: Movie;
  setShowTrailer: (show: boolean) => void;
}

const DetailCard: FC<DetailCardProps> = ({ movie }) => {
  const formatNumber = (num: number): number => parseFloat(num.toFixed(1));

  return (
    <div className="w-full h-[264px] p-5 flex flex-col justify-between xl:absolute xl:top-40 xl:text-white xl:left-40">
      <div className="xl:w-[335px] flex justify-between items-center xl:text-white">
        <div className="w-[252px]">
          <p className="text-sm font-normal">Одоо гарч байгаа:</p>
          <h1 className="text-2xl font-semibold">{movie.title}</h1>
        </div>
        <div className="w-[83px] h-[52px] flex justify-between items-center">
          <div className="w-[71px] h-[36px] flex justify-center items-center">
            <StarSize />
            <div className="w-[43px] h-[36px] flex justify-center flex-col">
              <div className="w-[43px] h-[20px] flex justify-center items-center font-normal text-sm">
                {formatNumber(movie.vote_average)}
                <p className="text-gray-500">/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[335px] h-[100px] overflow-hidden">
        <p className="text-customText dark:text-white xl:text-white">
          {movie.overview}
        </p>
      </div>

      <div className="w-[335px] h-[52px] flex justify-between items-center">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
          // onClick={() => setShowTrailer(true)}
        >
          <Play className="w-4 h-4" /> Трейлер Үзэх
        </button>
      </div>
    </div>
  );
};

export default DetailCard;
