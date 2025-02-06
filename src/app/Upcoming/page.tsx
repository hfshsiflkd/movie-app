// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MovieCard } from "../components/Card";
// import Link from "next/link";

// const Upcoming = () => {
//   const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
//   const TMDB_API_KEY = process.env.TMDB_API_KEY;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   interface Movie {
//     id: number;
//     poster_path: string;
//     title: string;
//     vote_average: number;
//   }

//   const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const Upcoming = await axios.get(
//           `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
//           {
//             headers: {
//               Authorization: `Bearer ${TMDB_API_KEY}`,
//             },
//           }
//         );
//         setUpcomingMovies(Upcoming.data.results);
//         setLoading(false);
//       } catch (error) {
//         setError("Киноны мэдээллийг татахад алдаа гарлаа.");
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, []);

//   if (loading) return <p>Уншиж байна...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="w-screen h-auto flex justify-center items-center my-10">
//       <div className="w-full sm:w-[1440px] h-auto  px-5 sm:px-20 flex justify-between items-center flex-col ">
//         <div className="w-full sm:w-[1277px] h-[36px] flex justify-between items-center">
//           <h1 className="text-xl sm:text-2xl font-semibold leading-24">
//             Upcoming
//           </h1>
//         </div>

//         <div className="w-[350px] sm:w-[1277px]  flex justify-items-center items-between flex-wrap gap-5 sm:gap-[31.2px]">
//           {upcomingMovies.map((movie) => (
//             <Link href={`/detail/${movie.id}`} key={movie.id}>
//               <MovieCard
//                 src={
//                   movie.poster_path
//                     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                     : "/default-poster.jpg"
//                 }
//                 name={movie.title}
//                 rating={parseFloat(movie.vote_average.toFixed(1))}
//                 Loading={loading}
//               />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upcoming;
