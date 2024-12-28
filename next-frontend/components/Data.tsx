"use client";
import { movies } from "@/interfaces/movies";
import { API_ENDPOINT } from "@/lib/constant";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";

const Data = () => {
  const [movies, setMovies] = useState<movies[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedMovie, setSelectedMovie] = useState<movies | null>(null);
  const [input, setInput] = useState("");

  // Fetching
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_ENDPOINT}`);
        if (!response?.data?.data) return null;
        const result = response?.data?.data;
        setMovies(result);
        setError(null);
      } catch (error) {
        setError("Error fetching movies!");
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  // Filtering movies
  const filteredMovies = useMemo(() => {
    return movies.filter((filteredMovie) =>
      filteredMovie.movie.toLowerCase().includes(input.toLowerCase())
    );
  }, [movies, input]);

  // If there's an error
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {loading ? (
        <BeatLoader color="#008AF2" size={20} margin={2} />
      ) : (
        <div className="space-y-10">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by name"
          />
          <Table className="bg-gray-50">
            <TableHeader>
              <TableRow>
                <TableHead>Movie</TableHead>
                <TableHead className="w-[100px]">Rating</TableHead>
                <TableHead className="w-[100px]">Navigate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.map((item: movies) => (
                <TableRow key={item.id}>
                  <TableCell>{item.movie}</TableCell>
                  <TableCell>{item.rating}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-gray-300 text-black hover:bg-gray-300"
                          onClick={() => setSelectedMovie(item)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Movie Details</DialogTitle>
                        </DialogHeader>
                        {selectedMovie && (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>MOVIE</TableHead>
                                <TableHead>RATING</TableHead>
                                <TableHead>IMAGE</TableHead>
                                <TableHead>URL</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>{selectedMovie.id}</TableCell>
                                <TableCell>{selectedMovie.movie}</TableCell>
                                <TableCell>{selectedMovie.rating}</TableCell>
                                <TableCell>
                                  <Image
                                    src="/noavatar.png"
                                    alt={selectedMovie.movie}
                                    width={30}
                                    height={30}
                                    className="object-cover"
                                  />
                                </TableCell>
                                <TableCell>
                                  <a
                                    href={selectedMovie.imdb_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                  >
                                    IMDB Link
                                  </a>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Data;
