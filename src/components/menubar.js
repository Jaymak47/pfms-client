import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { Menu, Dropdown } from "semantic-ui-react";
import navlogo from "../components/images/Navlogo.png";
import { Link } from "react-router-dom";
import userPic from "../components/images/userphotos/John.jpg";
import Help from "../components/images/help.png";

function MenuBar() {
  const { user, logout, login } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu
      pointing
      inverted
      fixed="top"
      stackable
      size="massive"
      style={{ background: "#8ec449", color: "#ffd202" }}
    >
      <img
        src={navlogo}
        alt="Perfomance Management System"
        className="navlogopic"
      />

      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Dropdown item text="County Planning">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/countymission">
            County Mission
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/countyvision">
            County Vision
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/countygoals">
            County Goals
          </Dropdown.Item>
          <Dropdown item text="Sector Goals">
            <Dropdown.Menu>
              <Dropdown.Item
                icon="bug"
                text="Agriculture |Livestock | Fishery"
                as={Link}
                to="/agrilivefishdev"
              />
              <Dropdown.Item
                icon="tree"
                text="Water | Energy | Environment"
                as={Link}
                to="/waterenergyenv"
              />
              <Dropdown.Item
                icon="ambulance"
                text="Health Services"
                as={Link}
                to="/healthservices"
              />
              <Dropdown.Item
                icon="building"
                text="Lands | Urban Planning"
                as={Link}
                to="/landsurbanplanning"
              />
              <Dropdown.Item
                icon="road"
                text="Tourism | Wildlife |Trade"
                as={Link}
                to="/tourismwildlifetrade"
              />
              <Dropdown.Item
                icon="group"
                text="Education | Vocational Training"
                as={Link}
                to="/educationvocationaltraining"
              />
              <Dropdown.Item
                icon="dollar"
                text="Finance | Economic Planning"
                as={Link}
                to="/fiananceeconomicplanning"
              />
              <Dropdown.Item
                icon="users"
                text="Office of the Governor "
                as={Link}
                to="/officeofgovdpgov"
              />
              <Dropdown.Item
                icon="group"
                text="County Assembley Services"
                as={Link}
                to="/countyassembley"
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Item as={Link} to="/projects">
            Projects
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/projects">
            Perfomance Contracts
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/activities">
            Activities
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/projects">
            Reviews
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/targets">
            Targets
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item text="Performance Appraisal">
        <Dropdown.Menu>
          <Dropdown item text="Staff">
            <Dropdown.Menu>
              <Dropdown.Item
                icon="bug"
                text="Self Appraisal"
                as={Link}
                to="/selfappraisal"
              />
              <Dropdown.Item
                icon="tree"
                text="Supervisor Appraisal"
                as={Link}
                to="/supervisorappraisal"
              />
              <Dropdown.Item
                icon="ambulance"
                text="jointappraisal"
                as={Link}
                to="/jointreview"
              />
              <Dropdown.Item
                icon="building"
                text="Committee Appraisal"
                as={Link}
                to="/committeeappraisal"
              />
              <Dropdown.Item
                icon="road"
                text="Appraisal Report"
                as={Link}
                to="/appraisals"
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Item as={Link} to="/trainings">
            Trainings
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right">
        <Menu.Item>
          {" "}
          <img src={Help} className="profilepic  " alt="user" />
        </Menu.Item>
        <Menu.Item>
          {" "}
          <img src={userPic} className="profilepic  " alt="user" />
        </Menu.Item>
        <Menu.Item>
          <p className="accountsdiv">
            {user.firstname + " " + user.surname}
            <br />
            {user.designation}
            <br />
            Payroll No: {user.payrollno}
            <br />
          </p>
        </Menu.Item>
        <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu
      pointing
      inverted
      fixed="top"
      stackable
      size="massive"
      style={{ background: "#8ec449", color: "#ffd202" }}
    >
      <img
        src={navlogo}
        alt="Perfomance Management System"
        className="navlogopic"
      />

      <Menu.Menu position="right">
        <Menu.Item name="login" onClick={login} as={Link} to="/" />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}

export default MenuBar;
