import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import { Grid, Button, Paper } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import styles from "../styles/Home.module.scss";
import { useGetMovie } from "../services/movies";
import Container from "@mui/material/Container";
import { Movie } from "../constants/models/Movies";
import Image from "next/image";
import { useRouter } from "next/router";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  FormControl,
  InputAdornment,
  TextField,
  createStyles,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ReactPaginate from 'react-paginate';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Home() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleVisible);
  }

  const [movies, setMovies] = React.useState<any>([]);
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const [valueFilm, setValue] = useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const newPacientes =
      movies &&
      movies.filter((value: any) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setValue(newPacientes);
  }, [searchValue]);
  const getData = () => {
    setIsLoading(true);
    useGetMovie()
      .then((res: any) => {
        setValue(res.data.data);
        setMovies(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue("");
  };
  const items = [
    {
      id: "slide-1",
      name: "DUNGEONS & DRAGONS",
      description: "Probably the most random thing you have ever seen!",
      url: "/details/9",
      image:
        "https://www.thecosmiccircus.com/wp-content/uploads/2023/03/Untitled-design-2.png",
    },
    {
      id: "slide-2",
      name: "JOHN WICK: CHAPTER 4",
      description: "JOHN WICK: CHAPTER 4",
      url: "/details/2",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7229d393-c3b8-4703-a41e-e876546d2612/dfpzzwa-06cfc6f0-84e7-4cc4-9b21-94673c86ce73.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyMjlkMzkzLWMzYjgtNDcwMy1hNDFlLWU4NzY1NDZkMjYxMlwvZGZwenp3YS0wNmNmYzZmMC04NGU3LTRjYzQtOWIyMS05NDY3M2M4NmNlNzMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.u25-PnB_M6LoWhKs2d428nPdKqLAK2RHOXfZ6jE-KVU",
    },
    {
      id: "slide-3",
      name: "THE SUPER MARIO BROS. MOVIE",
      description: "Hello World!",
      url: "/details/1",
      image:
        "https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ntxvxqzsjq-landscape.jpg",
    },
  ];

  const RenderMoviesHotList = () => {
    if (movies && movies.length > 0) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "hot")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={movie.id}
              sx={{ padding: "15px", textAlign: "center", marginTop: "20px" }}
            >
              <Link href={`/details/${movie.id}`}>
                <div className="box_film">
                  <div className="box_img--film">
                    <img
                      className="img_film"
                      src={movie.img}
                      alt="site logo"
                      width="100%"
                      height={375}
                    />
                  </div>
                  <div className={styles.movieTitle}> {movie.name} </div>
                  <div className={styles.movieLanguage}> {movie.language} </div>
                </div>
              </Link>
            </Grid>
          ))
      );
    } else if (isLoading) {
      return (
        <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
          Loading Movies...
        </Box>
      );
    } else {
      return (
        <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
          No Movies To Watch...
        </Box>
      );
    }
  };

  const RenderMoviesListNews = () => {
    if (movies && movies.length > 0) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "news")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={movie.id}
              sx={{ padding: "15px", textAlign: "center", marginTop: "20px" }}
            >
              <Link href={`/details/${movie.id}`}>
                <div className="box_film">
                  <div className="box_img--film">
                    <img
                      src={movie.img}
                      className="img_film"
                      alt="site logo"
                      width="100%"
                      height={375}
                    />
                  </div>
                  <div className={styles.movieTitle}> {movie.name} </div>
                  <div className={styles.movieLanguage}> {movie.language} </div>
                </div>
              </Link>
            </Grid>
          ))
      );
    } else if (isLoading) {
      return (
        <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
          Loading Movies...
        </Box>
      );
    } else {
      return (
        <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
          No Movies To Watch...
        </Box>
      );
    }
  };

  const RenderMoviesList = ({ currentItems }: { currentItems: any }) => {
    if (currentItems && currentItems.length > 0) {
      return (
        currentItems &&
        currentItems.map((movie: any) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            key={movie.id}
            sx={{ padding: "15px", textAlign: "center", marginTop: "15px" }}
          >
            <Link href={`/details/${movie.id}`}>
              <div className="box_film">
                <div className="box_img--film">
                  <img
                    src={movie.img}
                    alt="site logo"
                    width={250}
                    height={375}
                    className="img_film"
                  />
                </div>
                <div className={styles.movieTitle}> {movie.name} </div>
                <div className={styles.movieLanguage}> {movie.language} </div>
              </div>
            </Link>
          </Grid>
        ))
      );
    } else if (isLoading) {
      return <>Loading Movies...</>;
    } else {
      return (
        <Box sx={{ paddingTop: "16px", paddingLeft: "16px" }}>
          No Movies To Watch...
        </Box>
      );
    }
  };
  function PaginationControlled({ itemsPerPage }: {itemsPerPage: number}) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [page, setPage] = React.useState(1);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(movies.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(movies.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
      const newOffset = (value - 1) * itemsPerPage % movies.length;
      setItemOffset(newOffset);
      setPage(value);
    };
  
    return (
      <>
        <RenderMoviesList currentItems={currentItems} />
        <Pagination count={pageCount} page={page} onChange={() =>handleChange} />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>
      <Carousel>
        {items.map((item, i) => (
          <Link key={item.id} href={item.url}>
            <img
              width={"100%"}
              height={"auto"}
              className="banner_img"
              key={item.name}
              src={item.image}
            />
          </Link>
        ))}
      </Carousel>
      <Container id="recommended" sx={{paddingTop: "90px"}}>
        <h1 className={styles.title}>Recommended Movies</h1>
        <Box
          sx={{
            justifyContent: "left",
            display: "flex",
            paddingBottom: "16px",
          }}
        >
          <FormControl>
            <TextField
              size="small"
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
              value={searchValue}
              placeholder="Search Film"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }}>
          {/* <RenderMoviesList /> */}
          <PaginationControlled itemsPerPage={8} />
        </Grid>
          <p id="special"></p>
        <Box sx={{ paddingTop: "5px" }} >
          <h1 className={styles.title} >Special Movie</h1>
        </Box>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }}>
          <RenderMoviesHotList />
        </Grid>
        <Box sx={{ paddingTop: "5px" }} >
          <h1 className={styles.title}>New Movie In Theaters</h1>
        </Box>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }} id="new-movie">
          <RenderMoviesListNews />
        </Grid>
        <Box className="box_top">
          <Button
            variant="contained"
            onClick={scrollToTop}
            className="button_up"
          >
            <ArrowUpwardIcon
              style={{ display: visible ? "inline" : "none", color: "white" }}
            />
          </Button>
        </Box>
      </Container>
    </>
  );
}
