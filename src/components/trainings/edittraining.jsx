import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";

const EditTraining = ({
  handleChange,
  projects,
  activities,
  tasks,
  entryadded,
  project,
  activity,
  task,
  agreedperformance,
  performanceindicator,
  startdate,
  enddate,
  comments,
}) => {
  return (
    <div>
      <Row className="m-5 adddataform">
        <Row className="m-3">
          <h2>Target Details</h2>

          <div className="sectiondescription">
            <h6 className="leading">
              Add a <strong> Target</strong> to the System
            </h6>
          </div>
        </Row>
        <Row className="m-3">
          <Form.Group as={Col} md="4">
            <InputGroup>
              <InputGroup.Text>Project </InputGroup.Text>
              <Form.Select
                type="text"
                placeholder="Project"
                name="project"
                value={project}
                onChange={handleChange}
              >
                {" "}
                {projects.map((p) => (
                  <option
                    defaultValue="Enter Project"
                    key={p._id}
                    value={p._id}
                  >
                    {p.projectno}: {p.projectname}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <InputGroup>
              <InputGroup.Text>Activity </InputGroup.Text>
              <Form.Select
                type="text"
                placeholder="Activity"
                name="activity"
                value={activity}
                onChange={handleChange}
              >
                {" "}
                {activities.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.activityno} :{a.activityname}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
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
          <Form.Group as={Col} md="6">
            <InputGroup>
              <InputGroup.Text>Agreed Perfomance</InputGroup.Text>
              <FormControl
                required
                id="inlineFormInputGroupagreedPerformance"
                type="text"
                placeholder="Agreed Perfomance"
                name="agreedperformance"
                value={agreedperformance}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <InputGroup>
              <InputGroup.Text>Perfomance Indicator</InputGroup.Text>
              <FormControl
                required
                id="inlineFormInputGroupperfomanceIndicator"
                type="text"
                placeholder="Enter Perfomance Indicator Here"
                name="performanceindicator"
                value={performanceindicator}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="m-3">
          <Form.Group as={Col} md="6">
            <InputGroup>
              <InputGroup.Text>Start Date--</InputGroup.Text>
              <FormControl
                required
                id="inlineFormInputGroupStartDate"
                type="date"
                name="startdate"
                value={startdate}
                onChange={handleChange}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" className="mx-auto">
            <InputGroup>
              <InputGroup.Text>Completion Date--</InputGroup.Text>
              <FormControl
                required
                id="inlineFormInputGroupEndDate"
                type="date"
                name="enddate"
                value={enddate}
                onChange={handleChange}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="m-1">
          <Form.Group as={Col} md="12">
            <InputGroup>
              <InputGroup.Text> Comments </InputGroup.Text>
              <Form.Control
                id="inlineFormInputGroupComments"
                type="text"
                placeholder="Comments"
                name="comments"
                value={comments}
                onChange={handleChange}
                as="textarea"
                rows={3}
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

export default EditTraining;
