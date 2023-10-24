import React, { useEffect } from 'react'
import { Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { setUser, userSelector } from '../../features/auth';

const Profile = () => {
  const {user, isAuthenticated } = useSelector(userSelector);
  
  
  const favouriteMovies = []


  const logout = () => {
    localStorage.clear()

    window.location.href = "/"
  }

  return (
    <div>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='h4' gutterBottom>My Profile</Typography>
          <Button color='inherit' onClick={logout}>
            Logout &nbsp; <ExitToApp />
          </Button>
        </Box>
        {!favouriteMovies.length ? <Typography variant='h5'>Add favourites or watchlist some movies to see them here!</Typography> :  <Box>
          Favorite Movies</Box>}
      </Box>
    </div>
  )
}

export default Profile