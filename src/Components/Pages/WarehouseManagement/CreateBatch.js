import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { WarehouseService } from "../../../Services/WarehouseService";
class CreateBatch extends Component {
  constructor(props) {
    super();
    this.state = {
      stockId: null,
      providername:"", count:"",
      selectedStockValue: "",
      responseSuccess: "",
      responseError: "",
    };
    this.handleProductSelectChange = this.handleProductSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createProductRequest = this.createProductRequest.bind(this);
  }

  handleChange(e) {
    console.log(e);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleProductSelectChange(e) {
    console.log(e.stockId);
    console.log("aaaaa");
    this.setState({
      stockId: e.stockId,
      selectedStockValue: e,
    });
  }

  loadOptions = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length > 2) {
      return WarehouseService.GetStockNames(inputValue);
    }
  };

  handleInputChange = (value) => {
    console.log(value);
    this.setState({
      selectedProductValue: value,
      stockId: value.stockId,
    });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createProductRequest(e) {
    e.preventDefault();
    const { stockId, providername, count, responseError, responseSuccess } =
      this.state;
    console.log("stockId");
    console.log(stockId);

    WarehouseService.CreateBatch(stockId, providername, count).then(
      (result) =>
        this.setState({
          responseSuccess: "Заявка на поповнення була успішно створена.",
        }),
      (error) =>
        this.setState({
          responseError: `Виникла помилка під час відправки запиту. ${error}`,
        })
    );
  }

  render() {
    const {
      selectedStockValue,
      providername,
      count,
      responseError,
      responseSuccess,
    } = this.state;
    return (
      <Form>
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
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Виберіть сутність запасу:</Form.Label>
          <AsyncSelect
            defaultOptions
            placeholder="Знайдіть сутність запасу по назві лікарського засобу"
            value={selectedStockValue}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.stockId}
            loadOptions={this.loadOptions}
            onChange={this.handleProductSelectChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Введіть назву фірми-постачальника</Form.Label>
            <Form.Control
              type="text"
              name="providername"
              value={providername}
              placeholder="Назва фірми-постачальника"
              className="border border-info"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>
              Введіть точну кількість одиниць медичних засобів для замовлення
            </Form.Label>
            <Form.Control
              type="number"
              name="count"
              value={count}
              placeholder="Кількість препаратів"
              className="border border-info"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group as={Row} controlId="formPlaintextEmail" className="mb-0">
          <Form.Label column sm="2">
            Організація
          </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue="Аптека Доброго Дня"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextEmail" className="mb-0">
          <Form.Label column sm="2">
            Відділення
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="Відділення №15" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Адреса
          </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue="Кагарлик, Комунарська 45"
            />
          </Col>
        </Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Дані для відправки перевірено" />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          onClick={this.createProductRequest}
        >
          Створити запис про запаси
        </Button>
      </Form>
    );
  }
}

export default CreateBatch;
