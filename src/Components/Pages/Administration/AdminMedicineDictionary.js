import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { AdminService } from "../../../Services/AdminService";
import { Form } from "react-bootstrap";
import ConfirmDepartmentModal from "../../../FuncComponents/ConfirmDepartmentModal";

class AdminMedicineDictionary extends Component {
  constructor(props) {
    super();
    this.state = {
      medicineList: null,
      isActive: null,
      skip: 0,
      limit: 50,
    };
  }

  componentWillMount() {
    const { skip, limit } = this.state;
    AdminService.getProducts(skip, limit).then(
      (result) => {
        this.setState({
          medicineList: result,
        });
      }
    );
    console.log(this.state.medicineList)
  }

  radioSubmit(e) {
    e.preventDefault();
    const { skip, limit } = this.state;
    AdminService.getProducts(skip, limit).then(
      (result) => {
        this.setState({
          medicineList: result,
        });
      }
    );
  }

  render() {
    const { medicineList } = this.state;
    return (
      <>
        <h3>Управління довідником медичних запасів</h3>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <LinkButton
              to="/admin/dictionary/add"
              className="btn btn-outline-success"
              value="Додати новий засіб"
            />
          </InputGroup.Prepend>
          <FormControl
            className="border border-info"
            aria-describedby="basic-addon1"
            placeholder="Знайти медичний засіб у довіднику"
          />
          <InputGroup.Append>
            <Button variant="outline-info">Шукати</Button>
          </InputGroup.Append>
        </InputGroup>

        <Table bordered hover>
          <thead>
            <tr className="bg-info text-light">
              <th>Назва (українською)</th>
              <th>Назва (латиницею)</th>
              <th>Опис</th>
              <th>Дата додавання</th>
            </tr>
          </thead>
          <tbody>
            {medicineList && (
              <>
                {medicineList.data.map((item) => (
                  <>
                      <tr className="table" key={item.id}>
                        <td>{item.nameUkr}</td>
                        <td>{item.nameEn}</td>
                        <td>{item.description}</td>
                        <td>{item.createdAt}</td>
                      </tr>
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

export default AdminMedicineDictionary;
