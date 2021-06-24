import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { OwnerService } from "../../../Services/OwnerService";
import LinkButton from "../../../FuncComponents/LinkButton";

class OwnerDepartmentsList extends Component {
  constructor(props) {
    super();
    this.state = {
      departmentsList: null,
      search:"",
      skip: 0,
      limit: 50,
    };
  }

  componentWillMount() {
    const { skip, limit, search } = this.state;
    OwnerService.getDepartments(search, skip, limit).then(
      (result) => {
        this.setState({
          departmentsList: result,
        });
      }
    );
  }

  componentDidUpdate() {
    // const { isActive, skip, limit} = this.state;
    // AdminService.getPanel("organizations", isActive, skip, limit).then((result) => {
    //   this.setState({
    //     departmentsList: result,
    //   });
    // });
  }

  radioSubmit(e) {
    e.preventDefault();
    const { skip, limit, search } = this.state;
    OwnerService.getDepartments(search, skip, limit).then(
      (result) => {
        this.setState({
          departmentsList: result,
        });
      }
    );
  }

  onValueChange(event) {
    this.setState({
      isActive: event.target.value,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSearch(e) {
    e.preventDefault();
    const { skip, limit, search } = this.state;
    OwnerService.getDepartments(search, skip, limit).then(
      (result) => {
        this.setState({
          departmentsList: result,
        });
      }
    );
  }

  render() {
    const { departmentsList, search } = this.state;
    return (
      <>
        <h3>Управління відділеннями</h3>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
          <LinkButton
              to="/register/employee"
              className="btn btn-success"
              value="Реєстрація співробітників"
            />
            <LinkButton
              to="/register/department"
              className="btn btn-outline-warning"
              value="Реєстрація відділення"
            />
          </InputGroup.Prepend>
          <FormControl
            className="border border-info"
            aria-describedby="basic-addon1"
            placeholder="Знайти відділення за назвою"
            name="search"
            value={search}
            onChange={(e) => this.handleChange(e)}
          />
          <InputGroup.Append>
            <Button variant="outline-info" onClick={(e) => this.handleSearch(e)}>Шукати</Button>
          </InputGroup.Append>
        </InputGroup>

        <Table bordered hover>
          <thead>
            <tr className="bg-info text-light">
              <th>Назва відділення</th>
              <th>Повна адреса</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {departmentsList && (
              <>
                {departmentsList.data.map((item) => (
                  <>
                    {item.isActive == true ? (
                      <tr className="table" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.addressText}</td>
                        <td>Підтверджено</td>
                      </tr>
                    ) : item.isActive == false ? (
                      <tr className="table-warning" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.addressText}</td>
                        <td>
                          Очікування підтвердження від адміністратора
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </>
    );
  }
}

export default OwnerDepartmentsList;
