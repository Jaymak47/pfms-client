import { Col, Row, Table } from "react-bootstrap";
const RatingScale = () => {
  return (
    <div>
      <Row className="m-3">
        <h4>
          Rating Scale: The following rating shall be used to indicate the level
          of performance by an Appraisee:
        </h4>
        <Table striped bordered hover>
          <Row>
            <Col className="tablestlyles" md="6">
              <h5>Achievement of Performance Targets</h5>
            </Col>{" "}
            <Col className="tablestlyles2">
              <h5>Rating Scale</h5>
            </Col>
            <Col className="tablestlyles2" md="2">
              <h5>%</h5>
            </Col>
          </Row>
          <Row className="tablestlyles3">
            <Col md="6">
              <h5>
                Achievement higher than 100% of the Agreed performance targets
              </h5>
            </Col>
            <Col>
              <h5>Excellent </h5>
            </Col>
            <Col md="2">
              <h5>101%+</h5>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <h5>Achievement up to 100% of the agreed performance targets</h5>
            </Col>
            <Col>
              <h5>Very Good </h5>
            </Col>
            <Col md="2">
              <h5>100%</h5>
            </Col>
          </Row>
          <Row className="tablestlyles3">
            <Col md="6">
              <h5>
                Achievement between 80% and 99% of the agreed performance
                targets
              </h5>
            </Col>
            <Col>
              <h5>Good </h5>
            </Col>
            <Col md="2">
              <h5>80% - 99%</h5>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <h5>
                Achievement between 60% and 79% of the agreed performance
                targets
              </h5>
            </Col>
            <Col>
              <h5>Fair </h5>
            </Col>
            <Col md="2">
              <h5>60% - 79%</h5>
            </Col>
          </Row>
          <Row className="tablestlyles3">
            <Col md="6">
              <h5>Achievement up to 59% of the agreed performance targets</h5>
            </Col>
            <Col>
              <h5>Poor </h5>
            </Col>
            <Col md="2">
              <h5>59% and below</h5>
            </Col>
          </Row>
        </Table>
      </Row>
    </div>
  );
};

export default RatingScale;
