import {
  Col,
  Row,
  InputGroup,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

const AddTargetReview = ({
  onChange,
  onSubmit,
  validated,
  targetno,
  targetname,
  agreedPerformance,
  performanceIndicator,
  startdate,
  enddate,
  task,
  tasks,
  error,
  Addrecord,
  values,
}) => {
  return (
    <div>
      <Row className="mt-5 adddataform">
        <div className="sectiondescription">
          <h5 className="tabcontentdisplay">
            Targets Changed or Added, Remarks (Indicate Level of Achievement)
          </h5>
        </div>

        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row className="m-3">
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Target No</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="Target No"
                  name="targetno"
                  value={targetno}
                  onChange={onChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Target Name</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="Enter Target Name Here"
                  name="targetname"
                  value={targetname}
                  onChange={onChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Task </InputGroup.Text>
                <Form.Select
                  required
                  type="text"
                  placeholder="Task"
                  name="task"
                  value={task}
                  onChange={onChange}
                >
                  {" "}
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.taskname}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Agreed Perfomance</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="Agreed Perfomance"
                  name="agreedPerformance"
                  value={agreedPerformance}
                  onChange={onChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Perfomance Indicator</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="Enter Perfomance Indicator Here"
                  name="performanceIndicator"
                  value={performanceIndicator}
                  onChange={onChange}
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
                  type="date"
                  name="startdate"
                  value={startdate}
                  onChange={onChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" className="mx-auto">
              <InputGroup>
                <InputGroup.Text>End Date--</InputGroup.Text>
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
    </div>
  );
};

export default AddTargetReview;
