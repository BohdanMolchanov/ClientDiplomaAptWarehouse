import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
class NavBar extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Navbar
        bg="light"
        className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom border-info mb-3"
        expand="lg"
      >
        <Navbar.Brand href="/" className="text-info">
          Medicine Warehouse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user && (
              <>
                {user.roleType == "warehouseManager" && (
                  <>
                    <Nav.Link href="/warehouse">Управління запасами</Nav.Link>
                    <Nav.Link href="/warehouse/batches">
                      Управління замовленнями
                    </Nav.Link>
                  </>
                )}
                {user.roleType == "admin" && (
                  <>
                    <Nav.Link href="/admin/organizations">Організації</Nav.Link>
                    <Nav.Link href="/admin/departments">Відділення</Nav.Link>
                    <Nav.Link href="/admin/dictionary">
                      Довідник препаратів
                    </Nav.Link>
                  </>
                )}
                {user.roleType == "owner" && (
                  <>
                    <Nav.Link href="/owner/departments">
                      Управління організацією
                    </Nav.Link>
                    <Nav.Link href="/register/employee">
                      Реєстрація співробітників
                    </Nav.Link>
                    <Nav.Link href="/register/department">
                      Реєстрація відділень
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {/* <Nav.Link>Увійти до системи </Nav.Link>
        <Nav.Link>Подати заявку на реєстрацію підприємства</Nav.Link> */}
            {user ? (
              <Nav.Link href="/login">Вийти із системи</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/register/organization">
                  Подати заявку на реєстрацію підприємства
                </Nav.Link>
                <Nav.Link href="/login">Увійти</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };
