import Head from "next/head";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Container } from "@mui/material";
import { useGetTicket } from "../../services/movies";
import { useEffect } from "react";
import { useFormik } from "formik";
import { usePutTicketData } from "../../services/movies";
import {
  TextField,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
interface IPageHeaderProps {
  onSave: () => void;
}
const Details = ({ onSave }: IPageHeaderProps) => {
  const { tickets, isLoading, isError } = useGetTicket();
  const router = useRouter();
  const { id }: any = router.query;
  const ticket =
    tickets && tickets?.find((mov: any) => mov.id === parseInt(id));

  let DEFAULT_APP = {
    code: "",
    number_tickets: "",
    name_firm: "",
    price: "",
    total_price: "",
    total_ticket: "",
    name_customer: "",
    ticketCost: "",
    showTime: "",
    movie_theater: "",
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
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("code", values.code);
      formData.append("number_tickets", values.number_tickets);
      formData.append("name_firm", values.name_firm);
      formData.append("price", values.price);
      formData.append("total_price", values.total_price);
      formData.append("total_ticket", values.total_ticket);
      formData.append("name_customer", values.name_customer);
      formData.append("showTime", values.showTime);
      formData.append("movie_theater", values.movie_theater);

      usePutTicketData(id, values)
        .then(() => {
          router.push("/ticket");
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  useEffect(() => {
    setValues({
      code: ticket?.code,
      number_tickets: ticket?.number_tickets,
      name_firm: ticket?.name_firm,
      price: ticket?.price,
      total_price: ticket?.total_price,
      total_ticket: ticket?.total_ticket,
      name_customer: ticket?.name_customer,
      ticketCost: ticket?.ticketCost,
      showTime: ticket?.showTime,
      movie_theater: ticket?.movie_theater,
    });
  }, [ticket]);

  const onChangeAppState = (key: string, value: any) => {
    setFieldValue(key, value);
  };
  return (
    <Container sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="language"
              label="Code"
              variant="outlined"
              value={values?.code}
              onChange={(event: any) => {
                onChangeAppState("code", event.target.value);
              }}
              // required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="runtimes"
              label="Number Tickets"
              variant="outlined"
              value={values?.number_tickets}
              onChange={(event: any) => {
                onChangeAppState("number_tickets", event.target.value);
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
              label="Name Film"
              variant="outlined"
              value={values?.name_firm}
              onChange={(event: any) => {
                onChangeAppState("name_firm", event.target.value);
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="type"
              label="Price"
              variant="outlined"
              value={values?.price}
              onChange={(event: any) => {
                onChangeAppState("price", event.target.value);
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
              name="ticketCost"
              label="Total Price"
              variant="outlined"
              value={values?.total_price}
              onChange={(event: any) => {
                onChangeAppState("total_price", event.target.value);
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="synopsis"
              label="Total Ticket"
              variant="outlined"
              value={values?.total_ticket}
              onChange={(event: any) => {
                console.log("e", event);

                onChangeAppState("total_ticket", event.target.value);
              }}
              type="text"
            />
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
              name="synopsis"
              label="Name Customer"
              multiline
              variant="outlined"
              fullWidth
              value={values?.name_customer}
              onChange={(event: any) => {
                onChangeAppState("name_customer", event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Show Time</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values?.showTime}
                label="Type Film"
                onChange={(event: any) => {
                  onChangeAppState("showTime", event.target.value);
                }}
              >
                <MenuItem value={"9:00 AM"}>9:00 AM</MenuItem>
                <MenuItem value={"9:30 AM"}>9:30 AM</MenuItem>
                <MenuItem value={"11:00 AM"}>11:00 AM</MenuItem>
                <MenuItem value={"1:00 PM"}>1:00 PM</MenuItem>
                <MenuItem value={"2:00 PM"}>2:00 PM</MenuItem>
                <MenuItem value={"3:00 PM"}>3:00 PM</MenuItem>
                <MenuItem value={"4:00 PM"}>4:00 PM</MenuItem>
                <MenuItem value={"8:00 PM"}>8:00 PM</MenuItem>
                <MenuItem value={"9:00 PM"}>9:00 PM</MenuItem>
                <MenuItem value={"Be10:00 PM"}>10:00 PM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Movie Theater
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values?.movie_theater}
                label="Movie Theater"
                onChange={(event: any) => {
                  onChangeAppState("movie_theater", event.target.value);
                }}
              >
                <MenuItem value={"Beta Cinemas 01"}>Beta Cinemas 01</MenuItem>
                <MenuItem value={"Beta Cinemas 02"}>Beta Cinemas 02</MenuItem>
                <MenuItem value={"Beta Cinemas 03"}>Beta Cinemas 03</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DialogActions>
          <Button variant="contained" color="error">
            <Link href="/ticket">Back</Link>
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
