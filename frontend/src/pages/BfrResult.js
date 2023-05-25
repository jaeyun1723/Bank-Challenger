import React from "react";
import {Card, Container} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Statistics from "./IndexSections/Statistics";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const name = sessionStorage.getItem("name");
const bfr = sessionStorage.getItem("financialType");

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
        <>
          <DemoNavbar/>
          <main ref="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 shape-default">

              </div>
              <Container className="pt-lg-7">
                <h2 className="display-3 text-white" style={{textAlign: 'center'}}>
                  {name}님과 같은 {bfr}에 대해 알려드릴게요!
                </h2>

                <Card container spacing={2} style={{backgroundColor: "#768ff4"}}>
                  <Grid container>
                    <Grid item xs style={{textAlign: "center"}}>
                      <img
                          alt="..."
                          width={"60%"}
                          style={{margin: "30px"}}
                          src={require("assets/img/statistics/HIF.png")}
                      />
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                      <h2 className="display-3 mb-0 text-white"
                          style={{textAlign: 'center'}}>
                        {bfr}
                      </h2>
                      <span className="description d-none d-md-inline-block text-white">
                      투자를 할 때 위험한 상품을 선호하지만, 때로는 충동적으로 투자를 하기도 합니다. 예를 들어, 주식이나 부동산과 같은 상품에 투자를 하기도 합니다.
                      미래를 위해 저축하고 투자하는 것을 좋아합니다. 예를 들어, 노후를 위해 저축을 하거나, 자녀의 교육비를 위해 저축을 합니다.
                    </span>
                    </Grid>
                  </Grid>
                </Card>
              </Container>
              <Container className="pt-lg-7">
                <Statistics/>
              </Container>
            </section>
          </main>
        </>
    );
  }
}

export default Login;
