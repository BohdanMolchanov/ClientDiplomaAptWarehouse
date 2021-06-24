import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { RegistrationService } from "../../../Services/RegistrationService";

class RegisterOrganizationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      shortName: "",
      edrpou: "",
      password: "",
      phone: "",
      email: "",
      firstName: "",
      secondName: "",
      lastName: "",
      submitted: false,
      responseSuccess: "",
      responseError: "",
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
    const {
      name,
      shortName,
      edrpou,
      password,
      phone,
      email,
      firstName,
      secondName,
      lastName,
    } = this.state;
  }

  handleSubmits (e) {
    this.setState({
      responseError:'',
      responseSuccess: ''
    });
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      
      e.stopPropagation();
      this.setState({submitted: true})
      return;
    }

    const {
        name,
        shortName,
        edrpou,
        password,
        phone,
        email,
        firstName,
        secondName,
        lastName,
      } = this.state;
      RegistrationService.organization(
        name,
        shortName,
        edrpou,
        password,
        phone,
        email,
        firstName,
        secondName,
        lastName
      ).then(
        (result) =>
          this.setState({
            responseSuccess: "Заявка на реєстрацію була успішно подана.",
          }),
        (error) =>
          this.setState({
            responseError: `Виникла помилка під час відправки запиту. ${error}`,
          })
      );

  };
  render() {
    // if(loggingIn){
    //     return <Redirect to ="/"/>
    // }
    const {
      name,
      shortName,
      edrpou,
      password,
      phone,
      email,
      firstName,
      secondName,
      lastName,
      responseError,
      responseSuccess,
      submitted,
    } = this.state;
    return (
      <>
        <h2>Реєстрація закладу</h2>
        {responseError && (
          <div class="alert alert-danger" role="alert">
            {responseError}
          </div>
        )}
        {responseSuccess && (
          <div class="alert alert-success" role="alert">
            {responseSuccess}
          </div>
        )}
        <Form
        noValidate
        validated={submitted}
          onSubmit={(e) => this.handleSubmits(e)}
        >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Назва закладу</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Введіть повну назву закладу"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Коротка назва закладу</Form.Label>
              <Form.Control
                type="text"
                name="shortName"
                value={shortName}
                placeholder="Введіть коротку назву закладу"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>ЄДРПОУ</Form.Label>
              <Form.Control
                type="text"
                name="edrpou"
                value={edrpou}
                placeholder="Введіть ЄДРПОУ"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
              />
            </Form.Group>
          </Form.Row>
          <h5>Дані директора закладу</h5>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Пошта</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Введіть пошту закладу"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Номер телефону</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={phone}
                placeholder="Введіть номер телефону"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
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

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Прізвище</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Введіть прізвище директора"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Ім'я</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Введіть ім'я директора"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>По-батькові</Form.Label>
              <Form.Control
                type="text"
                name="secondName"
                value={secondName}
                placeholder="Введіть по-батькові директора"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Дані для відправки перевірено" required />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            //onClick={(e) => this.createRegistrationRequest(e)}
          >
            Створити запит на реєстрацію організації
          </Button>
        </Form>
      </>
    );
  }
}

export default RegisterOrganizationPage;
