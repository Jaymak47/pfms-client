import { useState } from "react";
import jwtDecode from "jwt-decode";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import DatePickerA from "../../common/datepicker";
import Table from "react-bootstrap/Table";
import Toggle from "../../common/toggle";
import ProgressBar from "react-bootstrap/ProgressBar";

import LeftMenusGeneral from "../../components/leftmenusgeneral";

const EditTargets = () => {
  const [validated, setValidated] = useState(false);

  const [input, setInput] = useState({
    fisicalyear: "",
    startdate: "",
    enddate: "",
    review: "",
    projectmanager: "",
    projectname: "",
    projectno: "",
    departmentno: "",
    departmentname: "",
    donor: "",
    budget: "",
    projectdescription: "",
    specialnotes: "",
    test: "",
  });

  function getcurrentUser() {
    try {
      const jwt = localStorage.getItem("token");
      const currentuser = jwtDecode(jwt);
      //console.log(currentuser);
      //setUser({ username: currentuser.name, admin: currentuser.admin });
      return currentuser;
    } catch (error) {}
  }

  const currentuser = getcurrentUser();
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log(input);
  };

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral currentuser={currentuser} />
          </Col>
          <Col md="9">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="m-4">
                <h2>Edit Targets to Project-Activities </h2>

                <div className="sectiondescription">
                  <h6 className="leading">
                    Update <strong>existing Target details </strong> by adding
                    new Tasks
                    <strong>
                      {" "}
                      Main Access Fields :Date,Projects, Activities, Departments
                      or Employee{" "}
                    </strong>
                  </h6>
                </div>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Fisical Year</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="2021"
                      name="fisicalyear"
                      value={input.fisicalyear}
                      onChange={handleChange}
                    >
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                      <option>2030</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Project Review Date</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Review "
                      defaultValue="2021"
                      name="review"
                      value={input.review}
                      onChange={handleChange}
                    >
                      <option>1st Quarter</option>
                      <option>2nd Quarter</option>
                      <option>3rd Quarter</option>
                      <option>Annualy</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <h2>Target Status</h2>
                <ProgressBar>
                  <ProgressBar variant="success" now={5} key={1} label="Done" />
                  <ProgressBar
                    variant="primary"
                    now={20}
                    key={2}
                    label="Inprogress"
                  />
                  <ProgressBar
                    variant="warning"
                    now={50}
                    key={3}
                    label="Pending"
                  />
                  <ProgressBar
                    variant="secondary"
                    now={25}
                    key={4}
                    label="Not Started"
                  />
                </ProgressBar>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col} md="3">
                  <InputGroup>
                    <InputGroup.Text>
                      Start Date <DatePickerA />
                    </InputGroup.Text>
                    <Form.Control.Feedback></Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3">
                  <InputGroup>
                    <InputGroup.Text>
                      Completion Date <DatePickerA />
                    </InputGroup.Text>
                    <Form.Control.Feedback></Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} className="mx-5" md="2">
                  <h4>
                    <Toggle name="Start Target" />
                  </h4>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Employee Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Wamuyu Gathogo</option>
                      <option>Regina Jessicah</option>
                      <option>William Ntombora</option>
                      <option>Fatuma Koto</option>
                      <option>James Jarso</option>
                      <option>Fatuma Boru</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Supervisor Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Wamuyu Gathogo</option>
                      <option>Regina Jessicah</option>
                      <option>William Ntombora</option>
                      <option>Fatuma Koto</option>
                      <option>James Jarso</option>
                      <option>Fatuma Boru</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Project No</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupPersonalNo"
                      type="number"
                      placeholder="19620000"
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Project Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Project 1</option>
                      <option>Project 2</option>
                      <option>Project 3</option>
                      <option>Project 4</option>
                      <option>Project 5</option>
                      <option>Project 6</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Department No</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupPersonalNo"
                      type="number"
                      placeholder="19620000"
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Department Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Agriculture</option>
                      <option>Medical Services</option>
                      <option>Livestock</option>
                      <option>Office of the Governor</option>
                      <option>Public Health</option>
                      <option>Public Works</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Activity No</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupPersonalNo"
                      type="number"
                      placeholder="19620000"
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Activity Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Activity 1</option>
                      <option>Activity 2</option>
                      <option>Activity 3</option>
                      <option>Activity 4</option>
                      <option>Activity 5</option>
                      <option>Activity 6</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Target No</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupPersonalNo"
                      type="number"
                      placeholder="19620000"
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Target Name</InputGroup.Text>
                    <Form.Select
                      required
                      type="text"
                      placeholder="Role"
                      defaultValue="user"
                    >
                      <option>Agriculture</option>
                      <option>Medical Services</option>
                      <option>Livestock</option>
                      <option>Office of the Governor</option>
                      <option>Public Health</option>
                      <option>Public Works</option>
                    </Form.Select>
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <h6>
                  <span className="btn round btn-warning">5</span> Targets on
                  this Activity
                </h6>
                <Table striped bordered hover>
                  <thead className="tablestlyles">
                    <tr>
                      <th>No#</th>
                      <th>Task Name</th>
                      <th>Perfomance Indicator</th>
                      <th>Time Frame</th>
                      <th>Weight</th>
                      <th>Enter % Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        County Users Training on Perfomance Management System
                      </td>
                      <td>Use of PMS</td>
                      <td> 2 Weeks</td>
                      <td>5%</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Installation of PMS</td>
                      <td>Launch and Deployment of PMS</td>
                      <td> 1 Weeks</td>
                      <td>10%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Design of Perfomance Management System</td>
                      <td>Testing and Deployment</td>
                      <td> 1 Weeks</td>
                      <td>60%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Documentation of Perfomance Management System</td>
                      <td>SoftCopies and HardCopies of PFMs</td>
                      <td> 3 Weeks</td>
                      <td>5%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        Maintenance {`&`} support of Perfomance Management
                        System
                      </td>
                      <td>Testing and Deployment</td>
                      <td> 1 Weeks</td>
                      <td>20%</td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                  <thead className="tablestlyles">
                    <tr>
                      <th>+</th>
                      <th></th>
                      <th>Totals</th>
                      <th>8 Weeks</th>
                      <th>100%</th>
                      <th>20%</th>
                    </tr>
                  </thead>
                </Table>
              </Row>
              <Row className="m-5 bg-warning">
                <h6 className="leading">
                  Choose Edit/ update <strong>existing Target </strong> on the
                  System
                </h6>
                <Form.Group as={Col} md="12">
                  <InputGroup>
                    <InputGroup.Text>
                      {" "}
                      <strong>Target Name</strong>
                    </InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupSurname"
                      type="text"
                      placeholder="Target Name"
                    />
                  </InputGroup>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Row className="m-3">
                  <Form.Group as={Col} md="4">
                    <InputGroup>
                      <InputGroup.Text>Perfomance Indicator</InputGroup.Text>
                      <FormControl
                        required
                        id="inlineFormInputGroupPersonalNo"
                        type="number"
                        placeholder="Enter Performance Indicator"
                      />
                    </InputGroup>

                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <InputGroup>
                      <InputGroup.Text>Time Frame</InputGroup.Text>
                      <FormControl
                        required
                        id="inlineFormInputGroupPersonalNo"
                        type="number"
                        placeholder="Enter Time Frame"
                      />
                    </InputGroup>

                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <InputGroup>
                      <InputGroup.Text>
                        <strong>Weight</strong>
                      </InputGroup.Text>
                      <FormControl
                        required
                        id="inlineFormInputGroupPersonalNo"
                        type="number"
                        placeholder="Weight"
                      />
                    </InputGroup>

                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <hr></hr>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>Special Notes</InputGroup.Text>

                      <Form.Control as="textarea" rows={3} />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    feedback="Confirm Details before submitting."
                    feedbacktype="invalid"
                  >
                    <Button type="submit" variant="warning">
                      Discard
                    </Button>
                    <Button type="submit" variant="secondary" className="mx-2">
                      Save as a Draft
                    </Button>
                    <Button type="submit" variant="success">
                      Save
                    </Button>
                  </Form.Group>
                </Row>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default EditTargets;
