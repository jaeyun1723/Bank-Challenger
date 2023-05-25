import React from "react";
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Download from "./IndexSections/Download.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import GoalMain from "./GoalMain"; // GoalMain 컴포넌트를 import합니다.

class Landing extends React.Component {
  state = {};
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
          <div className="position-relative">
            {/* shape Hero */}
            <section
              className="section section-lg section-shaped pb-500"
              style={{
                width: "100%",
                height: "1200px",
                maxWidth: "2000px",
                margin: "0 auto",
              }}
            >
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "60%", // 수정할 위치 (예: "70%")
                  left: "50%",
                  transform: "translate(-50%, -70%)",
                  backgroundColor: "white",
                  width: "85%", // 수정할 너비
                  height: "800px", // 수정할 높이
                  zIndex: 10,
                  display: "flex",
                }}
              >
                <GoalMain userId={2} />
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default Landing;
