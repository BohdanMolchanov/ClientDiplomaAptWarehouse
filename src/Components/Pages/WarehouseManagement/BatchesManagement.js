import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { WarehouseService } from "../../../Services/WarehouseService";
import ConfirmBatchModal from "../../../FuncComponents/ConfirmBatchModal";
import { Form } from "react-bootstrap";

class BatchesManagement extends Component {
  constructor(props) {
    super();
    this.state = {
      batchesList: null,
      changed: false,
      time: Date.now(),
      selectedId: "",
      skip: 0,
      limit: 50,
      status: "",
      search: "",
    };
  }

  componentWillMount() {
    const { skip, limit, status, search } = this.state;
    WarehouseService.GetBatches(skip, limit, status, search).then((result) => {
      this.setState({
        batchesList: result,
      });
    });
  }

  confirmHandler(id) {
    const { skip, limit, status, search } = this.state;
    WarehouseService.ConfirmBatch(id).then((s) => {
      WarehouseService.GetBatches(skip, limit, status, search).then(
        (result) => {
          this.setState({
            batchesList: result,
          });
        }
      );
    });

    //this.interval = setInterval(() => this.setState({ time: Date.now() }), 2000);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSearch(e) {
    e.preventDefault();
    const { skip, limit, status, search } = this.state;
    WarehouseService.GetBatches(skip, limit, status, search).then((result) => {
      this.setState({
        batchesList: result,
      });
    });
  }

  radioSubmit(e) {
    e.preventDefault();
    const { skip, limit, status, search } = this.state;
    WarehouseService.GetBatches(skip, limit, status, search).then((result) => {
      this.setState({
        batchesList: result,
      });
    });
  }

  onValueChange(event) {
    this.setState({
      status: event.target.value,
    });
  }
  render() {
    const { batchesList, changed, search, status } = this.state;
    console.log(search);
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <LinkButton
              to="/warehouse/batches/create"
              className="btn btn-success"
              value="Створити замовлення"
            />
            <LinkButton
              to="/warehouse"
              className="btn btn-outline-warning"
              value="Таблиця управління запасами"
            />
          </InputGroup.Prepend>
          <FormControl
            className="border border-info"
            aria-describedby="basic-addon1"
            name="search"
            value={search}
            onChange={(e) => this.handleChange(e)}
            placeholder="Знайти замовлення за назвою медичного препарату"
          />
          <InputGroup.Append>
            <Button
              variant="outline-info"
              onClick={(e) => this.handleSearch(e)}
            >
              Шукати
            </Button>
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
                value=""
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Очікують прибуття"
                name="selectgroup"
                type={type}
                id={`radioNew`}
                value="new"
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Прийняті"
                type={type}
                name="selectgroup"
                id={`radioSupplied`}
                value="supplied"
                onChange={(e) => this.onValueChange(e)}
              />
              <Button type="submit">Показати</Button>
            </div>
          ))}
        </Form>
        <h2>Управління замовленнями</h2>
        <Table bordered hover>
          <thead>
            <tr className="bg-info text-light">
              <th>#</th>
              <th>Назва продукту</th>
              <th>Деталі продукту</th>
              <th>Постачальник</th>
              <th>Статус та управління</th>
              <th>Кількість</th>
              <th>Дата створення</th>
              <th>Дата отримання</th>
              <th>Термін придатності</th>
            </tr>
          </thead>
          <tbody>
            {batchesList && (
              <>
                {batchesList.map((item) => (
                  <>
                    {item.status == 0 ? (
                      <tr className="table-success" key={item.id}>
                        <td>{item.tableKey}</td>
                        <td>{item.name}</td>
                        <td>{item.details}</td>
                        <td>{item.provider}</td>
                        <td>
                          Нове замовлення.{" "}
                          <ConfirmBatchModal
                            id={item.id}
                            name={item.name}
                            count={item.count}
                            confirmHandler={() => this.confirmHandler(item.id)}
                          />
                        </td>
                        <td>{item.count}</td>
                        <td>{item.createdAt}</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    ) : item.status == 1 ? (
                      <tr className="table" key={item.id}>
                        <td>{item.tableKey}</td>
                        <td>{item.name}</td>
                        <td>{item.details}</td>
                        <td>{item.provider}</td>
                        <td>Отримано</td>
                        <td>{item.count}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.recievedAt}</td>
                        <td>{item.bestBefore}</td>
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

export default BatchesManagement;
