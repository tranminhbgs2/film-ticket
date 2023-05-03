import Link from "next/link";
import React, { useState, useEffect, useCallback  } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  InputAdornment,
  TextField,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetTicketData, useGetTicket } from "../services/movies";
import { useRouter } from "next/router";

const pages = [
  {
    name: "Home",
    link: '/'
  },
  {
    name: "Login",
    link: '/login'
  },
  {
    name: "Recommended Movies",
    link: '/#recommended'
  },
  {
    name: "Special Movie",
    link: '/#special'
  },
  {
    name: "New Movie",
    link: '/#new-movie'
  },
]

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const [valueTicket, setValueTicket] = useState<any>();
  const [tickets, setTickets] = useState<any>();

  const getData = () => {
    useGetTicketData()
      .then((res: any) => {
        setTickets(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [searchValue]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (): void => {
    // TODO: Clear the search input
    setSearchValue("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    const value = event.target.value.trim()
    setSearchValue(value);
  };
  useEffect(() => {
    const newTickket =
      tickets && tickets.filter((i: any) => i.code.toLowerCase() === searchValue.toLowerCase());
    setValueTicket(newTickket);
  }, [open]);
  const router = useRouter();
  return (
    <>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your ticket information"}
        </DialogTitle>
        <DialogContent>
          {valueTicket && valueTicket.length > 0
            ? valueTicket &&
              valueTicket.map((i: any) => (
                <>
                  <Grid container spacing={2} xs={12} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      Code: {i.code}
                    </Grid>
                    <Grid item xs={6}>
                      Movie Theater: {i.movie_theater}
                    </Grid>
                    <Grid item xs={6}>
                      Number Tickets: {i.number_tickets}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Name Film: {i.name_firm}
                    </Grid>
                    <Grid item xs={6}>
                      Name Customer: {i.name_customer}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Total Price: {i.total_price}{" "}
                    </Grid>
                    <Grid item xs={6}>
                      Total Tickets: {i.total_ticket}{" "}
                    </Grid>
                  </Grid>
                </>
              ))
            : "Your ticket number is incorrect or does not exist, please re-enter the ticket number"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar sx={{backgroundColor: 'white', pb:'10px', pt: '10px'}} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                <div className="logo">
                  <img
                    src="/logo.png"
                    alt="site logo"
                    width={163}
                    height={68}
                  />
                </div>
              </Box>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon  sx={{color: 'blue'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{color:'black'}} className={router.asPath === page.link ? 'active' : ''}> <Link href={page.link} scroll={false}>{page.name}</Link></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <FormControl>
            <TextField
             sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              size="small"
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  setOpen(true)
                }
              }}
              value={searchValue}
              className="search_input"
              placeholder="Search Ticket"
              InputProps={{
                startAdornment: (
                  <InputAdornment  onClick={() => setOpen(true)} style={{  cursor: 'pointer' }} position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon, cursor: 'pointer' }}
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
       
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.name} href={page.link} scroll={false} className={router.asPath === page.link ? 'active' : ''}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.name}
                </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <FormControl>
            <TextField
             sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              size="small"
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  setOpen(true)
                }
              }}
              value={searchValue}
              className="search_input"
              placeholder="Search Ticket"
              InputProps={{
                startAdornment: (
                  <InputAdornment onClick={() => setOpen(true)} style={{  cursor: 'pointer' }} position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon, cursor: 'pointer' }}
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
