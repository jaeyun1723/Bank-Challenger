import React from "react";
import { Link, useHistory } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class DemoNavbar extends React.Component {
  doLogin = () => {
    const history = useHistory();
    history.push("/login");
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    const userId = sessionStorage.getItem("userId");
    const bfr = sessionStorage.getItem("bfr");
    const name = sessionStorage.getItem("name");
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                Bank Challenger
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/goal" tag={Link} >
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">목표현황</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/bfr" tag={Link}>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">금융대사량</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/manageaccount" tag={Link}>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">계좌 관리</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/mypage" tag={Link}>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">나의 정보</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </Nav>

                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  {userId === null ? (
                    <>
                      <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="/login"
                        >
                          <span className="nav-link-inner--text ml-1">
                            로그인
                          </span>
                        </Button>
                      </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem>
                        <UncontrolledDropdown nav>
                          <span className="text-white">
                            {name}님 안녕하세요
                          </span>
                        </UncontrolledDropdown>
                      </NavItem>
                      <NavItem className="d-none d-lg-block ml-lg-4">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="/logout"
                        >
                          <span className="nav-link-inner--text ml-1">
                            로그아웃
                          </span>
                        </Button>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
