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
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import SignoutButton from "../signout/signout"
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import i18next from "i18next";

import {i18n} from '../../i18n';
import { useTranslation, Trans } from 'react-i18next';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    
  }
}));

const lngs = {
  en: { nativeName: 'English' },
  hn: { nativeName: 'Hindi' }
};



const Navbar = () => {
 
  const { t, i18n } = useTranslation();

  // const userDetails = useSelector((state) => state.user);
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

  const isAdmin = JSON.parse(localStorage.getItem("Email"))
  

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

            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            LOGO
          </Typography> */}
  
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }} >
              <Link style={{ color: "white", textDecoration: "none" }} to="./home">
                <Trans i18nKey="description.part1">Home</Trans>
              </Link>
            </Button> 
           
            <Button onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
                {/* conditon for user to show screen if user is logged in or not*/}
              {!user?
                <NavLink style={{ color: "white", textDecoration: "none" }} to="./login"
                >
                   <Trans i18nKey="description.part2">Login</Trans>
                </NavLink>
              :    <NavLink style={{ color: "white", textDecoration: "none" }} to='../profile'> <Trans i18nKey="description.part3">Profile</Trans></NavLink>}
                         
                         
                          {/* {isAdmin === "suryabisht.softprodigy@gmail.com" && <NavLink style={{ color: "Blue", textDecoration: "none" }}
                          to='../admin/dashboard'>Dashboard</NavLink>} */}</Button>



          
          </Box>
         
          <Typography variant={"ul"} >
            
  <div>
          {Object.keys(lngs).map((lng) => (
            <Button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              sx={{ backgroundColor: "#ff805d", '&:hover': { backgroundColor: '#ffffff', boxShadow: 'none' },  width: "5rem", height: "1.9rem", }} 
              type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </Button>
          ))}
          {/* <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
        </Trans>
         <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a> */}
        </div>


          </Typography>
          {/* {!userDetails? <></>: <Typography>{userDetails}</Typography>} */}
          <Typography component={'div'}>
             <SignoutButton />
</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;