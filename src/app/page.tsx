"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselPrevious className="absolute  left-11 z-20" />
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1 relative">
                <Card className="w-screen overflow-hidden">
                  <CardContent className="flex aspect-square items-center justify-center p-6  h-[600px] w-screen object-fill relative">
                    <img src="/img/moon.png" alt="" className="object-fill" />
                  </CardContent>
                </Card>
               
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext  className="absolute  right-11 z-20"/>
      </Carousel>
    </div>
  );
}
