import React from "react";
import { MovieCard } from "../../components/Card";
import Link from "next/link";
import StarSize from "@/app/icons/StarSize-24";
import { Play } from "lucide-react";

const page = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="border border-red-500 w-full h-[1291px] pt-8">
        <div className="w-full h-[882px] border border-red-500">
          <div className="w-full h-[283px] border border-red-500 flex justify-between items-center flex-col">
            <div className="w-full h-[56px] px-5 border border-red-500 flex justify-between items-center">
              <div className="w-[211px] h-[56px] flex justify-between items-center flex-col">
                <div className="w-[211px] h-[33px] flex justify-start items-center text-2xl font-semibold">
                  Wicked
                </div>
                <div className="w-[211px] h-[20px]">
                  {" "}
                  2024.11.26 · PG · 2h 40m
                </div>
              </div>
              <div className="w-[71px] h-[56px] justify-center items-end flex">
                <div className="w-[71px] h-[36px] border border-red-500 flex justify-between items-center ">
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
            <div className="w-full h-[211px] border border-red-500 overflow-hidden relative">
              <img
                src="/img/cheepah.png"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="w-[174px] h-[40px] border border-red-500 absolute bottom-[12px] left-[12px] flex justify-between items-center">
                <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                  <Play className="w-4 h-4" />
                </div>
                <p className="text-white">Play trailer</p> <p className="text-white text-sm font-normal">2:35</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
