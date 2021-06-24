import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userActions } from "../../../_actions";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      login: "",
      password: "",
      submitted: false,
      redirect: null,
      authorized: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { login, password } = this.state;
    const { dispatch } = this.props;
    if (login && password) {
      dispatch(userActions.login(login, password));
    }
  }

  render() {
    const { login, password, submitted } = this.state;
    const { loggingIn } = this.props;
    if (loggingIn) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <h2>Вхід до системи</h2>
        {loggingIn === false && 
            <div className="alert alert-danger" role="alert">
            Виникла помилка під час входу. Перевірте логін та пароль
          </div>
        }
        <Form
          noValidate
          validated={submitted}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Введіть логін (номер телефону або пошту)</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={login}
                placeholder="Пошта/Номер телефону"
                className="border border-info"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                placeholder="Введіть пароль для входу в кабінет закладу"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Button variant="success" type="submit">
            Увійти
          </Button>
        </Form>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
