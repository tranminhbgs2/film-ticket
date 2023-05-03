import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { Grid, TextField } from "@mui/material";
import { Movie, Seats } from "../../constants/models/Movies";
import styles from "./Payment.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useGetMovieId, usePostTicket, useGetTicketData } from "../../services/movies";
import { useGetMovie } from "../../services/movies";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
const Tickets = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(600);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [cost, setCost] = useState();
  const [customer, setCustomer] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectItem, setSelectItem] = useState<any>();
  const [item, setItem] = useState<any>();
  const [movies, setMovies] = useState<any>([]);
  const [theater, setTheater] = useState();
  const [showTime, setShowTime] = useState();


  const getData = () => {
    useGetMovie()
      .then((res: any) => {
        setMovies(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 0,
    ticketCost: number,
    bookingFee: number,
    totalCost: number;
  const { movieId, seatDetails }: any = router.query;
  const movie =
    movies && movies.find((mov: any) => mov.id === parseInt(movieId));
  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`);
        }
      });
    }
    return selectedSeats;
  };

  useEffect(() => {
    getData()
    setSelectItem(selectedSeats);
  }, []);

  const RenderSeatDetails = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    ticketCost = selectedSeats.length * (movie?.ticketCost || 0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(", ")} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>{ticketCost}$</div>
      </div>
    );
  };

  const RenderBookingCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Booking Charge</div>
        <div className={styles.seatCost}>{bookingFee}$</div>
      </div>
    );
  };

  const RenderTotalCharge = ({
    selectedSeats,
  }: {
    selectedSeats: string[];
  }) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Total</div>
        <div className={styles.seatCost}>{totalCost}$</div>
      </div>
    );
  };

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = { ...movieSeatDetails };
    for (let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      });
    }
    return newMovieSeatDetails;
  };
  const usePostData = () => {
    let params = {
      code: `VPA${Math.random().toString().slice(2, 11)}`,
      number_tickets: selectItem.join(", "),
      name_firm: movie.name,
      price: movie.ticketCost,
      total_price: ticketCost + bookingFee,
      total_ticket: selectItem.length,
      name_customer: customer,
      showTime: showTime,
      movie_theater: theater
    };
    setItem(params);
    usePostTicket(params)
      .then(() => {
        setSeconds(0);
        toast.success(
          `You have successfully booked your movie ticket VPA${params.code}`,
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setOpen(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const onConfirmButtonClick = async () => {
    let movieIndex =
      movies && movies.findIndex((mov: any) => mov.id === parseInt(movieId));
    usePostData();
    if (movieIndex !== -1) {
      movies[movieIndex].seats = modifiedSeatValue();
      // console.log(movies);
      // router.push("/");
    }
  };

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button
          variant="contained"
          disabled={isTimerCompleted || !customer}
          className={styles.paymentButton}
          onClick={onConfirmButtonClick}
        >
          {isTimerCompleted
            ? "Confirm Booking"
            : `Confirm Booking (${seconds}s)`}
        </Button>
      </div>
    );
  };

  const RenderList = () => {
    return <></>;
  };

  let selectedSeats: string[] = computeSelectedSeats();

  if (!movie) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardTitleContainer}>
            <Link
              href={{
                pathname: `/seats/${movie?.id}`,
                query: {
                  seats: isTimerCompleted ? null : JSON.stringify(seatDetails),
                },
              }}
            >
              <ArrowBackIcon />
            </Link>
            <div className={styles.cardTitle}>BOOKING SUMMARY</div>
          </div>
          <p className={styles.movieName}>{movie.name}</p>
          <RenderSeatDetails selectedSeats={selectedSeats} />
          <RenderBookingCharge selectedSeats={selectedSeats} />
          <hr className={styles.hrStyle} />
          <RenderTotalCharge selectedSeats={selectedSeats} />
          <hr className={styles.hrStyle} />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="synopsis"
                variant="outlined"
                label="Customer"
                onChange={(event: any) => {
                  setCustomer(event.target.value);
                }}
                type="text"
                required
              />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Movie Theater</InputLabel>
                  <Select
                  sx={{textAlign: "left"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theater}
                    label="Type Film"
                    onChange={(event: any) => {
                      setTheater(event.target.value);
                    }}
                  >
                    <MenuItem value={'Beta Cinemas 01'}>Beta Cinemas 01</MenuItem>
                    <MenuItem value={'Beta Cinemas 02'}>Beta Cinemas 02</MenuItem>
                    <MenuItem value={'Beta Cinemas 03'}>Beta Cinemas 03</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Show Time</InputLabel>
                  <Select
                  sx={{textAlign: "left"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theater}
                    label="Type Film"
                    onChange={(event: any) => {
                      setShowTime(event.target.value);
                    }}
                  >
                    <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
                    <MenuItem value={'9:30 AM'}>9:30 AM</MenuItem>
                    <MenuItem value={'11:00 AM'}>11:00 AM</MenuItem>
                    <MenuItem value={'1:00 PM'}>1:00 PM</MenuItem>
                    <MenuItem value={'2:00 PM'}>2:00 PM</MenuItem>
                    <MenuItem value={'3:00 PM'}>3:00 PM</MenuItem>
                    <MenuItem value={'4:00 PM'}>4:00 PM</MenuItem>
                    <MenuItem value={'8:00 PM'}>8:00 PM</MenuItem>
                    <MenuItem value={'9:00 PM'}>9:00 PM</MenuItem>
                    <MenuItem value={'10:00 PM'}>10:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
          </Grid>
          <ToastContainer />
          <RenderConfirmButton />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{textAlign: 'center'}} className={styles.cardTitleContainer}>
            <div className={styles.cardTitle}>Movie ticket information</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Name Cusomer</div>
            <div className={styles.seatCost}>{item?.name_customer}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Code</div>
            <div className={styles.seatCost}>{item?.code}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Number Ticket</div>
            <div className={styles.seatCost}>{item?.number_tickets}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Movie Theater</div>
            <div className={styles.seatCost}>{item?.movie_theater}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Name Film</div>
            <div className={styles.seatCost}>{item?.name_firm}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Movie Theater</div>
            <div className={styles.seatCost}>{item?.movie_theater}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
            <div className={styles.seatDetails}>Show Time</div>
            <div className={styles.seatCost}>{item?.showTime}</div>
          </div>
          <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Total</div>
        <div className={styles.seatCost}>{item?.total_price}$</div>
      </div>
          <div style={{textAlign: 'center'}} className={styles.paymentButtonContainer}>
            <Link href="/">
              <Button
                variant="contained"
                className={styles.paymentButton}
                onClick={() => router.push('/')}
              >
                Come Back Home
              </Button>
            </Link>
          </div>
        </Box>
      </Modal>
    </>
  );
};

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
};

export default Tickets;
