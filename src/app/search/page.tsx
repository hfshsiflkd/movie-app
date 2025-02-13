"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Star from "../icons/Star";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("searching");
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const [totalPage, SetTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const startPage = Math.max(0, currentPage - 2);
  const slicePage = 3;
  const endPage = Math.min(totalPage, startPage + slicePage);

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const selectedGenreIds = useMemo(
    () => searchParams.get("genresId")?.split(",") || [],
    [searchParams]
  );

  interface Movie {
    vote_average: number;
    poster_path: string | null;
    id: number;
    title: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [searchQuary, setSearchquary] = useState("");
  // const router = useRouter();

  const getMovieData = useCallback(async () => {
    try {
      setLoading(true);

      const genreFilter =
        selectedGenreIds.length > 0
          ? `&with_genres=${selectedGenreIds.join(",")}`
          : "";

      console.log(
        "Явуулах хүсэлт:",
        `${TMDB_BASE_URL}/search/movie?query=${query}&language=en&page=${currentPage}${genreFilter}`
      ); // 🔴 URL зөв үү?

      const [genreListResponse, search] = await Promise.all([
        axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
          headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
        }),
        axios.get(
          `${TMDB_BASE_URL}/search/movie?query=${query}&language=en&page=${currentPage}${genreFilter}`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
          }
        ),
      ]);

      console.log("Буцаагдсан өгөгдөл:", search.data.results); // 🔴 API-аас кино ирж байна уу?

      SetTotalPage(search.data.total_pages);
      setGenres(genreListResponse.data.genres);
      setMovies(search.data.results);
      setTotalResults(search.data.total_results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        setError(error.response?.data.status_message || "Алдаа гарлаа.");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedGenreIds, query, currentPage]);

  useEffect(() => {
    console.log("useEffect ажиллалаа:", {
      query,
      currentPage,
      selectedGenreIds,
    });
    setSearchquary(query || "");
    getMovieData();
  }, [query, currentPage, selectedGenreIds, getMovieData]);

  useEffect(() => {
    console.log("🎥 Кино жагсаалт шинэчлэгдсэн:", movies);
  }, [movies]); // ❗ Энэ нь кино жагсаалт шинэчлэгдэж байгаа эсэхийг шалгана

  const handleGenreSelection = (genreId: number) => {
    const genreIdStr = genreId.toString();
    let updatedGenres = [...selectedGenreIds];

    if (updatedGenres.includes(genreIdStr)) {
      updatedGenres = updatedGenres.filter((id) => id !== genreIdStr);
    } else {
      updatedGenres.push(genreIdStr);
    }

    console.log("Шинэчлэх жанрууд:", updatedGenres); // 🔴 Энэ нь зөв өөрчлөгдөж байна уу?

    const queryParams = new URLSearchParams(searchParams.toString());

    if (updatedGenres.length > 0) {
      queryParams.set("genresId", updatedGenres.join(","));
    } else {
      queryParams.delete("genresId");
    }

    console.log("Шинэчлэх URL:", `/search/?${queryParams.toString()}`); // 🔴 Query string зөв байна уу?

    router.push(`/search/?${queryParams.toString()}`);
  };
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      const genreIds = searchParams.get("genresId") || "";
      router.push(`search?genresId=${genreIds}&page=${pageNumber}`);
    }
  };

  console.log(query);
  console.log(searchQuary);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full px-5 p-8 xl:w-[1280px] flex flex-wrap justify-between">
        <div className="mb-8 text-2xl font-semibold xl:w-[1280px] xl:h-[36px] xl:mb-10">
          Search Result {searchQuary && `for "${searchQuary}"`}
        </div>

        <div className="flex flex-col justify-center items-start ">
          <div className="text-xl font-semibold mt-8 xl:mt-0">
            {totalResults} results for {query}
          </div>
          <div className="flex flex-col items-end  ">
            <div className="w-[350px] sm:w-[806px] h-auto flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px] my-10">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <Link href={`/detail/${movie.id}`} key={movie.id}>
                    <Card className="w-[158px] h-[309px] sm:w-[165px] sm:h-[330px] flex items-center justify-center rounded-xl">
                      <CardContent className="flex flex-col items-center justify-center overflow-hidden p-0 bg-customcard dark:bg-customcarddark w-[158px] h-[309px] sm:w-[230px] sm:h-[330px] rounded-xl">
                        {movie.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={165}
                            height={244}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-700">
                            No Image
                          </div>
                        )}
                        <div className="sm:w-[165px] sm:h-[87px] w-[142px] h-[70px] rounded p-2">
                          <div className="w-[149px] h-[23px] flex justify-start items-center gap-2">
                            <Star />
                            {movie.vote_average}/10
                          </div>
                          <div className="w-[149px] h-[56px] truncate">
                            {movie.title}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-center text-gray-500 text-lg">
                  No results found {searchQuary && `for "${searchQuary}"`}
                </div>
              )}
            </div>
            <div className="xl:w-[110px] xl:h-[40px] flex justify-end items-end xl:mr-10">
              <Pagination className="w-auto float-right">
                <PaginationContent className="">
                  <PaginationItem>
                    <PaginationPrevious
                      className={`${
                        currentPage === 1 && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {[...Array(totalPage).keys()]
                    .slice(startPage, endPage)
                    .map((pageNum) => (
                      <PaginationItem key={pageNum + 1}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum + 1)}
                          isActive={currentPage === pageNum + 1}
                        >
                          {pageNum + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      className={`${
                        currentPage === totalPage && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
        <div className="w-auto h-auto xl:w-[387px] xl:h-[352px] static">
          <div className="flex justify-between items-start flex-col">
            <div className="text-xl font-semibold">Search by genre</div>
            <div className="text-base font-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="flex flex-wrap mt-5 gap-3  ">
            {genres.length > 0 &&
              genres.map((genre) => {
                const genreId = genre.id.toString();
                const isSelected = selectedGenreIds.includes(genreId);
                return (
                  <div
                    key={genre.id}
                    className={`${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black "
                        : ""
                    }h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold cursor-pointer`}
                    onClick={() => handleGenreSelection(genre.id)}
                  >
                    {genre.name}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
