import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
const Navbar  = ()=>{
  const Navigate = useNavigate()
  return (
    <Box sx={{position : "sticky" , top : 0 , zIndex : 1}}>
      <AppBar position="sticky" sx={{top : 0}}>
          <Toolbar  sx={{justifyContent : 'space-between'}}>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 , alignSelf : 'center' }}>
              <span onClick= {()=> Navigate(`/`, { replace: true})} style={{cursor : 'pointer'}}>CleanYouTube</span>
            </Typography>
            <Button onClick= {()=> Navigate(`/`, { replace: true})} color="inherit"><HomeIcon sx={{color : '#ffff' ,fontSize : 40}}/></Button>
          </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar 