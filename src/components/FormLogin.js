import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button
} from "mdbreact";
import "../components/login.css";
import AuthService from './AuthService';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmitt = this.handleFormSubmitt.bind(this);
    this.Auth = new AuthService();
  }
  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleFormSubmitt(e) {
    e.preventDefault();
    e.target.className += " was-validated";
     if (this.state.username === "") {
       this.setState({ msg: "กรุณากรอก username!" });
     } else if (this.state.password === "") {
       this.setState({ msg: "กรุณากรอก password!" });
    } else {

      this.Auth.login(this.state.username, this.state.password, 123).then(
        res => {
          //this.props.history.replace("/");
          //window.location.reload();
          if (res.accessapp === false) {
            this.setState({ msg: "Username || Password is Incorrect??" });
          } else {
            this.props.history.replace("/");
            window.location.reload();
          }
        }
      );
  }
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
        <Col></Col>
          <Col md="6" sm="12" lg="6">
            <form className="needs-validation" onSubmit={this.handleFormSubmitt} noValidate>
              <p className="h5 text-center mb-4">Sign in</p>

              <div className="grey-text">
                <Input name="username" label="Username" icon="user" type="text" error="wrong" success="right" onChange={this.handleChange} value={this.state.username} required/>
                <Input name="password" label="Password" icon="lock" type="password" error="wrong" success="right" value={this.state.password} onChange={this.handleChange} required/>
              </div>
              <div className="text-center">
                <Button type="submit">Login</Button>
                <p className="red-text"><h4> {this.state.msg}</h4></p>
              </div>
            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default FormLogin;
