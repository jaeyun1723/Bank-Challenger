import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState } from "react";
import LinearProgressWithLabel from "./IndexSections/LinearProgressWithLabel.js";
import ResponsiveDialog from "./IndexSections/ResponsiveDialog.js";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
// import ResponsiveDialog from "./IndexSections/ResponsiveDialog.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const questions = [
  { question: '돈을 좀 벌어보고 싶다면, 나는', answer_1: '채권을 알아본다.', answer_2: '주식을 알아본다.' },
  { question: '주식을 매수한다면, 나는', answer_1: '1~10년 이후를 바라보고 매수한다.', answer_2: '현재 시장에서 뜨고 있는 종목에 대해 매수한다.' },
  { question: '금융 상품에 투자 하였다면, 나는', answer_1: '대기업에 투자한다.', answer_2: '성장 기업에 투자한다.' },
  { question: '여름 휴가를 위해, 나는', answer_1: '세세하게 일정을 짠다.', answer_2: '여행지 숙소랑 교통편만 정해둔다.' },
  { question: '코 앞으로 다가온 어버이날, 부모님을 위해 나는', answer_1: '꼼꼼하게 가격과 디자인을 고려해서 선물을 정한다', answer_2: '집 오는 길에 눈에 보이는 선물을 사온다.' },
  { question: '출근하기 위해 집을 나가기 전, 나는', answer_1: '버스/지하철이 도착하는 시간에 맞춰 나간다.', answer_2: '그냥 나간다.' },
  { question: '연금 복권에 당첨되었다면, 나는', answer_1: '한 번에 받는다.', answer_2: '달마다 받는다.' },
  { question: '가고 싶은 나라가 있을 때, 나는', answer_1: '바로 간다.', answer_2: '좋은 시즌에 맞춰서 간다.' },
  { question: '삶에 있어서 인생 계획을 세울 때, 나는 ', answer_1: '짧고 굵게 세운다. ', answer_2: '길고 가늘게 세운다. ' },
  { question: '', answer_1: '', answer_2: '' }
];

export default function RowAndColumnSpacing(props) {
  const [data, setData] = useState(questions);
  const [answer1, setAnswer1] = useState(props.answer1);
  const [answer2, setAnswer2] = useState(props.answer2);
  const [index, setIndex] = useState(props.index);
  const [progress, setProgress] = React.useState(props.index);
  const [flag, setFlag] = React.useState(false);
  const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(prop.progress);
  // console.log(activeStep)
  // const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setIndex((cur) => cur + 1)
    if (index === 7) {
      setFlag(true)
    }
  };

  return (
      <Card sx={{ minWidth: 275 }}>
        <Box sx={{ width: '90%', margin: '5%' }}>
          <LinearProgressWithLabel progress={index} />
          {flag ? <ResponsiveDialog flag = {true} answer1 = {answer1} answer2 = {answer2}/> : null}
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sx={{ height: '50%'}} >
              <Item>
                {data[index].question}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                <Box
                    onClick={() => {
                      setAnswer1(answer1 + 1)
                      handleNext()
                      setProgress(index + 1)
                    }}
                    sx={{
                      height: '50%',
                      '&:hover': {
                        cursor: 'pointer',
                        color: 'white',
                        backgroundColor: 'text.disabled',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                >
                  {data[index].answer_1}
                </Box>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Box
                    onClick={() => {
                      setAnswer2(answer2 + 1)
                      handleNext()
                      setIndex(index + 1)
                    }}
                    sx={{
                      height: '50%',
                      '&:hover': {
                        cursor: 'pointer',
                        color: 'white',
                        backgroundColor: 'text.disabled',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                >
                  {data[index].answer_2}
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Card>
  );
}