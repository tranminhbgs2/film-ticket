import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Container, Box } from "@mui/material";
import { useGetMovies } from "../../services/movies";
import { Movie } from "../../constants/models/Movies";
import styles from "./Details.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useContext, useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Details = () => {
  const { movies, isLoading, isError } = useGetMovies();
  const router = useRouter();
  const { id }: any = router.query;
  const movie = movies && movies?.find((mov: any) => mov.id === parseInt(id));

  const RenderBookTicketsButton = () => {
    return (
      <Link href={`/seats/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button
            variant="contained"
            href="#contained-buttons"
            className={styles.paymentButton}
          >
            Book Ticket
          </Button>
        </div>
      </Link>
    );
  };

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
  const RenderCustomizeRowsButton = () => {
    return (
      <Link href={`/customize/${movie?.id}`}>
        <div className={styles.paymentButtonContainer}>
          <Button
            variant="contained"
            href="#contained-buttons"
            className={styles.paymentButton}
          >
            Customize Row
          </Button>
        </div>
      </Link>
    );
  };

  const RenderMoviesHotList = () => {
    if (movies) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "hot")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid
              item
              xs={12}
              md={3}
              key={movie.id}
              sx={{ padding: "15px", textAlign: "center", marginTop: "20px" }}
            >
              <Link href={`/details/${movie.id}`}>
                <div className="box_film">
                  <div className="box_img--film">
                    <img
                      src={movie.img}
                      alt="site logo"
                      width="100%"
                      className="img_film"
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
      return <>Loading Movies...</>;
    } else {
      return <>No Movies To Watch...</>;
    }
  };

  const RenderMoviesList = () => {
    if (movies) {
      return (
        movies &&
        movies
          .filter((i: any) => i.type === "news")
          .slice(0, 4)
          .map((movie: any) => (
            <Grid
              item
              xs={12}
              md={3}
              key={movie.id}
              sx={{ padding: "15px", textAlign: "center", marginTop: "20px" }}
            >
              <Link href={`/details/${movie.id}`}>
                <div className="box_film">
                  <div className="box_img--film">
                    <img
                      src={movie.img}
                      alt="site logo"
                      width="100%"
                      className="img_film"
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
      return <>Loading Movies...</>;
    } else {
      return <>No Movies To Watch...</>;
    }
  };

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <Container sx={{ paddingTop: "40px" }}>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }}>
          <Grid
            item
            sx={{
              paddingLeft: "0 !important",
              paddingRight: "15px !important",
            }}
          >
            <img
              src={movie.img}
              width={250}
              height={375}
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingLeft: "0 !important", marginLeft: "0" }}
            ml={4}
            sm
          >
            <h1 className={styles.titleFilm}>{movie.name}</h1>
            <ul className={styles.listFilm}>
              <li className={styles.listFilmItem}>
                Show Times:
                <p className={styles.listFilmItemContent}>{movie.showTime}</p>
              </li>
              <li className={styles.listFilmItem}>
                synopsis:
                <p className={styles.listFilmItemContent}>{movie.synopsis}</p>
              </li>
              <li className={styles.listFilmItem}>
                Run Times:
                <p className={styles.listFilmItemContent}>{movie.runtimes}</p>
              </li>
              <li className={styles.listFilmItem}>
                <p>Ticket Cost: {movie.ticketCost}</p>
              </li>
            </ul>
            <RenderBookTicketsButton />
          </Grid>
        </Grid>
        <Box sx={{ paddingTop: "5px" }}>
          <h2 className={styles.title}>Special Movie</h2>
        </Box>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }}>
          <RenderMoviesHotList />
        </Grid>
        <Box sx={{ paddingTop: "5px" }}>
          <h2 className={styles.title}>New Movie In Theaters</h2>
        </Box>
        <Grid container spacing={2} sx={{ marginLeft: "0", width: "100%" }}>
          <RenderMoviesList />
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
};

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
};

export default Details;
