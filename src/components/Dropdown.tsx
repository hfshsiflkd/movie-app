import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const Dropdown = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();


  const selectedGenreIds = searchParams.get("genresId")?.split(",") || [];

  const getMovieData = async () => {
    try {
      const genreResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      setGenres(genreResponse.data.genres);
    } catch (error) {
      console.error("Алдаа гарлаа", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const handleGenreSelection = (genreId: number) => {
    const genreIdStr = genreId.toString();
    let updatedGenres;

    if (selectedGenreIds.includes(genreIdStr)) {
      updatedGenres = selectedGenreIds.filter((id) => id !== genreIdStr);
    } else {
      updatedGenres = [...selectedGenreIds, genreIdStr];
    }

    const queryParams = new URLSearchParams();

    if (updatedGenres.length > 0) {
      queryParams.set("genresId", updatedGenres.join(","));
    } else {
      queryParams.delete("genresId");
    }

    router.push(`/genre/?${queryParams.toString()}`);
  };

  

  return (
    <div className="xl:w-[533px] xl:h-[200px] w-[335px] h-[100px] flex border-t border-gray-500 flex-wrap gap-[8px] pr-10 xl:items-center xl:flex-wrap xl:gap-[16px] pt-2">
      {genres.map((genre) => {
        const isActive = selectedGenreIds.includes(genre.id.toString());

        return (
          <div
            key={genre.id}
            onClick={() => handleGenreSelection(genre.id)}
            className={`h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold cursor-pointer 
              ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : ""
              }`}
          >
            {genre.name}
            <ChevronRight className="w-4 h-4" />
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
