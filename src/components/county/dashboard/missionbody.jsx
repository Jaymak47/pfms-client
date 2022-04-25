import React from "react";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Cacus from "../dashboard/Images/cacus.jpg";
import BullIsiolo from "../dashboard/Images/bullisiolo.jpg";
import CowHerd from "../dashboard/Images/cowherd.jpg";
import EwasoNyiroRiver from "../dashboard/Images/ewasonyiroriver.jpg";
import School from "../dashboard/Images/school.jpg";
import WaterPan from "../dashboard/Images/waterpan.jpg";

const MissionBody = ({ projects }) => {
  return (
    <div>
      <Row className="m-2 ">
        {" "}
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={BullIsiolo} />
            <Card.Body>
              <Card.Title>Livestock</Card.Title>
              <Card.Text>....</Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={Cacus} />
            <Card.Body>
              <Card.Title>Drought Mitigation</Card.Title>
              <Card.Text>.....</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={CowHerd} />
            <Card.Body>
              <Card.Title>Livelihoods</Card.Title>
              <Card.Text>.....</Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={EwasoNyiroRiver} />
            <Card.Body>
              <Card.Title>Infrastructure Development</Card.Title>
              <Card.Text>....</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={WaterPan} />
            <Card.Body>
              <Card.Title>Livelihoods</Card.Title>
              <Card.Text>.....</Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={School} />
            <Card.Body>
              <Card.Title>Education</Card.Title>
              <Card.Text>....</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </div>
  );
};

export default MissionBody;
