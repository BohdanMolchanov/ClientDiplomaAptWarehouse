import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { AdminService } from "../../../Services/AdminService";
class AdminMedicineFilling extends Component {
  constructor(props) {
    super();
    this.state = {
      nameUkr: "",
      nameEn: "",
      productType: "",
      description: "",
      responseSuccess: "",
      responseError: "",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createProductRequest(e) {
    e.preventDefault();
    this.setState({
      responseError:'',
      responseSuccess: ''
    });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      
      e.stopPropagation();
      this.setState({submitted: true})
      return;
    }
    const { nameUkr, nameEn, productType, description } = this.state;

    AdminService.createProduct(nameUkr, nameEn, productType, description).then(
      (result) =>
        this.setState({
          responseSuccess:
            "Медичний препарат успішно доданий до списку запасів.",
        }),
      (error) =>
        this.setState({
          responseError: `Виникла помилка під час відправки запиту. ${error}`,
        })
    );
  }

  render() {
    const {
      nameUkr,
      nameEn,
      productType,
      description,
      responseError,
      responseSuccess,
      submitted
    } = this.state;
    return (
      <Form
        noValidate
        validated={submitted}
        onSubmit={(e) => this.createProductRequest(e)}
      >
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
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              Введіть назву медичного засобу (українською)
            </Form.Label>
            <Form.Control
              type="text"
              name="nameUkr"
              value={nameUkr}
              placeholder="Назва засобу українською"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Введіть назву медичного засобу (латиницею)</Form.Label>
            <Form.Control
              type="text"
              name="nameEn"
              value={nameEn}
              placeholder="Назва засобу латиницею"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Введіть опис медичного засобу</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              placeholder="Опис засобу"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Дані для відправки перевірено" required/>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
        >
          Додати запис у довідник
        </Button>
      </Form>
    );
  }
}

export default AdminMedicineFilling;
