import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chart from './Chart.js';
import PieChart from './PieChart.js';
import Bar from './Bar.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid>
          <Grid item>
            <h3 className="text-white" style={{textAlign: 'center'}}>직종 통계</h3>
            <Item><Chart /></Item>
            <br />
            <h4 className="text-white" style={{textAlign: 'center'}}>"000을 가진 사람들은 '생산직'인 사람이 많네요!"</h4>
          </Grid>
          <br/>
          <Grid item>
            <h2 className="display-3 text-white" style={{textAlign: 'center'}}>
              목표 통계
            </h2>
            <Item><PieChart /></Item>
            <br />
            <h4 className="text-white" style={{textAlign: 'center'}}>"000을 가진 사람들은 '해보자' 목표를 가진 사람이 많네요!</h4>
          </Grid>
          <br/>
          <Grid item>
            <h2 className="display-3 text-white" style={{textAlign: 'center'}}>
              성별/나이 통계
            </h2>
            <Item><Bar /></Item>
            <br />
            <h4 className="text-white" style={{textAlign: 'center'}}>"000을 가진 사람들은 '해보자' 목표를 가진 사람이 많네요!</h4>
          </Grid>
        </Grid>
      </Box>
  );
}
