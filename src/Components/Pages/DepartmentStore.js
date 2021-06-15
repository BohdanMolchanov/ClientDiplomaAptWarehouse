function DepartmentStore() {
  return (
    <div className="col-md-7">
      <h4 className="media-title font-weight-semibold">
        {" "}
        <a href="#" data-abc="true"></a>Відділення №15
      </h4>
      <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
        <li className="list-inline-item">
          <a href="#" class="text-muted" data-abc="true">
            Кагарлик
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#" className="text-muted" data-abc="true">
            Комунарська, 45
          </a>
        </li>
      </ul>
      <p className="mb-3">Аптека Доброго Дня</p>
      <h6 >Знайти лікарський засіб у відділенні</h6>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-info"
            type="button"
            id="button-addon1"
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
        />
      </div>
      <div className="cures-list">
        <div class="card card-body drug-card">
          <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
            <div class="media-body">
              <h6 class="media-title font-weight-semibold">
                <a href="#" data-abc="true"></a>АБІЗОЛ
              </h6>
              <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                <li class="list-inline-item">
                  <a href="#" class="text-muted" data-abc="true">
                  Aripiprazole
                  </a>
                </li>
              </ul>
              <p class="mb-3">
              таблетки по 10 мг, по 14 таблеток у блістері, по 2 блістери у картонній упаковці
              </p>
            </div>
            <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
              <h5 class="mt-2 font-weight-semibold text-warning">227,30 грн.</h5>
            </div>
          </div>
        </div>

        <div class="card card-body drug-card">
          <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
            <div class="media-body">
              <h6 class="media-title font-weight-semibold">
                <a href="#" data-abc="true"></a>АРИТМІЛ
              </h6>

              <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                <li class="list-inline-item">
                  <a href="#" class="text-muted" data-abc="true">
                    Amiodarone
                  </a>
                </li>
              </ul>
              <p class="mb-3">
                таблетки по 200 мг, по 10 таблеток у блістері; по 2, 3 або 5
                блістерів у пачці з картону
              </p>
            </div>
            <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
              <h5 class="mt-2 font-weight-semibold text-warning">30,50 грн.</h5>
            </div>
          </div>
        </div>

        <div class="card card-body drug-card">
          <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
            <div class="media-body">
              <h6 class="media-title font-weight-semibold">
                <a href="#" data-abc="true"></a>ГЕПАРИН-НОВОФАРМ
              </h6>

              <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                <li class="list-inline-item">
                  <a href="#" class="text-muted" data-abc="true">
                  Heparin

                  </a>
                </li>
              </ul>
              <p class="mb-3">
              розчин для ін'єкцій, 5000 МО/мл; по 2 мл, 4 мл або 5 мл у флаконі; по 5 флаконів у контурній чарунковій упаковці; по 1 контурній чарунковій упаковці в пачці з картону

              </p>
            </div>
            <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
              <h5 class="mt-2 font-weight-semibold text-warning">335,70 грн.</h5>
            </div>
          </div>
        </div>

        <div class="card card-body drug-card">
          <div class="media align-items-lg-start text-lg-left flex-column flex-lg-row">
            <div class="media-body">
              <h6 class="media-title font-weight-semibold">
                <a href="#" data-abc="true"></a>МАГНЕМАКС-ЗДОРОВ'Я

              </h6>

              <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                <li class="list-inline-item">
                  <a href="#" class="text-muted" data-abc="true">
                  Comb drug

                  </a>
                </li>
              </ul>
              <p class="mb-3">
              розчин оральний по 10 мл препарату у флаконі зі скла, герметично укупореному пробкою гумовою з наступним обкатуванням ковпачком алюмінієвим; по 5 флаконів у контурній чарунковій упаковці, по 2 контурні чарункові упаковки у коробці з картону

              </p>
            </div>
            <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
              <h5 class="mt-2 font-weight-semibold text-warning">65,30 грн.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentStore;
