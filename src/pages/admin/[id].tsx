import Head from "next/head";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetMovies } from "../../services/movies";
import { Movie } from "../../constants/models/Movies";
import styles from "./Details.module.scss";
import MoviesContext from "../../context/MoviesContext";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useGetMovieId, usePutMovieData } from "../../services/movies";
import { TextField, DialogActions, Box } from "@mui/material";
interface IPageHeaderProps {
  onSave: () => void;
}
const Details = ({ onSave }: IPageHeaderProps) => {
  const [name, setName] = React.useState();
  const [language, setLangua] = React.useState();
  const [runtimes, setRuntimes] = React.useState();
  const [description, setDescription] = React.useState();
  const [type, setTypes] = React.useState();
  const [cost, setCost] = React.useState();
  const [file, setFilse] = React.useState();
  const [synopsis, setSynopsis] = React.useState();
  const [dataById, setDataByID] = React.useState<any>();
  const { movies, isLoading, isError } = useGetMovies();
  const router = useRouter();
  const { id }: any = router.query;
  const movie = movies && movies?.find((mov: any) => mov.id === parseInt(id));
  // const getItemById = (item: any) => {
  //   useGetMovieId(item).then((res) => {
  //     setDataByID(res.data.data)
  //   }).then((err) => {
  //     console.log('err', err);
  //   })
  // }
  // React.useEffect(() => {
  //   getItemById(id)
  // }, [id])
  let DEFAULT_APP = {
    name: "",
    img: "",
    language: "",
    runtimes: "",
    description: "",
    synopsis: "",
    type: "",
    ticketCost: "",
    showTime: "",
    rows: "",
    cols: "",
    seats: "",
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: DEFAULT_APP,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("img", values.img);
      formData.append("language", values.language);
      formData.append("runtimes", values.runtimes);
      formData.append("synopsis", values.synopsis);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("ticketCost", values.ticketCost);
      formData.append("rows", values.rows);
      formData.append("cols", values.cols);
      formData.append("seats", values.seats);
      usePutMovieData(id, values)
        .then(() => {
          router.push("/admin");
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  useEffect(() => {
    setValues({
      name: movie?.name,
      img: movie?.img,
      language: movie?.language,
      runtimes: movie?.runtimes,
      description: movie?.description,
      synopsis: movie?.synopsis,
      type: movie?.type,
      ticketCost: movie?.ticketCost,
      showTime: movie?.showTime,
      rows: "20",
      cols: "6",
      seats:
        '{"A":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"B":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"C":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"D":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"E":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"F":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"G":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"H":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"I":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"J":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}',
    });
  }, [movie]);

  const onChangeAppState = (key: string, value: any) => {
    setFieldValue(key, value);
  };
  return (
    <Container sx={{mt: 16, mb: 15}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name Film"
              variant="outlined"
              value={values?.name}
              onChange={(event: any) => {
                onChangeAppState("name", event.target.value);
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Show time"
              variant="outlined"
              value={values?.showTime}
              onChange={(event: any) => {
                onChangeAppState("showTime", event.target.value);
              }}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="language"
              label="Language"
              variant="outlined"
              value={values?.language}
              onChange={(event: any) => {
                onChangeAppState("language", event.target.value);
              }}
              // required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="runtimes"
              label="Run times"
              variant="outlined"
              value={values?.runtimes}
              onChange={(event: any) => {
                onChangeAppState("runtimes", event.target.value);
              }}
              type="text"
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              variant="outlined"
              value={values?.description}
              onChange={(event: any) => {
                onChangeAppState("description", event.target.value);
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values?.type}
                label="Type Film"
                onChange={(event: any) => {
                  onChangeAppState("type", event.target.value);
                }}
              >
                <MenuItem value={"hot"}>Hot Film</MenuItem>
                <MenuItem value={"news"}>News Film</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="ticketCost"
              label="Ticket Cost"
              variant="outlined"
              value={values?.ticketCost}
              onChange={(event: any) => {
                onChangeAppState("ticketCost", event.target.value);
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="synopsis"
              variant="outlined"
              label="Images"
              value={values?.img}
              onChange={(event: any) => {
                onChangeAppState("img", event.target.value);
              }}
              type="text"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="synopsis"
            label="Synopsis"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            value={values?.synopsis}
            onChange={(event: any) => {
              onChangeAppState("synopsis", event.target.value);
            }}
          />
        </Grid>
        <DialogActions>
          <Button variant="contained" color="error">
            <Link href="/admin">Back</Link>
          </Button>
          <Button type="submit" variant="contained">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default Details;
