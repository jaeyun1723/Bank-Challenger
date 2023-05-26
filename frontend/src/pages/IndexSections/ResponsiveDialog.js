import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { React, useEffect, useState } from 'react';
import axios from "axios";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = useState(props.flag);
  console.log(props)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const Submit = () => {
    setOpen(false);
    axios.post("/bfr", props.request)
    .then(response => {
      window.location.href = "/bfr-result";
    })
    .catch(error => console.log(error));

    // useEffect(() => {
    //
  };

  // const handleClose = () => {
  //   setOpen(false);
  //
  // };

  return (
      <div>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            // onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"폼을 제출하시겠습니까?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {"뱅크 챌린져가 구성한 금융대사량에 따라 돈을 모아보세요!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={Submit}>
              {"제출하기"}
            </Button>
            {/*<Button onClick={handleClose} autoFocus>*/}
            {/*  {"취소하기"}*/}
            {/*</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
  );
}
