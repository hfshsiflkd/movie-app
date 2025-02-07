import React from "react";
import { Play } from "lucide-react";
import StarSize from "../app/icons/StarSize-24";
import { FC } from "react";
interface movie {
  title: string;
  vote_average: number;
  overview: string;
}

const DetailCard: FC<{ movie: movie }> = ({ movie }) => {
  const formatNumber = (num: number): number => parseFloat(num.toFixed(1));
  return (
    <div className="w-full h-[264px]   p-5 flex flex-col justify-between xl:absolute xl:top-40 xl:text-white xl:left-40">
      <div className="  xl:w-[335px] flex justify-between items-center xl:text-white ">
        <div className="w-[252px]  ">
          <p className="text-sm font-normal">Now Playing:</p>
          <h1 className="text-2xl font-semibold">{movie.title}</h1>
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
  );
};

export default DetailCard;
