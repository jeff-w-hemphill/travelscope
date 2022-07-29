import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid, Button } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('restaurants');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  const handleSearch = () => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); // filter out dummy places
          setFilteredPlaces([]);
          setIsLoading(false);
        })
    }
  }

  /* Use this useEffect for updating map based on change of bounds */
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
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                  places={filteredPlaces.length ? filteredPlaces : places} 
                  childClicked={childClicked} 
                  handleSearch={handleSearch} 
                  isLoading={isLoading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}  
                />
            </Grid>
            <Grid item xs={12} md={8}>
              <Button variant='contained' style={{ margin: '5px', backgroundColor: 'green', color: 'white'}} onClick={handleSearch}>Search Map Area</Button>
                <Map 
                  places={filteredPlaces.length ? filteredPlaces : places} 
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