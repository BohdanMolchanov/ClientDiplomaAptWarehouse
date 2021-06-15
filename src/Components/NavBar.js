import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar bg="light" className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom border-info mb-3" expand="lg">
      <Navbar.Brand href="/" className="text-info">Medicine Warehouse</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/warehouse">Управління запасами</Nav.Link>
        <Nav.Link href="/warehouse/batches">Управління замовленнями</Nav.Link>
          {/* <Nav.Link href="#link">Пошук по лікам</Nav.Link> */}
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
        {/* <Nav.Link>Увійти до системи </Nav.Link>
        <Nav.Link>Подати заявку на реєстрацію підприємства</Nav.Link> */}
        <Nav.Link>Вийти із системи</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
