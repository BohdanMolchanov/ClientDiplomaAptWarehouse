import React from "react";
import { ClientService } from "../../Services/ClientService";

class DepartmentStore extends React.Component {
  constructor(props) {
    super();
    this.state = {
      departmentId: "",
      department: "",
      drugName: "",
      skip: 0,
      limit: 50,
    };
  }
  componentDidMount() {
    this.setState({
      departmentId: this.props.match.params.id,
    });
    const { departmentId, drugName, skip, limit } = this.state;
    ClientService.getDepartmentInformation(
      drugName,
      this.props.match.params.id,
      skip,
      limit
    ).then((result) => {
      this.setState({
        department: result,
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSearch(e) {
    e.preventDefault();
    const { departmentId, drugName, skip, limit } = this.state;
    ClientService.getDepartmentInformation(
      drugName,
      this.props.match.params.id,
      skip,
      limit
    ).then((result) => {
      this.setState({
        department: result,
      });
    });
  }

  render() {
    const { departmentId, department, drugName, skip, limit } = this.state;
    console.log(this.state);
    return (
      <>
        {department ? (
          <div className="col-md-7">
            <h4 className="media-title font-weight-semibold">
              {" "}
              <a href="#" data-abc="true"></a>
              {department.name}
            </h4>
            <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
              <li class="list-inline-item">
                <a href="#" class="text-muted" data-abc="true">
                  {department.localityName
                    ? `Населений пункт: ${department.localityName}`
                    : ""}
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-muted" data-abc="true">
                  {department.region ? `Область: ${department.region}` : ""}
                </a>
              </li>
            </ul>
            <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
              <li class="list-inline-item">
                <a href="#" class="text-muted" data-abc="true">
                  {department.area ? `Район: ${department.area}` : ""}
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="text-muted" data-abc="true">
                  {department.addressStreet
                    ? `Адреса: ${department.addressStreet} ${
                        department.addressStreetNumber
                          ? `,${department.addressStreetNumber}`
                          : ""
                      }`
                    : ""}
                </a>
              </li>
            </ul>
            <p className="mb-3">{department.organization.name}</p>
            <h6>Знайти лікарський засіб у відділенні</h6>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-info"
                  type="button"
                  id="button-addon1"
                  onClick={(e) => this.handleSearch(e)}
                >
                  Пошук
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Введіть назву лікарського засобу"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                name="drugName"
                value={drugName}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            {department.products && department.products.length > 0?(
              department.products.map((item) => (
                <div className="cures-list">
                  <div class="card card-body drug-card">
                    <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
                      <div class="media-body">
                        <h6 class="media-title font-weight-semibold">
                          <a href="#" data-abc="true"></a>{item.nameUkr}
                        </h6>
                        <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                          <li class="list-inline-item">
                            <a href="#" class="text-muted" data-abc="true">
                              {item.nameEn}
                            </a>
                          </li>
                        </ul>
                        <p class="mb-3">
                          {item.description}
                        </p>
                      </div>
                      <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                        <h5 class="mt-2 font-weight-semibold text-warning">
                          {item.price ? `${item.price} грн.` : "Не вказано"}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))) : <h4>У даному відділенні відсутні запаси лікарських засобів або за результатами Вашого пошуку нічого не знайдено</h4>}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DepartmentStore;
