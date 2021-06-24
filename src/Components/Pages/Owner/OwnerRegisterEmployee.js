import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { RegistrationService } from "../../../Services/RegistrationService";
import { OwnerService } from "../../../Services/OwnerService";
import CustomSelect from "../../../FuncComponents/Select";

class OwnerRegisterEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentid: "",
      departmentsList: "",
      password: "",
      roleType: "",
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
  }

  componentDidMount() {
    OwnerService.getDepartmentsList().then((result) => {
      this.setState({
        departmentsList: result,
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmits(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ submitted: true });
      return;
    }

    const {
      departmentid,
      password,
      roleType,
      phone,
      email,
      firstName,
      secondName,
      lastName,
    } = this.state;

    if(!departmentid || !roleType){
      this.setState({
        responseError: "Оберіть відділення та роль."
      })
      return;
    }

    RegistrationService.employee(
      departmentid,
      password,
      roleType,
      phone,
      email,
      firstName,
      secondName,
      lastName
    ).then(
      (result) =>
        this.setState({
          responseSuccess: "Співробітник був успішно створений.",
        }),
      (error) =>
        this.setState({
          responseError: `Виникла помилка під час відправки запиту. ${error}`,
        })
    );
  }

  handleNameSelectChange = (e) => {
    this.setState({
      departmentid: this.selectRef.current.value,
      roleType: this.roleSelectReg.current.value,
    });
  };
  selectRef = React.createRef();
  roleSelectReg = React.createRef();

  render() {
    // if(loggingIn){
    //     return <Redirect to ="/"/>
    // }
    const {
      departmentid,
      departmentsList,
      password,
      roleType,
      phone,
      email,
      firstName,
      secondName,
      lastName,
      responseError,
      responseSuccess,
      submitted,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <h2>Реєстрація співробітника</h2>
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
        {(departmentsList && departmentsList.length > 0) ? (
          <Form
            noValidate
            validated={submitted}
            onSubmit={(e) => this.handleSubmits(e)}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Відділення</Form.Label>
                <CustomSelect
                  reference={this.selectRef}
                  list={departmentsList}
                  value={departmentid}
                  onChange={this.handleNameSelectChange}
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Роль</Form.Label>
                <select ref={this.roleSelectReg} className="border border-info custom-select" onChange={this.handleNameSelectChange} value={roleType} required>
                  <option>Оберіть роль</option>
                  <option value="warehouseManager">
                    Менеджер відділення
                  </option>
                  <option value="seller">
                    Продавець
                  </option>
                </select>
              </Form.Group>
            </Form.Row>
            <h5>Дані співробітника</h5>
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
              Зареєструвати співробітника
            </Button>
          </Form>
        ) : 
        (<h3>
          Для реєстрації співробітника необхідно зареєструвати відділення
        </h3>)
        }
      </>
    );
  }
}

export default OwnerRegisterEmployee;
