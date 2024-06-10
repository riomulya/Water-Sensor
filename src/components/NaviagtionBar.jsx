import {Navbar, Container, Nav} from "react-bootstrap";

const navBar = () => {
  return (
  <div>
    <Navbar className="navbar-box">
      <Container>
        <Navbar.Brand href="home"><img src="./logo.png" alt="hero"></img></Navbar.Brand>
        <Navbar className="navbar">
          <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end">
                <Nav.Link className="item-list" href="dashboard">Dashboard</Nav.Link>
                <Nav.Link className="item-list" /*</Nav>href="feeds"*/>Feeds</Nav.Link>
                <Nav.Link className="item-list" href="about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Navbar>
    <br />
  </div>
  );
};

export default navBar