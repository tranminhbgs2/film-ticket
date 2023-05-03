import * as React from "react";
import Container from "@mui/material/Container";
import {
  useGetMovieId,
  useDeleteTicket,
  useGetTicketData,
  usePostTicket,
} from "../../services/movies";
import TableFooter from "@mui/material/TableFooter";
import path from "path";
import fs from "fs";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete";
const Admin = () => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [idItem, setIdItem] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showClearIcon, setShowClearIcon] = React.useState("none");
  const [searchValue, setSearchValue] = React.useState("");
  const [valueFilm, setValue] = React.useState<any>();
  const [numberTicket, setNumberTicket] = React.useState();
  const [nameFilm, setNameFilm] = React.useState();
  const [price, setPrice] = React.useState();
  const [totalTicket, setTotalTicket] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState();
  const [cost, setCost] = React.useState();
  const [customer, setCustomer] = React.useState();
  const [showTime, setShowTime] = React.useState();
  const [theater, setTheater] = React.useState();

  const [dataById, setDataByID] = React.useState<any>();

  const usePostData = () => {
    let params = {
      code: `VPA${Math.random().toString().slice(2, 11)}`,
      number_tickets: numberTicket,
      name_firm: nameFilm,
      price: price,
      total_price: totalPrice,
      total_ticket: totalTicket,
      ticketCost: cost,
      name_customer: customer,
      showTime: showTime,
      movie_theater: theater,
    };
    usePostTicket(params)
      .then(() => {
        setIsOpenCreate(false);
        getData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setSearchValue(event.target.value);
  };

  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue("");
    console.log("clicked the clear icon...");
  };
  React.useEffect(() => {
    const newPacientes =
      movies &&
      movies.filter((value: any) =>
        value.code.toLowerCase().includes(searchValue.toLowerCase())
      );
    setValue(newPacientes);
  }, [searchValue]);

  const getData = () => {
    setIsLoading(true);
    useGetTicketData()
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

  const deleteAction = (id: any) => {
    setIsOpen(true);
    setIdItem(id);
  };
  const editAction = async (row: any) => {
    await setDataByID(row);
    // setIdItem(row.id)=
    setIsOpenEdit(true);
  };
  const removeItem = () => {
    useDeleteTicket(idItem)
      .then((res) => {
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  if (movies) {
    return (
      <>
        <Head>
          <title>Admin</title>
        </Head>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sx={{ paddingBottom: "10px", paddingTop: "10px" }}>
              <Box
              // display="flex"
              // alignItems="center"
              // justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h3" component="h3" gutterBottom>
                    List Films
                    <Box
                      sx={{
                        justifyContent: "center",
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
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Link href="/admin">
                <Button
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    mr: 2,
                  }}
                  startIcon={<ArrowBackTwoToneIcon />}
                  variant="contained"
                  color="secondary"
                >
                  List Film
                </Button>
              </Link>
              <Button
                sx={{
                  mt: { xs: 2, sm: 0 },
                }}
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={() => setIsOpenCreate(true)}
              >
                Add Ticket
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell align="left">Number Tickets</TableCell>
                  <TableCell align="left">Name Film</TableCell>
                  <TableCell align="left">Ticket Cost</TableCell>
                  <TableCell align="left">Total Ticket</TableCell>
                  <TableCell align="left">Name Customer</TableCell>
                  <TableCell align="left">ShowTime</TableCell>
                  <TableCell align="left">Movie Theater</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valueFilm &&
                  valueFilm.map((row: any) => (
                    <TableRow
                      key={row.code}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell align="left">{row.number_tickets}</TableCell>
                      <TableCell align="left">{row.name_firm}</TableCell>
                      <TableCell align="left">{row.total_ticket}</TableCell>
                      <TableCell align="left">{row.total_price}</TableCell>
                      <TableCell align="left">{row.name_customer}</TableCell>
                      <TableCell align="left">{row.showTime}</TableCell>
                      <TableCell align="left">{row.movie_theater}</TableCell>
                      <TableCell align="left">
                        {" "}
                        <Link href={`/ticket/${row?.id}`}>
                          <IconButton onClick={() => editAction(row)}>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => deleteAction(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              {/* <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={movies.total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter> */}
            </Table>
          </TableContainer>
        </Container>
        <Dialog
          onClose={() => setIsOpen(false)}
          open={isOpen}
          disableEscapeKeyDown={true}
        >
          <DialogTitle>
            {" "}
            <Typography variant="h4">Delete</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              Are you sure you want to delete this item?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} variant="contained">
              No
            </Button>
            <Button
              onClick={() => removeItem()}
              variant="contained"
              color="error"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={() => setIsOpenCreate(false)}
          open={isOpenCreate}
          disableEscapeKeyDown={true}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>
            {" "}
            <Typography variant="h4">Create New Ticket</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Number Tickets"
                  variant="outlined"
                  // value={productState?.sku}
                  onChange={(event: any) => {
                    setNumberTicket(event.target.value);
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
                  label="Name Film"
                  variant="outlined"
                  // value={productState?.name}
                  onChange={(event: any) => {
                    setNameFilm(event.target.value);
                  }}
                  // required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="runtimes"
                  label="Price"
                  variant="outlined"
                  // value={String(productState?.price)}
                  onChange={(event: any) => {
                    setPrice(event.target.value);
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
                  label="Total Ticket"
                  variant="outlined"
                  // value={productState?.name}
                  onChange={(event: any) => {
                    setTotalTicket(event.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="type"
                  label="Total Price"
                  variant="outlined"
                  // value={String(productState?.price)}
                  onChange={(event: any) => {
                    setTotalPrice(event.target.value);
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
                  label="Ticket Cost"
                  variant="outlined"
                  // value={productState?.name}
                  onChange={(event: any) => {
                    setCost(event.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
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
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Show Time
                  </InputLabel>
                  <Select
                    sx={{ textAlign: "left" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={showTime}
                    label="Type Film"
                    onChange={(event: any) => {
                      setShowTime(event.target.value);
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
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Movie Theater
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theater}
                    label="Movie Theater"
                    onChange={(event: any) => {
                      setTheater(event.target.value);
                    }}
                  >
                    <MenuItem value={"Beta Cinemas 01"}>
                      Beta Cinemas 01
                    </MenuItem>
                    <MenuItem value={"Beta Cinemas 02"}>
                      Beta Cinemas 02
                    </MenuItem>
                    <MenuItem value={"Beta Cinemas 03"}>
                      Beta Cinemas 03
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsOpenCreate(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button onClick={() => usePostData()} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else if (isLoading) {
    return <>Loading Movies...</>;
  } else {
    return <>No Movies To Watch...</>;
  }
};

export default Admin;
