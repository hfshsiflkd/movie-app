import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@/components/ui/theme-provider";

import Star from "../icons/Star";

export default function MovieCard() {
  const { setTheme } = useTheme();
  return (
    <Card className=" w-[158px]  h-[309px] sm:w-[230px] sm:h-[439px] flex items-center justify-center rounded " >
      <CardContent className="flex flex-col items-center justify-center overflow-hidden p-0 bg-customcard dark:bg-customcarddark  w-[158px] h-[309px] sm:w-[230px] sm:h-[439px]">
        <img
          src="/img/cheepah.png"
          alt=""
          className=" sm:w-[229.73px]  sm:h-[340px] rounded w-[157.5px] h-[233px]"
        />
        <div className=" sm:w-[230px]  sm:h-[96px] w-[142px] h-[70px]  rounded p-2">
          <div className="w-[214px]  h-[23px] flex justify-start items-center gap-2">
            <Star />
            6.9/10
          </div>
          <div className="w-full w-[214px]  h-[56px]">
            Deer Santa
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
