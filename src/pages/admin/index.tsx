import * as React from "react";
import Container from "@mui/material/Container";
import {
  useGetMovieId,
  useDeleteMovie,
  useGetMovie,
  usePostMovie,
} from "../../services/movies";
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
  Select,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Box,
  InputLabel,
  FormControl,
  MenuItem
} from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
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

  const [name, setName] = React.useState();
  const [showTime, setShowTime] = React.useState();
  const [language, setLangua] = React.useState();
  const [runtimes, setRuntimes] = React.useState();
  const [description, setDescription] = React.useState();
  const [type, setTypes] = React.useState();
  const [cost, setCost] = React.useState();
  const [file, setFilse] = React.useState();
  const [synopsis, setSynopsis] = React.useState();

  const [dataById, setDataByID] = React.useState<any>();
  const usePostData = () => {
    let params = {
      name: name,
      img: file,
      language: language,
      runtimes: runtimes,
      descriptio: description,
      synopsis: synopsis,
      type: type,
      ticketCost: cost,
      showTime: showTime,
      rows: 20,
      cols: 6,
      seats:
        '{"A":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"B":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"C":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"D":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"E":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"F":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"G":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"H":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"I":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"J":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}',
    };
    usePostMovie(params)
      .then(() => {
        setIsOpenCreate(false);
        getData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getData = () => {
    setIsLoading(true);
    useGetMovie()
      .then((res: any) => {
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
    useDeleteMovie(idItem)
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
          <Grid item sx={{paddingBottom: '10px', paddingTop: '10px'}}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h3" component="h3" gutterBottom>
                    List Films
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Link href="/ticket">
                <Button
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    mr: 2,
                  }}
                  startIcon={<ArrowBackTwoToneIcon />}
                  variant="contained"
                  color="secondary"
                >
                  List Ticket
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
                Add Film
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Language</TableCell>
                  <TableCell align="left">Run times</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Ticket Cost</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies &&
                  movies.map((row: any) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.language}</TableCell>
                      <TableCell align="left">{row.runtimes}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.ticketCost}</TableCell>
                      <TableCell align="left">
                        {" "}
                        <Link href={`/admin/${row?.id}`}>
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
            <Typography variant="subtitle2">
              You can't undo this operation
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
            <Typography variant="h4">Create New Film</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name Film"
                  variant="outlined"
                  // value={productState?.sku}
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Show Time"
                  variant="outlined"
                  // value={productState?.sku}
                  onChange={(event: any) => {
                    setShowTime(event.target.value);
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
                  // value={productState?.name}
                  onChange={(event: any) => {
                    setLangua(event.target.value);
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
                  // value={String(productState?.price)}
                  onChange={(event: any) => {
                    setRuntimes(event.target.value);
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
                  // value={productState?.name}
                  onChange={(event: any) => {
                    setDescription(event.target.value);
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
                    value={type}
                    label="Type Film"
                    onChange={(event: any) => {
                      setTypes(event.target.value);
                    }}
                  >
                    <MenuItem value={'hot'}>Hot Film</MenuItem>
                    <MenuItem value={'news'}>News Film</MenuItem>
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
                  label="Image"
                  name="synopsis"
                  variant="outlined"
                  onChange={(event: any) => {
                    setFilse(event.target.value);
                  }}
                  type="text"
                  required
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
                // value={productState?.description}
                onChange={(event: any) => {
                  setSynopsis(event.target.value);
                }}
              />
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
