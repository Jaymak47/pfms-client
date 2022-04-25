import React from "react";
import {
  FormControl,
  Form,
  InputGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";
const AddActivityTask = ({
  error,
  Addrecord,
  startdate,
  enddate,
  onChange,
  activities,
  activity,
  taskno,
  taskname,
  onSubmit,
  validated,
}) => {
  return (
    <div>
      <Col md="12">
        <Row className="m-5 adddataform">
          <Row className="m-3">
            <h2>Task Details</h2>

            <div className="sectiondescription">
              <h6 className="leading">
                Add a <strong> Task</strong> to the System
              </h6>
            </div>
          </Row>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="m-1">
              <Form.Group as={Col} md="12">
                <InputGroup>
                  <InputGroup.Text> Task No</InputGroup.Text>
                  <FormControl
                    required
                    type="text"
                    placeholder="Task No"
                    name="taskno"
                    value={taskno}
                    onChange={onChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="m-1">
              <Form.Group as={Col} md="12">
                <InputGroup>
                  <InputGroup.Text> Task Name</InputGroup.Text>
                  <FormControl
                    required
                    type="text"
                    placeholder="Task"
                    name="taskname"
                    value={taskname}
                    onChange={onChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="m-1">
              <Form.Group as={Col} md="12">
                <InputGroup>
                  <InputGroup.Text>Activity </InputGroup.Text>
                  <Form.Select
                    required
                    type="text"
                    placeholder="Activity"
                    name="activity"
                    value={activity}
                    onChange={onChange}
                  >
                    {" "}
                    {activities.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.activityno} :{a.activityname}
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
                  <InputGroup.Text>Start Date--</InputGroup.Text>
                  <FormControl
                    required
                    type="date"
                    name="startdate"
                    value={startdate}
                    onChange={onChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mx-auto">
                <InputGroup>
                  <InputGroup.Text>Completion Date--</InputGroup.Text>{" "}
                  <FormControl
                    required
                    type="date"
                    name="enddate"
                    value={enddate}
                    onChange={onChange}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Save
            </Button>
            <Row className="m-3">
              {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                  <ul
                    className="list "
                    style={{
                      "text-align": "center",
                    }}
                  >
                    <li>
                      {error.networkError
                        ? "Network Error: - Error connecting to PFMS Database Server: Contact System Administrator"
                        : error.graphQLErrors[0].message}
                    </li>
                  </ul>
                </div>
              )}

              <div className={Addrecord ? "ui success message" : null}>
                {Addrecord ? Addrecord : null}
              </div>
            </Row>
          </Form>
        </Row>
      </Col>
    </div>
  );
};

export default AddActivityTask;
