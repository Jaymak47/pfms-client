import { Col, Row, Table } from "react-bootstrap";
const TotalMeanScore = ({ totalScore, meanscore }) => {
  function myRating(score) {
    let gscore;
    switch (true) {
      case score > 100:
        gscore = "Excellent";
        break;
      case score <= 100 && score >= 99.1:
        gscore = "Very Good";
        break;
      case score <= 99 && score >= 80:
        gscore = "Good";
        break;
      case score <= 79 && score >= 60:
        gscore = "Fair";
        break;
      case score <= 59 && score >= 1:
        gscore = "Poor";
        break;
      case score <= 0.9 && score >= 0:
        gscore = "0";
        break;
      default:
        return "INVALID SCORE";
    }

    return gscore;
  }

  const rating = myRating(meanscore);

  return (
    <div>
      <Row className="m-3">
        <Table striped bordered hover>
          <Row>
            <Col className="tablestlyles">
              <h2>Total Score</h2>
            </Col>{" "}
            <Col className="tablestlyles2">
              <h2>Mean Score %</h2>
            </Col>
            <Col className="tablestlyles">
              <h2>Rating</h2>
            </Col>
          </Row>

          <Row className="tablestlyles3">
            <Col>
              <h2>{totalScore}</h2>
            </Col>
            <Col>
              <h2>{meanscore.toFixed(0)}</h2>
            </Col>
            <Col>
              <h2>{rating}</h2>
            </Col>
          </Row>
        </Table>
      </Row>
    </div>
  );
};

export default TotalMeanScore;
