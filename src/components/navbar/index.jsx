import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import logo from './logo.png'
import useWindowLength from '../hooks/useWindowLength';
const Navbar  = ()=>{
  const Navigate = useNavigate()
   const {windowWidth }  = useWindowLength();
  return (
    <Box sx={{position : "sticky" , top : 0 , zIndex : 1 }}>
      <AppBar position="sticky" sx={{ width : `${windowWidth}px`,top : 0 , background : '#486CDE'}}>
          <Toolbar  sx={{justifyContent : 'space-between' , alignItems : 'center'}}>
            <div>
              <span onClick= {()=> {
                Navigate(`/`, { replace: true}) ; 
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                }} style={{cursor : 'pointer'}}>
                  <Stack spacing={0} sx={{padding : 1}}>
                      <img style={{width : '70px' , height : "44px" }} src={logo} alt="Nothing Found" />
                      <Typography  sx={{color : '#ffff' ,fontSize : 10 , margin : 0 , lineHeight : 1}} variant="subtitle1" gutterBottom>
                          CleanYoutube
                      </Typography>
                  </Stack>
                  
                </span>
            </div>
            <Button onClick= {()=> {
                Navigate(`/`, { replace: true}) ; 
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                }} color="inherit"><HomeIcon sx={{color : '#ffff' ,fontSize : 40}}/></Button>
          </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar 