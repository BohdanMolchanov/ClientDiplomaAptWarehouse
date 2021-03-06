import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { WarehouseService } from "../../../Services/WarehouseService";
import { ClientService } from "../../../Services/ClientService";
class CreateStock extends Component {
  constructor(props) {
    super();
    this.state = {
      productId: null,
      sellprice: "",
      purchaseprice: "",
      maxcount: "",
      orderpoint: "",
      orderperiod: "",
      selectedProductValue: "",
      responseSuccess: "",
      responseError: "",
      submitted: "",
      departmentInfo: ""
    };
    this.handleProductSelectChange = this.handleProductSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createProductRequest = this.createProductRequest.bind(this);
  }

  componentWillMount() {
    ClientService.getAuthorizedDepartmentInformation().then((result) => {
      this.setState({ departmentInfo: result });
    });
  }

  handleChange(e) {
    console.log(e);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleProductSelectChange(e) {
    console.log(e.productId);
    console.log("aaaaa");
    this.setState({
      productId: e.productId,
      selectedProductValue: e,
    });
  }

  loadOptions = (inputValue) => {
    console.log(inputValue);
    return WarehouseService.SearchProductList(inputValue);
  };

  handleInputChange = (value) => {
    console.log(value);
    this.setState({
      selectedProductValue: value,
      productId: value.productId,
    });
  };

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
      this.setState({ submitted: true });
      return;
    }
    const {
      productId,
      maxcount,
      purchaseprice,
      sellprice,
      orderpoint,
      orderperiod,
      responseError,
      responseSuccess,
    } = this.state;
    console.log("productid");
    console.log(productId);

    WarehouseService.CreateStock(
      productId,
      maxcount,
      purchaseprice,
      sellprice,
      orderpoint,
      orderperiod
    ).then(
      (result) =>
        this.setState({
          responseSuccess: "Сутність запасів була успішно створена",
        }),
      (error) =>
        this.setState({
          responseError: `Виникла помилка під час відправки запиту. ${error}`,
        })
    );
  }

  render() {
    const {
      selectedProductValue,
      sellprice,
      purchaseprice,
      maxcount,
      orderperiod,
      orderpoint,
      responseError,
      responseSuccess,
      submitted,
      departmentInfo
    } = this.state;
    return (
      <Form
        noValidate
        validated={submitted}
        onSubmit={this.createProductRequest}
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
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Медичний препарат:</Form.Label>
          <AsyncSelect
            defaultOptions
            placeholder="Знайдіть медичний засіб у довіднику"
            value={selectedProductValue}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.productid}
            loadOptions={this.loadOptions}
            onChange={this.handleProductSelectChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Ціна закупівлі (за 1 шт.)</Form.Label>
            <Form.Control
              type="number"
              name="purchaseprice"
              value={purchaseprice}
              placeholder="Введіть ціну, за якою повинен закупатися товар"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Ціна продажу (за 1 шт.)</Form.Label>
            <Form.Control
              type="number"
              name="sellprice"
              value={sellprice}
              placeholder="Введіть ціну, за якою повинен продаватися товар"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Модель системи управління запасом:</Form.Label>
          <Form.Control as="select" custom className="border border-warning" disabled>
            <option>
              Із заданою періодичністю поповнення запасів до встановленого рівню
              (рекомендовано)
            </option>
            {/* <option>З фіксованим розміром замовлення</option>
            <option>Система періодичного замовлення</option> */}
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Максимальна кількість запасів (шт.)</Form.Label>
            <Form.Control
              type="number"
              className="border border-info"
              name="maxcount"
              value={maxcount}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Період поповнення (у днях)</Form.Label>
            <Form.Control
              type="number"
              className="border border-info"
              name="orderperiod"
              value={orderperiod}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Точка замовлення</Form.Label>
            <Form.Control
              type="number"
              name="orderpoint"
              value={orderpoint}
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        {departmentInfo && (
          <>
            <Form.Group
              as={Row}
              controlId="formPlaintextEmail"
              className="mb-0"
            >
              <Form.Label column sm="2">
                Організація
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={departmentInfo.organization.name}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formPlaintextEmail"
              className="mb-0"
            >
              <Form.Label column sm="2">
                Відділення
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={departmentInfo.name}
                />
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
                  defaultValue={`${departmentInfo.addressText}`}
                />
              </Col>
            </Form.Group>
          </>
        )}

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Дані для відправки перевірено" required/>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
        >
          Створити запис про запаси
        </Button>
      </Form>
    );
  }
}

export default CreateStock;
