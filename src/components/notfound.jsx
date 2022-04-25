import { useContext } from "react";
import { Row, Col } from "react-bootstrap";

import LeftMenusGeneral from "../components/leftmenusgeneral";
import { AuthContext } from "../context/auth";

const NotFound = () => {
  const user = useContext(AuthContext);
  return (
    <div>
      <Row>
        <Row className="m-3"></Row>

        <Row className="mt-3">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col className="mt-5">
            {" "}
            <h1>Resource Not Found</h1>{" "}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default NotFound;
