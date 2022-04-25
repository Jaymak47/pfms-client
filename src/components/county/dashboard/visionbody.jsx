import React from "react";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Secure from "../dashboard/Images/secure.jpg";
import Prosperous from "../dashboard/Images/prosperous.jpg";
import QualityofLife from "../dashboard/Images/qualityoflife.jpg";
import InfrastructureDev from "../dashboard/Images/infrastructuredev.jpg";

const VisionBody = ({ projects }) => {
  return (
    <div>
      <Row className="m-2 ">
        {" "}
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={Secure} />
            <Card.Body>
              <Card.Title>Secure</Card.Title>
              <Card.Text>County Security.</Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={InfrastructureDev} />
            <Card.Body>
              <Card.Title>Just</Card.Title>
              <Card.Text>Equitable Sharing of Resources</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={Prosperous} />
            <Card.Body>
              <Card.Title>Prosperous</Card.Title>
              <Card.Text>Economic Stimulants</Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={QualityofLife} />
            <Card.Body>
              <Card.Title>Quality of Life</Card.Title>
              <Card.Text>Improve Livelihoods</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </div>
  );
};

export default VisionBody;
