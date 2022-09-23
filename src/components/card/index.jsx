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

const PLCard = ({plId})=> {
  const {plItems}  = useStoreState(state => state.playList)
  const {playList ,favourite} = useStoreActions(actions => actions)
  const {removeItemFromPlItems} = playList
  const {fvToggle} = favourite;
  const item = plItems[plId]
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
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image={item.thumbnails.url}
        alt={item.tittle}
      />
      <CardContent sx={{padding : 1 }}>
        <Typography sx = {{paddingBottom : 0}}  variant="p" component="div">
       
          {`${item.tittle.slice(0, 45)}...`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`By.. ${item.channelTitle}`} 
        </Typography>
      </CardContent>
      <CardActions sx={{padding : 0 ,paddingBottom : 1, justifyContent : "space-evenly"}} >
        <Button size="small">Open</Button>
        <StarIcon 
          style={{ opacity: (item.favourite ? 1 : 0.55) }} 
          sx={{color : (item.favourite ? '#FAAF00' : '') ,fontSize : 30 } }
          onClick={()=>fvToggle({plId})}
        />
        <Button  onClick = {handleClickOpen} size="small" sx={{color : "red" , paddingRight : 1.5}}>Delete</Button>
      </CardActions>
      <DeleteConfirmation open = {open} handleClose = {handleClose}   handleAgree = {handleAgree}  plTittle = {item.tittle} />
    </Card>
  );
}
export default PLCard