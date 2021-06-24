import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { WarehouseService } from "../../../Services/WarehouseService";
import { Form } from "react-bootstrap";

class Warehouse extends Component {
  constructor(props) {
    super();
    this.state = {
      stockEntitiesList: null,
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
    const {skip, limit, status, search} = this.state;
    WarehouseService.GetStocks(skip, limit, status, search).then((result) => {
      this.setState({
        stockEntitiesList: result,
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSearch(e) {
    e.preventDefault();
    const { skip, limit, status, search } = this.state;
    WarehouseService.GetStocks(skip, limit, status, search).then((result) => {
      this.setState({
        stockEntitiesList: result,
      });
    });
  }
  radioSubmit(e) {
    e.preventDefault();
    const { skip, limit, status, search } = this.state;
    WarehouseService.GetStocks(skip, limit, status, search).then((result) => {
      this.setState({
        stockEntitiesList: result,
      });
    });
  }

  onValueChange(event) {
    this.setState({
      status: event.target.value,
    });
  }
  render() {
    const { stockEntitiesList, search } = this.state;
    console.log(stockEntitiesList);
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <LinkButton
              to="/warehouse/create"
              className="btn btn-warning"
              value="Створити сутність запасів"
            />
            <LinkButton
              to="/warehouse/batches"
              className="btn btn-outline-success"
              value="Таблиця управління замовленнями"
            />
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            placeholder="Знайти запаси за назвою медичного препарату"
            value={search}
            name="search"
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
                value=""
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Запаси відсутні"
                name="selectgroup"
                type={type}
                id={`radioNew`}
                value="new"
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Рівень запасів достатній"
                type={type}
                name="selectgroup"
                id={`radioOk`}
                value="ok"
                onChange={(e) => this.onValueChange(e)}
              />
              <Form.Check
                inline
                label="Запаси потребують замовлення"
                type={type}
                name="selectgroup"
                id={`radioNeedsOrder`}
                value="needsOrder"
                onChange={(e) => this.onValueChange(e)}
              />
              <Button type="submit">Показати</Button>
            </div>
          ))}
        </Form>

        <h2>Управління запасами</h2>
        <Table bordered hover>
          <thead>
            <tr className="bg-light">
              <th>#</th>
              <th>Назва продукту</th>
              <th>Деталі продукту</th>
              <th>Кількість на складі</th>
              <th>Точка замовлення</th>
              <th>Максимальна кількість</th>
              <th>Наступне замовлення</th>
              <th>Ціна закупівлі</th>
              <th>Ціна продажу</th>
              <th>Термін придатності</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {stockEntitiesList && (
              <>
                {stockEntitiesList.map((item) => (
                  <tr className="table" key={item.id}>
                    <td>{item.tableKey}</td>
                    <td>{item.name}</td>
                    <td>{item.details}</td>
                    <td>{item.count}</td>
                    <td>{item.orderPoint}</td>
                    <td>{item.maxCount}</td>
                    <td>{item.orderRepeat}</td>
                    <td>{item.purchasePrice}</td>
                    <td>{item.sellPrice}</td>
                    <td>{item.bestBefore}</td>
                    <td>{item.status == "New" ? <>Запаси відсутні</> : item.status == "Ok" ? <>Рівень запасів достатній</> : item.status == "NeedsOrder" ? <>Запаси потребують замовлення</> : <>Невідомий</>}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Warehouse;
