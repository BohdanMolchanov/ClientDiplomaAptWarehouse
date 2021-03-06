import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import AsyncSelect from "react-select/async";
import { WarehouseService } from "../../../Services/WarehouseService";
import { ClientService } from "../../../Services/ClientService";
class CreateBatch extends Component {
  constructor(props) {
    super();
    this.state = {
      stockId: null,
      providername: "",
      count: "",
      selectedStockValue: "",
      responseSuccess: "",
      responseError: "",
      submitted: "",
      departmentInfo: null,
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
    this.setState({
      stockId: e.stockId,
      selectedStockValue: e,
    });
  }

  componentWillMount() {
    ClientService.getAuthorizedDepartmentInformation().then((result) => {
      this.setState({ departmentInfo: result });
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
    this.setState({
      responseError: "",
      responseSuccess: "",
    });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ submitted: true });
      return;
    }
    const { stockId, providername, count, responseError, responseSuccess } =
      this.state;
    console.log("stockId");
    console.log(stockId);

    WarehouseService.CreateBatch(stockId, providername, count).then(
      (result) =>
        this.setState({
          responseSuccess: "???????????? ???? ?????????????????? ?????????????? ???????? ?????????????? ????????????????",
        }),
      (error) =>
        this.setState({
          responseError: `?????????????? ?????????????? ?????? ?????? ?????????????????? ????????????. ${error}`,
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
      submitted,
      departmentInfo,
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
          <Form.Label>???????????????? ???????????????? ????????????:</Form.Label>
          <AsyncSelect
            defaultOptions
            placeholder="???????????????? ???????????????? ???????????? ???? ?????????? ?????????????????????? ????????????"
            value={selectedStockValue}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.stockId}
            loadOptions={this.loadOptions}
            onChange={this.handleProductSelectChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>?????????????? ?????????? ??????????-??????????????????????????</Form.Label>
            <Form.Control
              type="text"
              name="providername"
              value={providername}
              placeholder="?????????? ??????????-??????????????????????????"
              className="border border-info"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>?????????????? ?????????? ?????????????????? ????????????????????</Form.Label>
            <Form.Control
              type="text"
              name="count"
              value={count}
              placeholder="?????????????????? ????????????????????"
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
                ??????????????????????
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
                ????????????????????
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
                ????????????
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
          <Form.Check
            type="checkbox"
            label="???????? ?????? ?????????????????? ????????????????????"
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          ???????????????? ?????????? ?????? ????????????
        </Button>
      </Form>
    );
  }
}

export default CreateBatch;
