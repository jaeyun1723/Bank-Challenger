import { React, useState, useEffect } from "react";
import axios from "axios";
import BubbleChart from "@testboxlab/react-bubble-chart-d3";

const BFRChart = () => {
  const userId = sessionStorage.getItem("userId");
  const [bfr, setBFR] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get("/bfr/result/" + sessionStorage.getItem("userId"))
        .then((response) => {
          setBFR(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // userId가 없으면 메인 페이지로 이동
      window.location.href = "/";
    }
  }, []);
  console.log("BFR", bfr);
  console.log("consumption type", bfr.consumption);

  return (
    <BubbleChart
      width={600}
      height={450}
      legendFont={{
        family: 'Arial',
        size: 12,
        color: '#000',
        weight: 'bold',
      }}
  valueFont={{
        family: 'Arial',
        size: 12,
        color: '#fff',
        weight: 'bold',
      }}
  labelFont={{
        family: 'Arial',
        size: 16,
        color: '#fff',
        weight: 'bold',
      }}
      data={[
        { label: '소비', value:  bfr.consumption, color:  '#C185FF'},
        { label: '예적금', value:  bfr.deposit, color: '#F7819A' },
        { label: '투자', value:  bfr.invest, color: 'rgb(118, 145, 246)'},
        { label: '고정비용', value:  bfr.fixedCost, color: 'rgb(237, 237, 6)' }
      ]}
      showLegend={true}
      legendPercentage={20}
      graph={{
        zoom: 1,
        offsetX: -0.05,
        offsety: -0.01,
      }}
      charsBeforeSplit={12}
      overflow={true}
    />
  );
};

export default BFRChart;
