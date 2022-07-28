import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid, Button } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  const handleSearch = () => {
    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data);
      })
  }
  // useEffect(() => {
  //   getPlacesData(bounds.sw, bounds.ne)
  //     .then((data) => {
  //       console.log(data);
  //       setPlaces(data);
  //     })
  // }, [coordinates, bounds]);

  return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List places={places} childClicked={childClicked} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Button variant='contained' color='secondary' style={{ margin: '5px'}} onClick={handleSearch}>Search Map Area</Button>
                <Map 
                  places={places}
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
  )
}

export default App;