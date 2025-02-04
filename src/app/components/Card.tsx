import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import Star from "../icons/Star";

interface MovieCardProps {
  src: string;
  name: string;
  rating: number;
  Loading: boolean;
}

export const MovieCard = ({ src, name, rating, Loading }: MovieCardProps) => {
  return (
    <Card className="w-[158px] h-[309px] sm:w-[230px] sm:h-[439px] flex items-center justify-center rounded">
      
      {Loading ? (
        <Skeleton className="h-[309px] w-[158px] rounded" />
      ) : (
        <CardContent className="flex flex-col items-center justify-center overflow-hidden p-0 bg-customcard dark:bg-customcarddark w-[158px] h-[309px] sm:w-[230px] sm:h-[439px]">
          <img
            src={src}
            alt={name}
            className="sm:w-[229.73px] sm:h-[340px] rounded w-[157.5px] h-[233px]"
          />
          <div className="sm:w-[230px] sm:h-[96px] w-[142px] h-[70px] rounded p-2">
            <div className="w-[214px] h-[23px] flex justify-start items-center gap-2">
              <Star />
              {rating}/10
            </div>
            <div className="w-[214px] h-[56px]">{name}</div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
