import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useStoreActions } from 'easy-peasy';
import plIdSpliter from '../../utils/index';

const PlaylistAdder = () => {
  const [open, setOpen] = useState(false);
  const [state , setState] = useState("")
  const {collectDatafromYTApi} = useStoreActions(actions => actions.playList) 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setState("")
    setOpen(false);
  };
  const handleSubmit = () =>{
    const v  = plIdSpliter(state)
    collectDatafromYTApi(v)
    handleClose()
  }

  const handleChange = (e) =>{
    setState(e.target.value);
  }
  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 40,
    right: 40,
    // margin: 'right',
  });

  return (
    <div>
        
        <StyledFab  onClick={handleClickOpen} color="primary" aria-label="add">
            <AddIcon />
        </StyledFab> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add The PlayList</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can Enter the Youtube playList URL OR ID
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="PLID"
            label="Playlist ID / URL"
            type="Text"
            fullWidth
            value = {state}
            onChange={handleChange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCLE</Button>
          <Button onClick={handleSubmit}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default  PlaylistAdder