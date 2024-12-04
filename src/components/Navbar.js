import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import Hero from './Hero';
import { Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid white',
    borderRadius: '20px',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const NGROK_URL = 'https://thank-rug-effort-stop.trycloudflare.com/api';

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchCategories = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${NGROK_URL}/v1.0/category/search?name=${query}`);
      const data = await response.json();
      setSearchResults(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Debounce fetching logic
    const debounceTimeout = setTimeout(() => fetchCategories(query), 500);

    return () => clearTimeout(debounceTimeout);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#f85606',
          color: 'white',
          height: '70px',
          boxShadow: hasShadow ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              marginLeft: '80px',
              fontFamily: 'Orbitron',
              fontWeight: 'bold',
              fontSize: '30px',
              cursor: 'pointer',
            }}
          >
            <span style={{ color: '#fff', fontStyle: 'italic' }}>Pk</span>
            <span style={{ color: '#fff', fontStyle: 'italic' }}>Bazaar</span>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search in PkBazaar"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  zIndex: 10,
                  marginTop: 2,
                  width: "100%",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{ display: "block", margin: "10px auto" }}
                  />
                ) : (
                  <List>
                    {searchResults.map((result) => (
                      <ListItem
                        button
                        key={result.id}
                        onClick={() => handleCategoryClick(result.id)}
                      >
                        <ListItemText primary={result.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '80px' }}>
            <Typography
              onClick={handleSignUpClick}
              sx={{
                marginRight: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Sign up
            </Typography>
            <Typography
              onClick={handleLoginClick}
              sx={{
                marginRight: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Log in
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 2,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
              }}
            >
              <span style={{ color: '#f85606' }}>Pk</span>
              <span style={{ color: '#00224D' }}>Bazaar</span>
            </Typography>
            <IconButton onClick={toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Button Section with Background Image */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundImage: 'url(https://thumbs.dreamstime.com/b/smiling-young-woman-girl-posing-isolated-bright-orange-wall-background-using-mobile-phone-typing-sms-message-casual-denim-286630362.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              padding: 2,
              mt: 2,
              height: 450,
            }}
          >
            <Typography variant="body2" color="white" sx={{ mb: 1, textAlign: 'center' }}>
              Sign Up and continue to shopping, buying and selling your products
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              px: 2,
              mt: 8
            }}
          >
            <Button
              onClick={handleSignUpClick}
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: '#00224D',
                borderRadius: '10px',
                color: 'white',
                px: 3,
                '&:hover': {
                  backgroundColor: '#00224D',
                },
              }}
            >
              Sign up
            </Button>

            <Button
              onClick={handleLoginClick}
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: '#f85606',
                borderRadius: '10px',
                color: 'white',
                px: 3,
                '&:hover': {
                  backgroundColor: '#f85606',
                },
              }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Hero />
    </Box>
  );
}