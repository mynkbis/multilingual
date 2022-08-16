import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SignoutButton from "../signout/signout"
import { NavLink } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';


const lngs = {
  en: { nativeName: 'English' },
  hn: { nativeName: 'Hindi' }
};



const Navbar = () => {

const { i18n } = useTranslation();
const [user, setUser] = React.useState({})

    const [anchorElNav, setAnchorElNav] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [anchorElUser, setAnchorElUser] = React.useState(null);  
  
    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // eslint-disable-next-line no-unused-vars
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // eslint-disable-next-line no-unused-vars
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe();
  }, [])
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ff805d" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography component={'div'} textAlign="center">
                  {
                    <Box>
                      <Box sx={{ mr: 8 }}>
                        <Link style={{ color: "Blue", textDecoration: "none" }} to="../listing" >
                          <Trans i18nKey="description.part1">Home</Trans>
                        </Link>
                      </Box>
                      <Box sx={{ mr: 8, pt: 2 }}>
                        {/* conditon for user to show screen if user is logged in or not */}
                        {!user && <Link style={{ color: "Blue", textDecoration: "none" }} to="./login">
                          <Trans i18nKey="description.part2">Login</Trans>
                        </Link>
                        }
                        {user && <NavLink style={{ color: "Blue", textDecoration: "none" }}
                          to='../profile'> <Trans i18nKey="description.part">Profile</Trans></NavLink>
                        }
                      </Box>
                    </Box>
                  }
                </Typography>
              </MenuItem>   
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block",'&:hover':{fontWeight:800}  }} >
              <Link style={{ color: "white", textDecoration: "none", '&:hover':{fontWeight:800} }} to="./home">
                <Trans i18nKey="description.part1">Home</Trans>
              </Link>
            </Button>
            <Button onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", '&:hover':{fontWeight:800} }}
            >
              {/* conditon for user to show screen if user is logged in or not*/}
              {!user ?
                <NavLink style={{ color: "white", textDecoration: "none",'&:hover':{fontWeight:800,} }} to="./login">
                  <Trans i18nKey="description.part2">Login</Trans>
                </NavLink>
                : <NavLink style={{ color: "white", textDecoration: "none" ,'&:hover':{fontWeight:800} }}
                  to='../profile'> <Trans i18nKey="description.part3">Profile</Trans></NavLink>}
            </Button>
          </Box>
          <Typography variant={"ul"} >
            <Typography>
              {Object.keys(lngs).map((lng) => (
                <Button key={lng} style={{ backgroundColor: i18n.resolvedLanguage === lng ? 'white' : '', fontWeight: i18n.resolvedLanguage === lng ? 'white' : 'grey' }}
                  sx={{ backgroundColor: "#ff805d", '&:hover': { backgroundColor: '#ffffff', boxShadow: 'none' }, width: "5rem", height: "1.9rem", }}
                  type="submit" onClick={() => i18n.changeLanguage(lng)}>
                  {lngs[lng].nativeName}
                </Button>
              ))}
               </Typography>
          </Typography>
  
          <Typography component={'div'}>
            <SignoutButton />   {/*signout button component */}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;