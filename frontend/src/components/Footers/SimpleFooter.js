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

import footerBackground from "assets/img/theme/footer.png";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer" style={{ backgroundImage: `url(${footerBackground})` }}>
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="7">
                <h3 className=" text-primary font-weight-light mb-2">
                  KB국민은행 IT아카데미 IT's Your Life 3기
                </h3>
                <h4 className=" mb-0 font-weight-light">1반 4조</h4>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  © 2023.&nbsp;
                  <a
                    href="https://github.com/boolsazo/bank-challenger"
                    target="_blank"
                  >
                    Boolsazo
                  </a>
                  &nbsp;&&nbsp;OBO. All Rights Reserved.
                </div>
              </Col>
              <Col md="6">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://www.kbstar.com"
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
