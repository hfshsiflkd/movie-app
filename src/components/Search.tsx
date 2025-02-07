import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios";
import Image from "next/image";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
interface MoviesType {
  genres: { id: number; name: string }[];
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  popularity: number;
  release_date: number;
}

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchValue) {
      setMovies([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchMovieDetails = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }
          );

          setMovies(response.data.results);
          console.log(response.data.results);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError("Киноны мэдээллийг татахад алдаа гарлаа.");
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  return (
    <div className="w-[379px] h-[36px]  ">
      <div className="flex items-center border rounded-lg px-3  shadow-sm focus-within:ring-2 focus-within:ring-gray-500">
        <SearchIcon className="text-gray-500" />
        <Input
          type="search"
          placeholder="Кино хайх..."
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-none text-base w-full focus-visible:ring-0 shadow-none"
        />
      </div>

      {loading && <p className="mt-4 text-gray-500">Уншиж байна...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {searchValue && (
        <div className="w-[577px] h-auto overflow-hidden rounded-lg bg-customText p-2">
          {loading ? (
            <p className="text-center text-gray-500 mt-4">Уншиж байна...</p>
          ) : movies.length > 0 ? (
            movies.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="p-2 border rounded shadow-sm w-[553px] h-[116px] flex justify-between items-center"
              >
                <div className="w-[67px] h-[100px]">
                  <Image src={movie.poster_path} alt={""} width={67} height={100} />
                </div>
                <div className="w-[454px] h-[99px] flex flex-col justify-between">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.release_date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Кино олдсонгүй.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
