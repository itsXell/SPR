import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Report from "./Report";
import Request from "./Request";

function App() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink className="text-white nav-link" to="/">
          SPR-Parking
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/report">
              Report
            </NavLink>
            <NavLink className="nav-link" to="/request">
              Request
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/request">
          <Request />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h1 class="col-lg-1 col-centered">Welcome to SMV Parking</h1>;
}

export default App;
