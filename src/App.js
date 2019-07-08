import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import AuthService from "./components/AuthService";
import logo from "./images/jib-logo-white2.png";
//import Login from "./components/FormLogin";
import "./App.css";
const Auth = new AuthService();

class App extends Component {
  state = {
    collapseID: "",
    chkurl: "",
    isOpen: false
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
      isOpen: !this.state.isOpen
    }));
  componentDidMount() {
    this.setState({
      chkurl: window.location.pathname
    });
  }
  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar
            color="deep-purple accent-4"
            dark
            expand="md"
            fixed="top"
            scrolling
          >
            <MDBNavbarBrand exact href="/">
              <img src={logo} height="30" alt="" />{' '}InHouse(ข้อมูลสาขาและสัญญาเช่า)
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav left>
                {/* <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    Home
                  </MDBNavLink>
                </MDBNavItem> */}
                {/* <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">ข้อมูลสาขา</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="/inhouse">
                        ข้อมูลสาขาทั้งหมด
                      </MDBDropdownItem>
                      <MDBDropdownItem href="/promise">
                        ข้อมูลสัญญาเช่าชื้อ
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem> */}
                {/* <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/inhouse"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    ข้อมูลสาขา IN HOUSE (JIB)
                  </MDBNavLink>
                </MDBNavItem>*/}
                {/* <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">Doc list</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="/css">CSS</MDBDropdownItem>
                      <MDBDropdownItem href="/components">
                        Components
                      </MDBDropdownItem>
                      <MDBDropdownItem href="/advanced">
                        Advanced
                      </MDBDropdownItem>
                      <MDBDropdownItem href="/navigation">
                        Navigation
                      </MDBDropdownItem>
                      <MDBDropdownItem href="/forms">Forms</MDBDropdownItem>
                      <MDBDropdownItem href="/tables">Tables</MDBDropdownItem>
                      <MDBDropdownItem href="/modals">Modals</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem> */}
              </MDBNavbarNav>

              <MDBNavbarNav right>
{/* {this.state.chkurl === "/login" ? ( */}
                <MDBNavItem>
                 {this.state.chkurl === "/login" ? '':(
                   <MDBNavLink
                          onClick={this.handleLogout.bind(this)}
                          to="#"
                        >
                          <b style={{ color: "white" }}>ออกจากระบบ</b>
                        </MDBNavLink>
                   )}
                  
                </MDBNavItem>


              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
        <main style={{ marginTop: "4rem", marginBottom: "4rem" }}>
            <Routes />
           </main>

          <br />
          <MDBFooter
            color="deep-purple accent-4"
            className="page-footer font-small deep-purple accent-4 fixed-bottom"
          >
            <p className="footer-copyright mb-0 py-2 text-center">
              &copy; {new Date().getFullYear()}{" "}
              <a href="#">Management Information System (MIS) </a> By JIB. All
              rights reserved.
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
