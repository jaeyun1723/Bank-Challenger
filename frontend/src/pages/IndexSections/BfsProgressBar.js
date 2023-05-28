import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function BfsProgressBar(props) {
  const [consumption, setConsumption] = React.useState(0);
  const [deposit, setDeposit] = React.useState(0);
  const [invest, setInvest] = React.useState(0);
  const [fixedCost, setCost] = React.useState(0);

  React.useEffect(() => {
    const consumption = setInterval(() => {
      setConsumption(props.consumption);
    }, 50);

    const deposit = setInterval(() => {
      setDeposit(props.deposit);
    }, 50);

    const invest = setInterval(() => {
      setInvest(props.invest);
    }, 50);

    const fixedCost = setInterval(() => {
      setCost(props.fixedCost);
    }, 50);

    return () => {
      clearInterval(consumption);
      clearInterval(deposit);
      clearInterval(invest);
      clearInterval(fixedCost);
    };
  }, []);

  return (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} style={{marginBottom: "3px"}}>
          <Grid item xs={3}>
            <div className="navbar-brand">소비</div>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '80%', mr: 1 }}>
                <LinearProgress variant="determinate" style={{borderRadius: "5"}} value={consumption} color="secondary" />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.white">{`${Math.round(
                    props.consumption,
                )}%`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginBottom: "3px"}}>
          <Grid item xs={3}>
            <div className="navbar-brand">예적금</div>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '80%', mr: 1 }}>
                <LinearProgress variant="determinate" style={{borderRadius: "5"}} value={deposit} color="success" />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.white">{`${Math.round(
                    props.deposit,
                )}%`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginBottom: "3px"}}>
          <Grid item xs={3}>
            <div className="navbar-brand">투자(주식, 코인)</div>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '80%', mr: 1 }}>
                <LinearProgress variant="determinate" style={{borderRadius: "5"}} value={invest} color="error" />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.white">{`${Math.round(
                    props.invest,
                )}%`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginBottom: "3px"}}>
          <Grid item xs={3}>
            <div className="navbar-brand">고정비용(보험,세금)</div>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '80%', mr: 1 }}>
                <LinearProgress variant="determinate" style={{borderRadius: "5"}} value={fixedCost}/>
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.white">{`${Math.round(
                    props.fixedCost,
                )}%`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
}
