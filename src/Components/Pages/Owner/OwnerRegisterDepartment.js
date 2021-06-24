import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { RegistrationService } from "../../../Services/RegistrationService";

class OwnerRegisterDepartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      shortName: "",
      region: "",
      area: "",
      localityName: "",
      addressStreet: "",
      addressStreetNumber: "",
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
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      submitted,
      responseSuccess,
      responseError,
    } = this.state;
  }

  // createRegistrationRequest(e) {
  //   e.preventDefault();
  //   const {
  //     name,
  //     shortName,
  //     region,
  //     area,
  //     localityName,
  //     addressStreet,
  //     addressStreetNumber,
  //     submitted,
  //     responseSuccess,
  //     responseError,
  //   } = this.state;
  //   RegistrationService.department(
  //     name,
  //     shortName,
  //     region,
  //     area,
  //     localityName,
  //     addressStreet,
  //     addressStreetNumber
  //   ).then(
  //     (result) =>
  //       this.setState({
  //         responseSuccess: "Сутність запасу була успішно додана до системи.",
  //       }),
  //     (error) =>
  //       this.setState({
  //         responseError: `Виникла помилка під час відправки запиту. ${error}`,
  //       })
  //   );
  // }

  handleSubmits(e) {
    e.preventDefault();
    this.setState({
      responseError:'',
      responseSuccess: ''
    });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ submitted: true });
      return;
    }

    const {
      name,
      shortName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      submitted,
      responseSuccess,
      responseError,
    } = this.state;
    RegistrationService.department(
      name,
      shortName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      submitted,
      responseSuccess,
      responseError
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
  }
  render() {
    const {
      name,
      shortName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      submitted,
      responseSuccess,
      responseError,
    } = this.state;
    return (
      <>
        <h2>Реєстрація відділення</h2>
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
              <Form.Label>Назва відділення</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Введіть повну назву відділення"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                autoComplete="off"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Коротка назва відділення</Form.Label>
              <Form.Control
                type="text"
                name="shortName"
                value={shortName}
                placeholder="Введіть коротку назву відділення"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                autoComplete="off"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Область</Form.Label>
              <Form.Control
                type="text"
                name="region"
                value={region}
                placeholder="Введіть назву області"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Район</Form.Label>
              <Form.Control
                type="text"
                name="area"
                value={area}
                placeholder="Введіть назву району"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Населений пункт</Form.Label>
              <Form.Control
                type="text"
                name="localityName"
                value={localityName}
                placeholder="Введіть назву населеного пункту"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Локація</Form.Label>
              <Form.Control
                type="text"
                name="addressStreet"
                value={addressStreet}
                placeholder="Введіть назву локації (вулиці, проспекту тощо)"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                required
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Номер локації</Form.Label>
              <Form.Control
                type="text"
                name="addressStreetNumber"
                value={addressStreetNumber}
                placeholder="Введіть номер локації (вулиці, проспекту тощо)"
                className="border border-info"
                onChange={(e) => this.handleChange(e)}
                autoComplete="off"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Дані для відправки перевірено"
              required
            />
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

export default OwnerRegisterDepartment;
