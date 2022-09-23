import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const  DeleteConfirmation = ({ handleClose , open  , handleAgree , plTittle }) => {
  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            `Do you Wanna Delete <strong> {plTittle} </strong>  Playlist `
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color : "red"}} onClick={handleClose}>NO</Button>
          <Button onClick={handleAgree}>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default  DeleteConfirmation