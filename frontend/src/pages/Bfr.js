import React from "react";
import {
  Container,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import RowAndColumnSpacing from "./BfrTest";

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <RowAndColumnSpacing answer1={0} answer2={0} index={0} />
            </Container>
          </section>
        </main>
        {/*<SimpleFooter />*/}
      </>
    );
  }
}

export default Login;
