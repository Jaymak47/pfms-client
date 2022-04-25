import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_STAFF } from "../../graphql/mutations";
import {
  LOAD_DEPARTMENTS,
  LOAD_JOBGROUPS,
  LOAD_ROLES,
} from "../../graphql/queries";
import {
  Row,
  Col,
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import LeftMenusGeneral from "../leftmenusgeneral";
import { useForm } from "../../utils/hooks";

const Register = (props) => {
  const user = useContext(AuthContext);
  const [Addrecord, setAddRecord] = useState("");
  const [errors, setErrors] = useState({});
  const [netErrors, setNetErrors] = useState("");
  const [departments, setDepartments] = useState([]);
  const [jobgroups, setJobgroups] = useState([]);
  const [roles, setRoles] = useState([]);

  const { onChange, onSubmit, values, validated } = useForm(registerStaff, {
    username: "",
    firstname: "",
    surname: "",
    othernames: "",
    password: "",
    confirmPassword: "",
    email: "",
    mobileno: "",
    payrollno: "",
    designation: "",
    department: "",
    jobgroup: "",
    role: "",
  });
  const { data: departmentsdata } = useQuery(LOAD_DEPARTMENTS);

  const { data: jobgroupsdata } = useQuery(LOAD_JOBGROUPS);

  const { data: rolesdata } = useQuery(LOAD_ROLES);

  const [addStaff, { error }] = useMutation(ADD_STAFF, {
    update(_, { login: userdata }) {
      setAddRecord(
        `A new user: ${values.username} successfully added to the System `
      );
      values.username = "";
      values.firstname = "";
      values.surname = "";
      values.othernames = "";
      values.password = "";
      values.confirmPassword = "";
      values.email = "";
      values.mobileno = "";
      values.payrollno = "";
      values.designation = "";
      values.department = "";
      values.jobgroup = "";
      values.role = "";
    },

    onError({ graphQLErrors, networkError }) {
      let err = "";
      if (networkError) {
        err = "Error connecting to System Server contact Administrator";
        setNetErrors(err);
        console.log(error);
        return;
      }
      if (graphQLErrors) {
        err = graphQLErrors[0].extensions.exception.errors;
        setErrors(err);
        console.log(error);
        return;
      }
    },

    variables: values,
  });

  function registerStaff() {
    addStaff();
  }

  //GET DATA FROM SERVSER
  useEffect(() => {
    if (departmentsdata) {
      setDepartments(departmentsdata.getDepartments);
    }
  }, [departmentsdata]);

  useEffect(() => {
    if (jobgroupsdata) {
      setJobgroups(jobgroupsdata.getJobGroups);
    }
  }, [jobgroupsdata]);

  useEffect(() => {
    if (rolesdata) {
      setRoles(rolesdata.getRoles);
    }
  }, [rolesdata]);

  //DESTRUCTURE FIELDS
  const {
    username,
    firstname,
    surname,
    othernames,
    password,
    confirmPassword,
    email,
    mobileno,
    payrollno,
    designation,
    department,
    jobgroup,
    role,
  } = values;

  return (
    <div>
      {user && (
        <Row>
          <Row className="m-5"></Row>

          <Row className="mt-2">
            <Col md="3" className="listgroup p-3">
              <LeftMenusGeneral user={user} />
            </Col>
            <Col md="9" className="mt-2">
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row className="m-5">
                  <h2>Staff Registration Form</h2>

                  <div className="sectiondescription">
                    <h6 className="leading">
                      Add an <strong> Employee/ Staff </strong> to the System
                    </h6>
                  </div>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>First Name</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        value={firstname}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Surname</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        value={surname}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Other Names</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Other Names"
                        name="othernames"
                        value={othernames}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Username</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Password</InputGroup.Text>
                      <FormControl
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Confirm Password</InputGroup.Text>
                      <FormControl
                        required
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Email</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Mobile No</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Mobile No"
                        name="mobileno"
                        value={mobileno}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <hr></hr>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Payroll No,</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Payroll No,"
                        name="payrollno"
                        value={payrollno}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Job Group</InputGroup.Text>
                      <Form.Select
                        type="text"
                        placeholder="Job Group"
                        name="jobgroup"
                        value={jobgroup}
                        onChange={onChange}
                      >
                        {jobgroups.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.jobgroupname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>DutyStation-Department</InputGroup.Text>
                      <Form.Select
                        type="text"
                        placeholder="Duty Station/ Department"
                        name="department"
                        value={department}
                        onChange={onChange}
                      >
                        {departments.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.departmentname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Designation</InputGroup.Text>
                      <FormControl
                        required
                        type="text"
                        placeholder="Designation"
                        name="designation"
                        value={designation}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Text>Role</InputGroup.Text>
                      <Form.Select
                        type="text"
                        placeholder="Role"
                        name="role"
                        value={role}
                        onChange={onChange}
                      >
                        {roles.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.rolesname}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Button type="submit">Submit form</Button>
                {/* <Row className={Addrecord ? "m-3 entryrecordalert" : "m-3"}>
                <h5>{Addrecord ? Addrecord : null}</h5>
              </Row> */}
              </Form>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={netErrors ? "ui error message" : null}>
                {netErrors ? netErrors : null}
              </div>
              <div className={Addrecord ? "ui success message" : null}>
                {Addrecord ? Addrecord : null}
              </div>
            </Col>
          </Row>
        </Row>
      )}
    </div>
  );
};

export default Register;
