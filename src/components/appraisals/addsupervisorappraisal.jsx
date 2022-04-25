import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const AddSupervisorAppraisal = ({
  handleChange,

  tasks,
  targets,
  entryadded,
  task,
  agreedperformance,
  performanceindicator,
  achievedresults,
  scorerating,
}) => {
  return (
    <div>
      <Row className="m-5 adddataform">
        <Row className="m-2">
          <h2>Supervisor Appraisal Form</h2>

          <div className="sectiondescription">
            <h6 className="leading">
              Add <strong> Agreed Performance Target</strong> to the System.
            </h6>
            <br />
            Performance rating scores shall be based on verifiable evidence
            <br />
            Where the Appraisee is not satisfied with the SPAS evaluation,
            he/she may appeal to the DPMC/CHRAC as provided in the SPAS
            guidelines.
          </div>
        </Row>
        <Row className="m-3">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text>Task </InputGroup.Text>
              <Form.Select
                type="text"
                placeholder="Task"
                name="task"
                value={task}
                onChange={handleChange}
              >
                {" "}
                {tasks.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.task}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="m-3">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text>Agreed Perfomance </InputGroup.Text>
              <Form.Select
                type="text"
                placeholder="Agreed Perfomance"
                name="agreedperformance"
                value={agreedperformance}
                onChange={handleChange}
              >
                {" "}
                {targets.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.agreedperformance}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="m-3">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text>Performance Indicator </InputGroup.Text>
              <Form.Select
                type="text"
                placeholder="Performance Indicator"
                name="performanceindicator"
                value={performanceindicator}
                onChange={handleChange}
              >
                {" "}
                {targets.map((t) => (
                  <option key={t._id} value={t.performanceindicator}>
                    {t.performanceindicator}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="m-1">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text> Achieved Results</InputGroup.Text>
              <Form.Control
                id="inlineFormInputGroupAchievedResults"
                type="text"
                placeholder="Achieved Results in Line with Performance Indicator "
                name="achievedresults"
                value={achievedresults}
                onChange={handleChange}
              />
            </InputGroup>

            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="m-1">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text>
                {" "}
                Performance Appraisal Score Rating
              </InputGroup.Text>
              <Form.Control
                id="inlineFormInputGroupScoreRatingg"
                type="number"
                placeholder="20% "
                name="scorerating"
                value={scorerating}
                onChange={handleChange}
              />
            </InputGroup>

            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={entryadded ? "m-3 entryrecordalert" : "m-3"}>
          <h5>{entryadded ? entryadded : null}</h5>
        </Row>
      </Row>
    </div>
  );
};

export default AddSupervisorAppraisal;
