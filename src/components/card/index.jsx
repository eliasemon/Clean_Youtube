import {useState}from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStoreState, useStoreActions, action } from 'easy-peasy';
import DeleteConfirmation from '../deleteConfermation/index';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

const PLCard = ({plId , item ,type})=> {
  const Navigate = useNavigate()
  const {playList ,favourite , recents} = useStoreActions(actions => actions)
  const {removeItemFromPlItems} = playList
  const {fvToggle} = favourite;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () =>{
    setOpen(false);
    removeItemFromPlItems(plId)
  }

  const Actions =  (<CardActions sx={{padding : 0 ,paddingBottom : 1, justifyContent : "space-evenly"}} >
                                <Button onClick = {()=> {Navigate(`viewPlaylist/${plId}`, { replace: false});recents.updateRcItems(plId) }} size="small">Open</Button>
                                <FavoriteIcon 
                                  style={{ opacity: (item.favourite ? 1 : 0.55) }} 
                                  sx={{ cursor : 'pointer',color : (item.favourite ? 'red' : '') ,fontSize : 30,'&:hover': {
                                    color: 'red' ,
                                  } } }
                                  onClick={()=>fvToggle({plId})}
                                />
                                <Button  onClick = {handleClickOpen} size="small" sx={{color : "red" , paddingRight : 1.5}}>Delete</Button>
                                <DeleteConfirmation open = {open} handleClose = {handleClose}   handleAgree = {handleAgree}  plTittle = {item.tittle} />
                              </CardActions>);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="130"
        image={item.thumbnails}
        alt={item.tittle}
      />
      {/* {item.thumbnails.url} */}
      <CardContent sx={{padding : 1 }}>
        <Typography sx = {{paddingBottom : 0}}  variant="p" component="div">
       
          {`${item.tittle.slice(0, 45)}...`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`By.. ${item.channelTitle}`} 
        </Typography>
      </CardContent>
       {type == "playList"? Actions : "" }
    </Card>
  );
}
export default PLCard