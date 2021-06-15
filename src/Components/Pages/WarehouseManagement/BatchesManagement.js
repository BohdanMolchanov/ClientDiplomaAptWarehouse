import { Component } from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import LinkButton from "../../../FuncComponents/LinkButton";
import { WarehouseService } from "../../../Services/WarehouseService";
import ConfirmBatchModal from "../../../FuncComponents/ConfirmBatchModal";

class BatchesManagement extends Component {
  constructor(props) {
    super();
    this.state = {
      batchesList: null,
    };
  }

  componentWillMount() {
    WarehouseService.GetBatches().then((result) => {
      this.setState({
        batchesList: result,
      });
    });
  }
  componentDidUpdate(){
    WarehouseService.GetBatches().then((result) => {
      this.setState({
        batchesList: result,
      });
    });
  }

  render() {
    const { batchesList } = this.state;
    console.log(batchesList);
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
            placeholder="Знайти замовлення за назвою медичного препарату"
          />
          <InputGroup.Append>
            <Button variant="outline-info">Шукати</Button>
          </InputGroup.Append>
        </InputGroup>

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
                          Нове замовлення. <ConfirmBatchModal id={item.id} name={item.name} count={item.count}/>
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
