import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ClientService } from "../../Services/ClientService";
import LinkButton from "../../FuncComponents/LinkButton";

class DepartmentSearch extends React.Component {
  constructor(props) {
    super();
    this.state = {
      departmentsList: "",
      drugName: "",
      region: "",
      area: "",
      localityName: "",
      addressStreet: "",
      addressStreetNumber: "",
      skip: "",
      limit: "",
    };
  }

  componentWillMount() {
    const {
      drugName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      skip,
      limit,
    } = this.state;
    ClientService.getDepartments(
      drugName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      skip,
      limit
    ).then((result) => {
      this.setState({
        departmentsList: result,
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSearch(e) {
    e.preventDefault();
    const {
      drugName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      skip,
      limit,
    } = this.state;
    ClientService.getDepartments(
      drugName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      skip,
      limit
    ).then((result) => {
      this.setState({
        departmentsList: result,
      });
    });
  }

  render() {
    const {
      departmentsList,
      drugName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber,
      skip,
      limit,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-2 border-right border-info custom-filter-tab">
            <h5>Знайти відділення</h5>
            <section class="mb-4">
              <div class="filter-group">
                <div>
                  <Form onSubmit={(e) => this.handleSearch(e)}>
                    <Form.Group controlId="">
                      <Form.Label>Область</Form.Label>
                      <Form.Control
                        type="text"
                        name="region"
                        value={region}
                        placeholder="Область"
                        className="border border-muted"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="">
                      <Form.Label>Район</Form.Label>
                      <Form.Control
                        type="text"
                        name="area"
                        value={area}
                        placeholder="Район"
                        className="border border-muted"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="">
                      <Form.Label>Населений пункт</Form.Label>
                      <Form.Control
                        type="text"
                        name="localityName"
                        value={localityName}
                        placeholder="Населений пункт"
                        className="border border-muted"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="">
                      <Form.Label>Адреса</Form.Label>
                      <Form.Control
                        type="text"
                        name="addressStreet"
                        value={addressStreet}
                        placeholder="Введіть адресу"
                        className="border border-muted"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="">
                      <Form.Label>Будинок</Form.Label>
                      <Form.Control
                        type="text"
                        name="addressStreetNumber"
                        value={addressStreetNumber}
                        placeholder="Введіть номер будинку"
                        className="border border-muted"
                        autoComplete="off"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Form.Group>
                    <Button variant="outline-info" type="submit">
                      Пошук
                    </Button>
                  </Form>
                </div>
              </div>
            </section>
          </div>
          <div class="col-md-9">
            <h6>Знайти відділення за наявністю лікарського засобу</h6>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-info"
                  type="button"
                  id="button-addon1"
                  onClick={(e) => this.handleSearch(e)}
                >
                  Пошук
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Введіть назву лікарського засобу"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                name="drugName"
                value={drugName}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div>
              {departmentsList && (
                <>
                  {departmentsList.data.map((item) => (
                    <div class="card card-body">
                      <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
                        <div class="media-body">
                          <h6 class="media-title font-weight-semibold">
                            <a href="#" data-abc="true"></a>
                            {item.name}
                          </h6>
                          <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted" data-abc="true">
                                {item.localityName
                                  ? `Населений пункт: ${item.localityName}`
                                  : ""}
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="text-muted" data-abc="true">
                                {item.region ? `Область: ${item.region}` : ""}
                              </a>
                            </li>
                          </ul>
                          <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted" data-abc="true">
                                {item.area ? `Район: ${item.area}` : ""}
                              </a>
                            </li>
                            <li class="list-inline-item">
                              <a href="#" class="text-muted" data-abc="true">
                              {item.addressStreet ? `Адреса: ${item.addressStreet} ${item.addressStreetNumber
                                  ? `,${item.addressStreetNumber}`
                                  : ""}` : ""}
                              </a>
                            </li>
                          </ul>
                          <p class="mb-3">{item.organization.name}</p>
                        </div>
                        <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                          <LinkButton to={`/department/${item.id}`} className="btn btn-warning btn-block mt-4" value="Переглянути каталог"/>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DepartmentSearch;
