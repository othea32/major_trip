import React, { useState, useEffect, createRef }from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import useStyles from './ListStyles'


const List = ({ places, childClicked, isLoading, type,  setType, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([])
  const classes = useStyles()

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);
  
  
  return (
    
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
      <FormControl className={classes.formControl}>
        <InputLabel id='type'></InputLabel>
        <Select id='type' value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='type'></InputLabel>
        <Select id='rating' value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value={3}>3.0 +</MenuItem>
          <MenuItem value={4}>4.0 +</MenuItem>
          <MenuItem value={5}>4.5 +</MenuItem>          
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid ref={elRefs[i]} item key={i} xs={12}>
            <PlaceDetails 
              place={place} 
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>
      </>
      )}    
    </div>
  )
}

export default List