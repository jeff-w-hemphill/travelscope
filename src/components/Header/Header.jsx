

import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { IoTelescopeOutline } from 'react-icons/io5';

import useStyles from './styles.js';

const Header = ({ setCoordinates, setPlaces, setFilteredPlaces }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  
  const onLoad = (autoC) => setAutocomplete(autoC);
  
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
    setPlaces([]);
    setFilteredPlaces([]);
  }

  return (
    <AppBar position="sticky" style={{ color: 'white', backgroundColor: 'black'}}>
      <Toolbar className={classes.toolbar}>
        <Box display='flex'>
          <Typography variant="h5" className={classes.title}>
            TravelScope
          </Typography>
          <IoTelescopeOutline style={{ alignSelf: 'center', marginLeft: '10px'}} />
        </Box>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;