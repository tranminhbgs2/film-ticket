import axios from "axios";
import useSWR from "swr";
import { Seats } from "../constants/models/Movies";

function useGetMovies() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://testapi.io/api/movies/resource/movies`,
    fetcher
  );

  return {
    movies: data?.data,
    totalCount: data?.total,
    pageCount: data?.data._meta.pageCount,
    currentPage: data?.current_page,
    perPage: data?.per_page,
    isLoading: !error && !data,
    isError: error,
  };
}

function useGetTicket() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://testapi.io/api/movies/resource/tickets`,
    fetcher
  );

  return {
    tickets: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}


function useGetMovieById(id: string) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://testapi.io/api/movies/resource/movies/${id}`,
    fetcher
  );

  return {
    movieData: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

async function useBookTicketByMovieId(id: string, seatDetails: Seats) {
  return await axios.put(
    `https://testapi.io/api/movies/resource/movies/${id}`,
    { seatDetails }
  );
}

async function useDeleteMovie(id: string) {
  return await axios.delete(
    `https://testapi.io/api/movies/resource/movies/${id}`
  );
}

async function useGetMovie() {
  return await axios.get(`https://testapi.io/api/movies/resource/movies/`);
}

async function usePostMovie(params: any) {
  return await axios.post(
    `https://testapi.io/api/movies/resource/movies/`,
    params
  );
}
async function usePutMovieData(id: any, params: any) {
  return await axios.put(
    `https://testapi.io/api/movies/resource/movies/${id}`,
    params
  );
}

async function useGetMovieId(id: any) {
  return await axios.get(`https://testapi.io/api/movies/resource/movies/${id}`);
}

async function useDeleteTicket(id: string) {
  return await axios.delete(
    `https://testapi.io/api/movies/resource/tickets/${id}`
  );
}

async function useGetTicketData() {
  return await axios.get(`https://testapi.io/api/movies/resource/tickets/`);
}

async function usePostTicket(params: any) {
  return await axios.post(
    `https://testapi.io/api/movies/resource/tickets/`,
    params
  );
}
async function usePutTicketData(id: any, params: any) {
  return await axios.put(
    `https://testapi.io/api/movies/resource/tickets/${id}`,
    params
  );
}

async function useGetTicketId(id: any) {
  return await axios.get(
    `https://testapi.io/api/movies/resource/tickets/${id}`
  );
}

export {
  useGetMovies,
  useGetMovieById,
  useBookTicketByMovieId,
  useDeleteMovie,
  useGetMovie,
  usePostMovie,
  useGetMovieId,
  usePutMovieData,
  useGetTicket,
  useDeleteTicket,
  useGetTicketData,
  usePostTicket,
  usePutTicketData,
  useGetTicketId,
};
