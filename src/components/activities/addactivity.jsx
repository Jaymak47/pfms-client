import { Row, Col, Button, FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { ADD_ACTIVITY } from "../../graphql/mutations";
import { useForm } from "../../utils/hooks";
import { LOAD_ACTIVITIES } from "../../graphql/queries";
import { useHistory } from "react-router";

const AddActivities = ({
  loading,
  handleClose,
  Addrecord,
  setAddRecord,
  projects,
}) => {
  const history = useHistory();
  const { onChange, onSubmit, values, validated } = useForm(
    createActivityCallback,
    {
      activityno: "",
      activityname: "",
      activitydescription: "",
      project: "",
    }
  );

  const [createActivity, { error }] = useMutation(ADD_ACTIVITY, {
    variables: values,

    update(proxy, result) {
      setAddRecord(
        `A new Activity: ${values.activityname} successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_ACTIVITIES,
      });
      data.getActivities = [result.data.createActivity, ...data.getActivities];
      proxy.writeQuery({ query: LOAD_ACTIVITIES, data });
      history.push("/activities");
      values.activityno = "";
      values.activityname = "";
      values.activitydescription = "";
      values.project = "";
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });

  function createActivityCallback() {
    createActivity();
  }

  const {
    activityno,
    activityname,
    activitydescription,
    project,
    startdate,
    enddate,
  } = values;

  return (
    <div>
      <Row>
        <Col md="12">
          <Row className="m-5 adddataform">
            <h4 className="leading pt-4">
              Enter a new <strong> County Activity</strong> based on a{" "}
              <strong>Department or Project</strong>
            </h4>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>
                      {" "}
                      <strong>Activity No</strong>
                    </InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder="Activity No"
                      name="activityno"
                      value={activityno}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="12">
                  <InputGroup>
                    <InputGroup.Text>
                      {" "}
                      <strong>Activity Name</strong>
                    </InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder="Activity Name"
                      name="activityname"
                      value={activityname}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="12">
                  <InputGroup>
                    <InputGroup.Text>
                      {" "}
                      <strong>Activity Description</strong>
                    </InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder="Activity Description"
                      name="activitydescription"
                      value={activitydescription}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="12">
                  <InputGroup>
                    <InputGroup.Text>Project</InputGroup.Text>

                    <Form.Select
                      required
                      type="search"
                      placeholder="Project No"
                      name="project"
                      value={project}
                      onChange={onChange}
                    >
                      {projects.map((p) => (
                        <option value={p.id}>{p.projectname}</option>
                      ))}
                    </Form.Select>
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
              <Row className="m-3">
                {error && (
                  <div
                    className="ui error message"
                    style={{ marginBottom: 20 }}
                  >
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

          <Row className="m-3"></Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddActivities;
