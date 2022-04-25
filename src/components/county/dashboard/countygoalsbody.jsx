import React from "react";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Secure from "../dashboard/Images/secure.jpg";
import Just from "../dashboard/Images/just.jpg";
import Prosperous from "../dashboard/Images/prosperous.jpg";
import PublicParticipation from "../dashboard/Images/publicparticipation.jpg";
import InfrastructureDev from "../dashboard/Images/infrastructuredev.jpg";

const CountyGoalsBody = ({ projects }) => {
  return (
    <div>
      <Row>
        {" "}
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={InfrastructureDev} />
            <Card.Body>
              <Card.Title>Infrastructure Development</Card.Title>
              <Card.Text>
                To develop and maintain infrastructure that addresses the needs
                of the Communities.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={Secure} />
            <Card.Body>
              <Card.Title>Inclusive: </Card.Title>
              <Card.Text>
                To build a peaceful and cohesive society where all have access
                to equitable share of resources.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
      <Row className="m-2 ">
        {" "}
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={Prosperous} />
            <Card.Body>
              <Card.Title>Livelihoods</Card.Title>
              <Card.Text>
                Improved livelihoods through provision of basic services,
                maximization of production using appropriate technology and
                sustainable exploitation of resources for better quality of
                life.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="m-2">
            <Card.Img variant="top" src={PublicParticipation} />
            <Card.Body>
              <Card.Title>Public Participation</Card.Title>
              <Card.Text>
                To promote and enhance ownership and sustainability of
                programmes and project through public participation and
                involvement in decision making process.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup>
          <Card className="m-2">
            <Card.Img variant="top" src={Just} />
            <Card.Body>
              <Card.Title>5. Job creation: </Card.Title>
              <Card.Text>
                Through Business retention ,expansion and attraction
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </div>
  );
};

export default CountyGoalsBody;
