import React from "react";
import { Container, Row, Col } from "reactstrap";

class Main01 extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section
            className="section section-hero section-shaped pb-0"
            style={{
              backgroundImage: `url(${require("../../assets/img/theme/main01.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          >
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <div style={{ width: "200px" }}></div>
                    <p className="lead text-white"></p>
                    <div className="btn-wrapper mt-5"> </div>
                    뱅크 챌린저는 설정한 목표를 달성할 수 있도록
                    <br />
                    자동이체를 통해 관리해주는 서비스입니다.
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Main01;
