import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(props.flag);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log('answer1 >> ' , props.answer1)
  console.log('answer2 >> ' , props.answer2)
  // const handleClickOpen = () => {
  //   setOpen(true);
  //   console.log('answer1 >> ' , props.answer1)
  //   console.log('answer2 >> ' , props.answer2)
  // };

  const handleClose = () => {
    setOpen(false);

  };

  return (
      <div>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
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
            <Button autoFocus onClick={handleClose}>
              {"제출하기"}
            </Button>
            <Button onClick={handleClose} autoFocus>
              {"취소하기"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
