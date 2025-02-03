import React from "react";
import { MovieCard } from "../../components/Card";
import Link from "next/link";
import StarSize from "@/app/icons/StarSize-24";
import { Play } from "lucide-react";
import { GenreDiv } from "@/app/components/GenreDiv";
import Nexticon from "@/app/icons/Nexticon";

const page = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-full h-[1291px] pt-8 flex justify-center items-center flex-col">
        <div className="w-full h-[882px]  flex flex-col justify-between items-center xl:w-[1080px]">
          <div className="w-full h-[300px]  flex justify-between items-center flex-col xl:h-[524px]">
            <div className="w-full h-[56px] px-5  flex justify-between items-center">
              <div className="w-[211px] h-[56px] flex justify-between items-center flex-col">
                <div className="w-[211px] h-auto flex justify-start items-center text-2xl font-semibold overflow-hidden">
                  Night
                </div>
                <div className="w-[211px] h-[20px]">
                  {" "}
                  2024.11.26 · PG · 2h 40m
                </div>
              </div>
              <div className="w-[71px] h-[56px] justify-center items-end flex">
                <div className="w-[71px] h-[36px]  flex justify-between items-center ">
                  <StarSize />
                  <div className="w-[43px] h-[36px] flex justify-between items-start flex-col">
                    <div className="w-[43px] h-[20px] flex justify-center items-center font-normal text-sm">
                      6.9<p className="text-gray-500">/10</p>
                    </div>
                    <div className="h-[16px] w-[36px] text-xs text-gray-500">
                      39K
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[211px]  overflow-hidden relative bg-black/40 xl:w-[1080px] xl:h-[428px] xl:flex xl:justify-between xl:items-center xl:bg-transparent xl:mt-8">
              <img
                src="/img/cheepah.png"
                alt=""
                className="xl:w-[290px] xl:h-[428px] hidden xl:block       "
              />
              <div className="xl:block hidden relative">
                <img
                  src="/img/cheepah.png"
                  alt=""
                  className="w-full h-full object-cover bg-black/40 xl:w-[760px] xl:h-[428px] xl:bg-transparent relative"
                />
                <div className="absolute inset-0 bg-black/40  "></div>
                <div className="w-[174px] h-[40px]  absolute bottom-[12px] left-[12px] flex justify-between items-center z-30 ">
                  <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                    <Play className="w-4 h-4" />
                  </div>
                  <p className="text-white">Play trailer</p>{" "}
                  <p className="text-white text-sm font-normal">2:35</p>
                </div>
              </div>
              <img
                src="/img/cheepah.png"
                alt=""
                className="w-full h-full object-cover bg-black/40 xl:w-[760px] xl:h-[428px] xl:bg-transparent xl:hidden"
              />

              <div className="absolute inset-0 bg-black/40  xl:bg-transparent"></div>
              <div className="w-[174px] h-[40px]  absolute bottom-[12px] left-[12px] flex justify-between items-center z-30 xl:hidden ">
                <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                  <Play className="w-4 h-4" />
                </div>
                <p className="text-white">Play trailer</p>{" "}
                <p className="text-white text-sm font-normal">2:35</p>
              </div>
            </div>
          </div>
          <div className="w-[375px] h-[344px] mt-8 mb-5  px-5 flex justify-between xl:w-[1080px] xl:h-[100px] xl:items-center xl:p-0 xl:flex xl:justify-between xl:items-start">
            <div className="w-[100px] h-[144px]  relative overflow-hidden xl:w-[290px] xl:h-[428px] xl:hidden ">
              <img
                src="/img/cheepah.png"
                alt=""
                className="w-[100px] h-[144px] "
              />
            </div>
            <div className="w-[201px] h-86  flex justify-between items-center flex-col xl:w-[1080px] xl:h-[80px] xl:p-0">
              <div className="w-[201px] h-[84px]  flex flex-wrap gap-2 xl:w-[1080px] xl:h-[20px]">
                <GenreDiv text="Fairy Tail" />
                <GenreDiv text="Pop Musical" />
                <GenreDiv text="Fantasy" />
                <GenreDiv text="Musical" />
                <GenreDiv text="Romance" />
              </div>
              <div className="w-[201px] h-[240px]  text-base font-normal xl:w-[1080px] xl:h-[40px]">
                Elphaba, a misunderstood young woman because of her green skin,
                and Glinda, a popular girl, become friends at Shiz University in
                the Land of Oz. After an encounter with the Wonderful Wizard of
                Oz, their friendship reaches a crossroads.
              </div>
            </div>
          </div>
          <div className="w-[335px]  xl:w-[1080px]  ">
            <div className="w-[335px]  pb-3 xl:w-[1080px]  mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center">
              <h1 className="w-[55px]">Director</h1>
              <p>Jon M. Chu</p>
            </div>
            <div className="w-[335px]  pb-3 xl:w-[1080px] mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center">
              <h1 className="w-[55px]">Writers</h1>
              <p>Winnie Holzman ·  Dana Fox · Gregory Maguire</p>
            </div>
            <div className="w-[335px] pb-3 xl:w-[1080px]  mb-[20px] flex gap-[53px] border-b border-b-customGenre items-center">
              <h1 className="w-[55px]"> Stars</h1>
              <p>Cynthia Erivo ·  Ariana Grande · Jeff Goldblum </p>
            </div>
          </div>
        </div>
        <div className="w-[335px] h-[377px]   flex justify-center items-start xl:w-[1080px]">
          <div className="w-[335px] h-[36px] text-2xl font-semibold flex justify-between items-center xl:w-[1080px]">
            More like this
            <button className="w-[120px] h-[36px] px-4 py-2 flex justify-between items-center font-medium text-sm">
              See more
              <Nexticon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
