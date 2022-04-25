import { Row, Col, Button, FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../graphql/mutations";
import { useForm } from "../../utils/hooks";
import { LOAD_PROJECTS } from "../../graphql/queries";

const AddProjects = ({
  loading,
  handleClose,
  Addrecord,
  setAddRecord,
  departments,
}) => {
  const { onChange, onSubmit, values, validated } = useForm(
    createProjectCallback,
    {
      projectno: "",
      projectname: "",
      projectdescription: "",
      department: "",
    }
  );

  const [createProject, { error }] = useMutation(ADD_PROJECT, {
    variables: values,
    update(proxy, result) {
      setAddRecord(
        `A new project: ${values.projectname} successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_PROJECTS,
      });
      data.getProjects = [result.data.createProject, ...data.getProjects];
      proxy.writeQuery({ query: LOAD_PROJECTS, data });
      values.projectno = "";
      values.projectname = "";
      values.projectdescription = "";
      values.department = "";
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });

  function createProjectCallback() {
    createProject();
  }

  const { projectno, projectname, projectdescription, department } = values;

  return (
    <div>
      <Row className="m-5 adddataform">
        <Row className="m-3">
          <h2>Add New Project </h2>

          <div className="sectiondescription">
            <h6 className="leading">
              Add a <strong>new Project </strong> to the System
            </h6>
            A<strong> Project Program </strong> is an undertaking by any of the
            County Departments, carried out individually or collaboratively to
            achieve a particular objective inline with the County Development
            Goals.{" "}
          </div>
        </Row>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Row className="m-3">
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Text>Project No</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="No"
                  name="projectno"
                  value={projectno}
                  onChange={onChange}
                  // error={error ? true : false}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} md="12">
              <InputGroup>
                <InputGroup.Text>Project Name</InputGroup.Text>
                <FormControl
                  required
                  type="text"
                  placeholder="Project Name"
                  name="projectname"
                  value={projectname}
                  onChange={onChange}
                  // error={error ? true : false}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} md="12">
              <InputGroup>
                <InputGroup.Text>Project Description</InputGroup.Text>
                <FormControl
                  required
                  as="textarea"
                  type="text"
                  placeholder="Write Project description here"
                  name="projectdescription"
                  value={projectdescription}
                  onChange={onChange}
                  rows={2}
                  // error={error ? true : false}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} md="12">
              <InputGroup>
                <InputGroup.Text>DutyStation-Department</InputGroup.Text>
                <Form.Select
                  required
                  type="text"
                  placeholder="Duty Station/ Department"
                  name="department"
                  value={department}
                  onChange={onChange}
                  // error={error ? true : false}
                >
                  {departments.map((d) => (
                    <option value={d.id} key={d.id}>
                      {d.departmentname}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Col>
            <Col>
              <Button type="submit">Submit form</Button>
            </Col>
          </Row>
        </Form>
      </Row>
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
    </div>
  );
};

export default AddProjects;
