import React, { useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Statistics from "./IndexSections/Statistics";
import BfsProgressBar from "./IndexSections/BfsProgressBar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import axios from "axios";

const bfrData = {
  LRP: {
    consumption: 31,
    deposit: 45,
    invest: 8,
    fixedCost: 16,
    img: require("assets/img/statistics/LRP.png"),
    characteristic1:
      "안정성을 중시하며, 신중하고 철저한 계획과 분석을 통해 현재의 안정과 안락을 추구하는 유형입니다.",
    characteristic2:
      "안정적이고 계획적인 소비에 중점을 둡니다. 예산을 지키고 필요한 가계 지출을 고려합니다.",
    characteristic3: "안전성이 높은 투자 상품을 선호하며 주식과 선물, 코인 등의 고위험 투자의 경우 선호하지 않는 경향이 있습니다.",
    advice:
      "안정적인 투자 방법을 선호하는 유형이므로, 저위험 저수익의 투자 상품에 관심을 가질 수 있습니다. 예를 들어, 은행 예적금상품이나 국채를 고려해볼 수 있습니다.",
    tip: "매달 예산을 수립하고 소비를 추적하여 지출을 철저히 관리하세요. 예산을 지키면서도 필요한 가계 지출을 우선 고려하고 남는 금액을 저축에 할당하는 것을 추천합니다.",
  },
  LRF: {
    consumption: 38,
    deposit: 33,
    invest: 17,
    fixedCost: 12,
    img: require("assets/img/statistics/LRF.png"),
    characteristic1:
      "안정성을 추구하며, 계획적으로 행동하고 현재의 이익에 주로 관심을 가지는 유형입니다.",
    characteristic2:
      "자금을 투자할 때 위험을 최소화하려고 하며, 계획에 따라 조금씩 수익을 추구합니다.",
    characteristic3: "단기적인 이익보다는 안정성과 장기적인 목표를 중시합니다.",
    advice:
      "안정적이고 안전한 투자 방법을 선호하는 유형이므로, 저위험 저수익의 투자 상품에 관심을 가질 수 있습니다. 예를 들어, 정기 예금이나 채권을 고려해볼 수 있습니다.",
    tip: "현재의 이익을 중시하므로, 소비에 있어서도 신중하고 합리적인 선택을 할 수 있습니다. 예산을 세우고 계획에 따라 지출하는 것이 중요합니다.",
  },
  LIP: {
    consumption: 36,
    deposit: 24,
    invest: 23,
    fixedCost: 17,
    img: require("assets/img/statistics/LIP.png"),
    characteristic1:
      "안정성을 추구하지만 때로는 충동적으로 행동하고 현재의 이익에 주로 관심을 가지는 유형입니다.",
    characteristic2:
      "일반적으로 안정적이지만, 때때로 유혹에 쉽게 빠지기도 합니다.",
    characteristic3:
      "현재의 이익을 즐기면서도 중장기적인 안정성을 유지하려고 노력합니다.",
    advice:
      "안정성을 추구하지만 가끔 충동적인 행동을 할 수 있으므로, 중간 정도의 위험을 감수할 수 있는 투자 상품을 고려해볼 수 있습니다. 예를 들어, 균형형 펀드나 주식 투자를 고려해볼 수 있습니다.",
    tip: "현재의 이익을 즐기면서도 중장기적인 안정성을 유지하려고 노력해야 합니다. 자기 계발이나 여행 등의 경험에 투자하는 것도 고려해볼만합니다.",
  },
  LIF: {
    consumption: 23,
    deposit: 45,
    invest: 14,
    fixedCost: 18,
    img: require("assets/img/statistics/LIF.png"),
    characteristic1:
      "안정성을 추구하며, 계획적으로 행동하고 미래에 대한 장기적인 관점을 가지는 유형입니다.",
    characteristic2:
      "투자나 소비 결정을 할 때 장기적인 목표와 미래의 이익을 중시합니다.",
    characteristic3: "일정한 계획에 따라 투자하고, 장기적인 이익을 추구합니다.",
    advice:
      "안정성을 추구하며 장기적인 관점을 가지므로, 장기 투자에 초점을 맞출 수 있습니다. 예를 들어, 주식 시장의 장기 성장 가능성이 높은 기업에 투자하는 것을 고려해볼 수 있습니다.",
    tip: "장기적인 목표를 중시하므로, 저축과 투자에 주력하고 미래에 대비하는 소비 습관을 가지는 것이 중요합니다.",
  },
  HRP: {
    consumption: 35,
    deposit: 22,
    invest: 31,
    fixedCost: 12,
    img: require("assets/img/statistics/HRP.png"),
    characteristic1:
      "위험을 감수하며, 계획적으로 행동하고 현재의 이익에 주로 관심을 가지는 유형입니다.",
    characteristic2:
      "주식 등의 위험한 투자에 도전하면서도 계획에 따라 행동합니다.",
    characteristic3:
      "단기적인 이익을 추구하면서도 위험을 최소화하기 위해 계획에 기반을 둡니다.",
    advice:
      "위험을 감수하면서도 계획적인 투자를 선호하는 유형이므로, 주식이나 선물, 옵션 등의 위험한 투자에 도전해볼 수 있습니다. 단, 적절한 리스크 관리가 필요합니다.",
    tip: "소비 결정에 있어서도 현재의 이익을 중시하므로, 가끔은 즉각적인 소비를 허용해주는 것이 좋습니다. 다만, 지나친 충동 소비는 피해야 합니다.",
  },
  HRF: {
    consumption: 31,
    deposit: 23,
    invest: 34,
    fixedCost: 12,
    img: require("assets/img/statistics/HRF.png"),
    characteristic1:
      "위험을 감수하며, 계획적으로 행동하고 미래에 대한 장기적인 관점을 가지는 유형입니다.",
    characteristic2: "위험한 투자에 도전하면서도 장기적인 이익을 추구합니다.",
    characteristic3: "투자 계획을 세우고 장기적인 투자 수익을 추구합니다.",
    advice:
      "위험을 감수하면서도 장기적인 이익을 추구하는 유형이므로, 주식 시장의 성장 가능성이 높은 기업이나 새로운 분야에 투자해볼 수 있습니다. 단, 적절한 리스크 관리가 필요합니다.",
    tip: "장기적인 이익을 얻을 수 있는 투자나 경험에 투자하는 것을 선호하므로, 교육이나 경험에 투자하는데 관심을 가질 수 있습니다.",
  },
  HIP: {
    consumption: 24,
    deposit: 26,
    invest: 44,
    fixedCost: 16,
    img: require("assets/img/statistics/HIP.png"),
    characteristic1:
      "위험을 감수하며, 충동적으로 행동하고 현재의 이익에 주로 관심을 가지는 유형입니다.",
    characteristic2:
      "위험한 투자에 도전하며, 때로는 충동적으로 투자 결정을 내립니다.",
    characteristic3:
      "단기적인 이익을 즐기면서도 위험한 투자로 큰 수익을 얻고자 합니다.",
    advice:
      "위험을 감수하고 충동적으로 투자하는 경향이 있으므로, 주식이나 암호화폐와 같은 고수익 고위험 투자를 고려해볼 수 있습니다. 하지만 균형을 잡는 것이 중요합니다.",
    tip: "충동적인 소비에 주의해야 하며, 현재의 이익을 추구하면서도 적절한 금액을 저축하고 투자하는 것이 필요합니다.",
  },
  HIF: {
    consumption: 34,
    deposit: 26,
    invest: 30,
    fixedCost: 10,
    img: require("assets/img/statistics/HIF.png"),
    characteristic1:
      "위험을 감수하며, 충동적으로 행동하고 미래에 대한 장기적인 관점을 가지는 유형입니다.",
    characteristic2: "위험한 투자에 도전하면서도 장기적인 이익을 추구합니다.",
    characteristic3:
      "충동적인 결정도 내리지만, 장기적인 이익을 얻을 수 있는 투자를 선호합니다.",
    advice:
      "위험을 감수하고 충동적으로 투자하면서도 장기적인 이익을 추구하는 유형이므로, 주식 시장이나 새로운 투자 기회에 도전해볼 수 있습니다. 단, 적절한 리스크 관리가 필요합니다.",
    tip: "충동적인 소비를 피하고, 장기적인 이익을 얻을 수 있는 상품이나 경험에 투자하는 것을 추천합니다. 장기적인 목표를 가지고 합리적인 소비를 실천하는 것이 중요합니다.",
  },
};

const job = {
  inoccupation: 0,
  student: 0,
  employee: 0,
  ownerOperator: 0,
  specializedJob: 0,
  freelancer: 0,
  civilServant: 0,
  engineer: 0,
  service: 0,
};

const goal = {
  buy: 0,
  go: 0,
  collect: 0,
};

const result = [];

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    //this.refs.main.scrollTop = 0;
  }

  render() {
    const name = sessionStorage.getItem("name");
    const userId = sessionStorage.getItem("userId");
    const bfr = sessionStorage.getItem("financialType");
    try {
      return (
        <>
          <DemoNavbar />
          <main ref="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 shape-default">
                <img
                  alt="..."
                  src={require("assets/img/theme/background02.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "2000px",
                    margin: "0 auto",
                  }}
                />
              </div>
              <Container className="pt-lg-7">
                <h2
                  className="display-3 text-white"
                  style={{ textAlign: "center" }}
                >
                  {name}님과 같은 "{bfr}"에 대해 알려드릴게요!
                </h2>
                <br />
                <Card
                  container
                  spacing={2}
                  style={{ backgroundColor: "#768ff4", border: "none" }}
                >
                  <Grid container>
                    <Grid item xs style={{ textAlign: "center" }}>
                      <img
                        alt="..."
                        style={{ width: '95%', marginTop: '90px', height: '80%' }}
                        src={bfrData[bfr].img}
                      />
                    </Grid>
                    <Divider
                      orientation="vertical"
                      flexItem
                      style={{ border: "none" }}
                    />
                    <Grid item xs>
                      <h2
                        className="display-3 mb-0 text-white"
                        style={{ textAlign: "center" }}
                      >
                        <br />
                      </h2>
                      <div
                        className="description d-none d-md-inline-block text-white"
                        style={{ verticalAlign: "middle" }}
                      >
                        <div><h2
                          className="display-3 mb-0 text-white"
                          style={{ textAlign: "center" }}
                        >
                          {bfr}형들의 자산 상태는?
                        </h2>
                        <br/>
                          <div style={{ marginLeft: '20px' }}>
                            <BfsProgressBar
                              style={{ textAlign: "center"}}
                              consumption={bfrData[bfr].consumption}
                              deposit={bfrData[bfr].deposit}
                              invest={bfrData[bfr].invest}
                              fixedCost={bfrData[bfr].fixedCost}
                            />
                          </div>
                          <br />
                          <div style={{ marginLeft: '20px' }}>
                            <div className="navbar-brand">특징</div>
                            <br />- {bfrData[bfr].characteristic1}
                            <br />- {bfrData[bfr].characteristic2}
                            <br />- {bfrData[bfr].characteristic3}
                          </div>
                        </div>
                        <div
                          className="description d-none d-md-inline-block text-white"
                          style={{ verticalAlign: "middle" }}
                        >
                          <br />
                          <div style={{ marginLeft: '20px' }}>
                            <div className="navbar-brand" >투자 조언</div>
                            <br />
                            {bfrData[bfr].advice}
                          </div>
                          <br />
                          <div style={{ marginLeft: '20px' }}>
                            <div className="navbar-brand">소비 팁</div>
                            <br />
                            {bfrData[bfr].tip}
                          </div>
                          <br />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Container>
              <Container className="pt-lg-7">
                <Statistics />
              </Container>
            </section>
          </main>
        </>
      );
    } catch (error) {
      //console.log(error);
      if (userId === null) {
        window.location.href = "/";
      } else {
        setTimeout(() => {
          window.location.replace("/bfr-result");
        }, 500);
      }
    }
  }
}

export default Login;
