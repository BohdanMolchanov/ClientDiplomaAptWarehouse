import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function DepartmentSearch() {
  return (
    <div>
      <div className="row">
        <div className="col-md-2 border-right border-info custom-filter-tab">
          <h5>Знайти відділення</h5>
          <section class="mb-4">
            <div class="filter-group">
              <div>
                <Form>
                  <Form.Group controlId="">
                    <Form.Label>Область</Form.Label>
                    <Form.Control
                      className="border box-shadow rounded"
                      as="select"
                      custom
                    >
                      <option>Київська</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Район</Form.Label>
                    <Form.Control
                      className="border box-shadow rounded"
                      as="select"
                      custom
                    >
                      <option>Кагарлицький</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Населений пункт</Form.Label>
                    <Form.Control
                      className="border box-shadow rounded"
                      as="select"
                      custom
                    >
                      <option>Кагарлик</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Адреса</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder=""
                      value="Комунарська"
                    />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text> */}
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Будинок</Form.Label>
                    <Form.Control type="email" placeholder="" value="45" />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text> */}
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
            />
          </div>
          <div>
            <div class="card card-body">
              <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
                <div class="media-body">
                  <h6 class="media-title font-weight-semibold">
                    <a href="#" data-abc="true"></a>Відділення №15
                  </h6>
                  <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                    <li class="list-inline-item">
                      <a href="#" class="text-muted" data-abc="true">
                        Кагарлик
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#" class="text-muted" data-abc="true">
                        Комунарська, 45
                      </a>
                    </li>
                  </ul>
                  <p class="mb-3">Аптека Доброго Дня</p>
                </div>
                <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                  <a class="btn btn-warning btn-block mt-4">
                    Переглянути каталог
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSearch;
