import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { WarehouseService } from "../../../Services/WarehouseService";

class Warehouse extends Component {
  constructor(props) {
    super();
    this.state = {
      stockEntitiesList: null,
    };
  }

  componentWillMount() {
    WarehouseService.GetStocks().then((result) => {
      this.setState({
        stockEntitiesList: result,
      });
    });
  }
  render() {
    const { stockEntitiesList } = this.state;
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
          />
          <InputGroup.Append>
            <Button variant="outline-info">Шукати</Button>
          </InputGroup.Append>
        </InputGroup>

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
                    <td>{item.status}</td>
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
