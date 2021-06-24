import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { AdminService } from "../../../Services/AdminService";
import { Form } from "react-bootstrap";
import ConfirmOrganizationModal from "../../../FuncComponents/ConfirmOrganizationModal";

class AdminOrganizationsPanelPage extends Component {
  constructor(props) {
    super();
    this.state = {
      organizationsList: null,
      isActive: null,
      search:'',
      status : '',
      skip: 0,
      limit: 50,
    };
  }

  componentWillMount() {
    const { isActive, skip, limit, search } = this.state;
    AdminService.getPanel("organizations", isActive, skip, limit, search).then(
      (result) => {
        this.setState({
          organizationsList: result,
        });
      }
    );
  }

  componentDidUpdate() {
    // const { isActive, skip, limit} = this.state;
    // AdminService.getPanel("organizations", isActive, skip, limit).then((result) => {
    //   this.setState({
    //     organizationsList: result,
    //   });
    // });
  }

  radioSubmit(e) {
    e.preventDefault();
    const { isActive, skip, limit, search } = this.state;
    AdminService.getPanel("organizations", isActive, skip, limit, search).then(
      (result) => {
        this.setState({
          organizationsList: result,
        });
      }
    );
  }

  onValueChange(event) {
    this.setState({
      isActive: event.target.value,
    });
  }

  confirmHandler(id) {
    const {isActive, skip, limit, search } = this.state;
    AdminService.confirmOrganization(id).then((s) => {
      AdminService.getPanel("organizations", isActive, skip, limit, search ).then(
        (result) => {
          this.setState({
            organizationsList: result,
          });
        }
      );
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSearch(e) {
    const { isActive, skip, limit, search } = this.state;
    AdminService.getPanel("organizations", isActive, skip, limit, search).then(
      (result) => {
        this.setState({
          organizationsList: result,
        });
      }
    );
  }
  render() {
    const { organizationsList, search } = this.state;
    return (
      <>
        <h3>Управління організаціями</h3>
        <InputGroup className="mb-3">
          {/* <InputGroup.Prepend>
            <LinkButton
              to="/admin/departments"
              className="btn btn-outline-warning"
              value="Адміністрування відділеннями"
            />
          </InputGroup.Prepend> */}
          <FormControl
            className="border border-info"
            aria-describedby="basic-addon1"
            placeholder="Знайти заклад за назвою або ЄДРПОУ"
            name="search"
            value={search}
            onChange={(e) => this.handleChange(e)}
          />
          <InputGroup.Append>
            <Button variant="outline-info" onClick={(e) => this.handleSearch(e)}>Шукати</Button>
          </InputGroup.Append>
        </InputGroup>

        <Form onSubmit={(e) => this.radioSubmit(e)}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Всі"
                name="selectgroup"
                defaultChecked
                type={type}
                id={`radioAll`}
                value="null"
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Підтверджені"
                name="selectgroup"
                type={type}
                id={`radioConfirmed`}
                value="true"
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Не підтверджені"
                type={type}
                name="selectgroup"
                id={`radioNonConfirmed`}
                value="false"
                onChange={(e) => this.onValueChange(e)}
              />
              <Button type="submit">Показати</Button>
            </div>
          ))}
        </Form>

        <Table bordered hover>
          <thead>
            <tr className="bg-info text-light">
              <th>Назва організації</th>
              <th>ЄДРПОУ</th>
              <th>Пошта директора</th>
              <th>ПІБ директора</th>
              <th>Дата реєстрації</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {organizationsList && (
              <>
                {organizationsList.data.map((item) => (
                  <>
                    {item.isActive == true ? (
                      <tr className="table" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.edrpou}</td>
                        <td>{item.owner.data.email}</td>
                        <td>
                          {item.owner.data.lastName} {item.owner.data.firstName}{" "}
                          {item.owner.data.middleName}
                        </td>
                        <td>{item.createdAt}</td>
                        <td>Підтверджена</td>
                      </tr>
                    ) : item.isActive == false ? (
                      <tr className="table-warning" key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.edrpou}</td>
                        <td>{item.owner.data.email}</td>
                        <td>
                          {item.owner.data.lastName} {item.owner.data.firstName}{" "}
                          {item.owner.data.middleName}
                        </td>
                        <td>{item.createdAt}</td>
                        <td>
                          Не підтверджена{" "}
                          <ConfirmOrganizationModal
                            id={item.id}
                            name={item.name}
                            edrpou={item.edrpou}
                            confirmHandler={() => this.confirmHandler(item.id)}
                          ></ConfirmOrganizationModal>
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

export default AdminOrganizationsPanelPage;
