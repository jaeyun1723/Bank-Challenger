import React from "react";
import { Container } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import RowAndColumnSpacing from "./BfrTest";

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    // const userId = sessionStorage.getItem("userId");
    // const financialType = sessionStorage.getItem("financialType");
    //
    // if (userId === null) {
    // window.location.href = "/";
    // } else if (financialType !== "null") {
    // window.location.href = "/";
    // } else {
    return (
        <>
          <DemoNavbar />
          <main ref="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 shape-default">
                <img
                    alt="..."
                    src={require("assets/img/theme/background.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "2000px",
                      margin: "0 auto",
                    }}
                />
              </div>
              <Container className="pt-lg-7">
                <RowAndColumnSpacing answer1={0} answer2={0} index={0} />
                <br />
                <br />
              </Container>
            </section>
          </main>
          {/*<SimpleFooter />*/}
        </>
    );
  }
}
// }

export default Login;
