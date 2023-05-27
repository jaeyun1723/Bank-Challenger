/*eslint-disable*/
import React from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className=" text-primary font-weight-light mb-2">
                  KB국민은행 IT아카데미 IT's Your Life 3기
                </h3>
                <h4 className=" mb-0 font-weight-light">1반 4팀</h4>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  © 2023&nbsp;
                  <a
                    href="https://github.com/boolsazo/bank-challenger"
                    target="_blank"
                  >
                    Boolsazo
                  </a>
                  .
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://www.kbstar.com/www.creative-tim.com?ref=adsr-footer"
                      target="_blank"
                    >
                      KB국민은행
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://dogu.or.kr/" target="_blank">
                      사단법인 도구
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.multicampus.com/kr/index.html"
                      target="_blank"
                    >
                      멀티캠퍼스
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
