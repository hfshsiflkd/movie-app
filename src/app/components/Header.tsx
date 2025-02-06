"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import Image from "next/image";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div className="w-full h-[59px] ">
      <div className="w-full h-[59px] flex justify-center items-center fixed z-40 bg-white dark:bg-black px-4 sm:px-6">
        <div className="w-full max-w-[1280px] h-[36px] flex justify-between items-center">
          <div className="w-[92px] h-[20px] ">
            <Link href="/">
              <Image src="/img/Logo.png" alt="" width={92} height={20} />
            </Link>
          </div>
          <div className="w-[488px] h-[36px] hidden md:flex  flex justify-between items-center">
            <Select>
              <SelectTrigger className="w-[97px] h-[36px] border border-white-500">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="w-[575px] h-[305px]">
                <SelectGroup className="pl-3">
                  <p className="font-semibold text-2xl px-4 py-2">Genres</p>
                  <p className="font-normal text-base px-4 pb-2">
                    See lists of movies by genre
                  </p>
                  <div>
                    <Dropdown />
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="w-[379px] h-[36px] pl-[12px] pr-[12px] flex justify-between items-center border-none rounded group focus-within:ring-2 focus-within:ring-gray-500">
              <Search />
              <Input
                type="Search"
                placeholder="Search"
                className="border-none text-3xl w-[100%] focus-visible:ring-0 shadow-none focus:ring-0"
              />
            </div>
          </div>
          <div className="w-[36px] h-[36px] ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
