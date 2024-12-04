import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import { SaveAltOutlined } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Badge } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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

export default function Navbars() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [hasShadow, setHasShadow] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [shopCreated, setShopCreated] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [shopId, setShopId] = React.useState(null);
  const navigate = useNavigate();
  const [avatar, setAvatar] = React.useState(null);

  useEffect(() => {
    // Fetch avatar from localStorage
    const savedAvatar = localStorage.getItem("profileAvatar");
    setAvatar(savedAvatar);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfile = () => {
    handleMenuClose()
    navigate('/profile')
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleMenuClose();
    navigate('/');
  };
  const handleCreateStore = () => {
    setShopCreated(true);
    navigate('/createStore')
  }

  const handleClickShop = () =>{
    navigate('/my-store/my-shop');
  }

  const handleClick = () => {
    if (shopCreated) {
      navigate('/my-store/my-shop');
    } else {
      handleCreateStore();
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{ marginTop: '40px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        {avatar ? (
          <Avatar
            src={avatar}
            alt="Profile Picture"
            sx={{ marginRight: '10px', width: 32, height: 32 }}
          />
        ) : (
          <AccountCircleIcon sx={{ marginRight: '10px', color: '#f85606' }} />
        )}
        Profile
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}><SellIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Selling</MenuItem>
      <MenuItem onClick={handleMenuClose}><ShoppingBagIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Buying</MenuItem>
      <MenuItem onClick={handleMenuClose}><WatchLaterIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Watchlist</MenuItem>
     
      <MenuItem onClick={handleMenuClose}><HistoryIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Reviews</MenuItem>
      <Divider /> */}
      <MenuItem onClick={handleClickShop}><StorefrontIcon sx={{ marginRight: '5px', color: '#f85606' }} />My Shop</MenuItem>
      <MenuItem onClick={handleMenuClose}><HelpIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Help Center</MenuItem>
      <MenuItem onClick={handleMenuClose}><SettingsIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <StoreIcon sx={{ marginRight: '5px', color: '#f85606' }} />  Create Store
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}><LogoutIcon sx={{ marginRight: '5px', color: '#f85606' }} /> Logout</MenuItem>
    </Menu>
  );

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',

        }} onClick={() => navigate('/eg')}>
          <span style={{ color: '#f85606' }}>Pk</span>
          <span style={{ color: '#00224D' }}>Bazaar</span>
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={handleProfile}>
          {avatar ? (
            <Avatar
              src={avatar}
              alt="Profile Picture"
              sx={{ marginRight: '10px', width: 32, height: 32 }}
            />
          ) : (
            <AccountCircleIcon sx={{ marginRight: '10px', color: '#f85606' }} />
          )}
          <ListItemText
            primary="Profile"
            sx={{
              fontWeight: 'bold',
              '.MuiTypography-root': { fontWeight: 'bold' }
            }}
          />
        </ListItem>
        {/* <ListItem button >
          <SellIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Selling" />
        </ListItem>
        <ListItem button >
          <ShoppingBagIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Buying" />
        </ListItem>
        <ListItem button >
          <WatchLaterIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Watchlist" />
        </ListItem>
        <ListItem button >
          <TurnedInIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Saved searches" />
        </ListItem>
        <ListItem button >
          <HistoryIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Reviews" />
        </ListItem> */}
        <Divider style={{ backgroundColor: 'gray' }} />
        <ListItem button onClick={() => navigate('/shoppingCarts')}>
          <Badge
            badgeContent={() => setCartCount(cartCount)}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#f85606',
                color: '#fff'
              }
            }}
          >
            <ShoppingCartIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          </Badge>
          <ListItemText primary="Your Carts" sx={{ marginLeft: '15px' }} />
        </ListItem>

        <ListItem button onClick={handleClick}>
          <StorefrontIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="My Shop" />
        </ListItem>
        <ListItem button >
          <HelpIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Help Center" />
        </ListItem>
        <ListItem button >
          <SettingsIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider style={{ backgroundColor: 'gray' }} />
        <ListItem button onClick={handleCreateStore}>
          <StoreIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary= "Create Store" />
        </ListItem>
        <Divider style={{ backgroundColor: 'gray' }} />
        <ListItem button onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: '5px', color: '#f85606' }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#f85606', color: 'white', height: '70px', boxShadow: hasShadow ? '0 4px 8px rgba(0,0,0,0.1)' : 'none' }}>
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
              border: 'none',
              borderRadius: '25px',
              textAlign: 'center',
              width: '150px',
              cursor: 'pointer',


            }}
            onClick={() => navigate('/eg')}
          >
            <span style={{ color: '#fff' }}>Pk</span>
            <span style={{ color: '#fff' }}>Bazaar</span>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search in PkBazaar" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '80px' }}>
            <IconButton
              size='large'
              aria-haspopup="true"
              onClick={() => navigate('/shoppingCarts')}
            >
              <Badge
                badgeContent={cartCount}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#fff',
                    color: '#f85606',
                    marginRight: '12px'
                  }
                }}
              >
                <ShoppingCartIcon sx={{ marginRight: '15px', color: '#fff' }} />
              </Badge>
            </IconButton>



            <IconButton size="large" color="inherit">
              <DraftsIcon sx={{ marginRight: '15px', color: '#fff' }} />
            </IconButton>
            <IconButton size="large" onClick={handleProfileMenuOpen} color="inherit">
              {avatar ? (
                <Avatar src={avatar} alt="User Avatar" />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="show more" onClick={handleDrawerToggle} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </Box >
  );
}
