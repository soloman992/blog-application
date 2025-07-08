import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CssBaseline from "@mui/material/CssBaseline";

// HideOnScroll Component for sticky effect
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ block: "center" });
    }
  };

  return (
    <Slide direction="up" in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Slide>
  );
}

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/blog-application/";
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component={NavLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BLOG
              </Typography>

              {/* Mobile Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuItem
                    component={NavLink}
                    to="/"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>

                  {isLoggedIn && (
                    <>
                      <MenuItem
                        component={NavLink}
                        to="/profile"
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem
                        component={NavLink}
                        to="/create"
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">Create Post</Typography>
                      </MenuItem>
                    </>
                  )}

                  {!isLoggedIn && (
                    <>
                      <MenuItem
                        component={NavLink}
                        to="/login"
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">Login</Typography>
                      </MenuItem>
                      <MenuItem
                        component={NavLink}
                        to="/signup"
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">Sign Up</Typography>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>

              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component={NavLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BLOG
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  component={NavLink}
                  to="/"
                  onClick={handleCloseNavMenu}
                  sx={({ isActive }) => ({
                    my: 2,
                    mx: 3, 
                    color: isActive ? "#FFD700" : "white",
                    borderBottom: isActive ? "2px solid #FFD700" : "none",
                    display: "block",
                    borderRadius: 0,
                    transition: "all 0.3s ease",
                  })}
                >
                  Home
                </Button>

                {isLoggedIn && (
                  <>
                    <Button
                      component={NavLink}
                      to="/profile"
                      onClick={handleCloseNavMenu}
                      sx={({ isActive }) => ({
                        my: 2,
                        mx: 2,
                        color: isActive ? "#FFD700" : "white",
                        borderBottom: isActive ? "2px solid #FFD700" : "none",
                        display: "block",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                      })}
                    >
                      Profile
                    </Button>
                    <Button
                      component={NavLink}
                      to="/create"
                      onClick={handleCloseNavMenu}
                      sx={({ isActive }) => ({
                        my: 2,
                        mx: 2,
                        color: isActive ? "#FFD700" : "white",
                        borderBottom: isActive ? "2px solid #FFD700" : "none",
                        display: "block",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                      })}
                    >
                      Create Post
                    </Button>
                  </>
                )}

                {!isLoggedIn && (
                  <>
                    <Button
                      component={NavLink}
                      to="/login"
                      onClick={handleCloseNavMenu}
                      sx={({ isActive }) => ({
                        my: 2,
                        mx: 2,
                        color: isActive ? "#FFD700" : "white",
                        borderBottom: isActive ? "2px solid #FFD700" : "none",
                        display: "block",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                      })}
                    >
                      Login
                    </Button>
                    <Button
                      component={NavLink}
                      to="/signup"
                      onClick={handleCloseNavMenu}
                      sx={({ isActive }) => ({
                        my: 2,
                        mx: 2,
                        color: isActive ? "#FFD700" : "white",
                        borderBottom: isActive ? "2px solid #FFD700" : "none",
                        display: "block",
                        borderRadius: 0,
                        transition: "all 0.3s ease",
                      })}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>

              {isLoggedIn && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" color="primary">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Navbar;