import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import {
  Col,
  Row,
  Button,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { AuthContext } from "../../context/auth";
import { LOAD_DEPARTMENTS, useDepartment } from "../../graphql/queries";
import { UPDATE_DEPARTMENT } from "../../graphql/mutations";
import DeleteButton from "./deletebuttondepartment";
import LeftMenusGeneral from "../leftmenusgeneral";
import { useForm } from "../../utils/hooks";

const EditDepartment = (props) => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const departmentId = props.match.params.departmentId;
  const { data: departmentdata } = useDepartment(departmentId);
  const [department, setDepartment] = useState({});
  const [Addrecord, setAddRecord] = useState("");

  //Load Data from the Server
  useEffect(() => {
    if (departmentdata) {
      setDepartment(departmentdata.getDepartment);
    }
  }, [departmentdata]);
  const {
    departmentno: currDeptno,
    departmentname: currDeptname,
    departmentdescription: currDeptdescription,
    createdAt,
    username,
  } = department;

  const { onChange, onSubmit, values, validated } = useForm(
    updateDepartmentCallback,
    {
      departmentId: departmentId,
      departmentno: currDeptno,
      departmentname: currDeptname,
      departmentdescription: currDeptdescription,
    }
  );

  const { departmentno, departmentname, departmentdescription } = values;

  const handleBack = () => {
    history.push("/departments");
  };

  const [updateDepartment, { error }] = useMutation(UPDATE_DEPARTMENT, {
    variables: {
      departmentId,
      departmentno,
      departmentname,
      departmentdescription,
    },

    update(proxy, result) {
      setAddRecord(
        `Department: ${values.departmentname} Edited successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_DEPARTMENTS,
      });

      proxy.writeQuery({ query: LOAD_DEPARTMENTS, data });
      history.push("/departments");
      values.departmentno = "";
      values.departmentname = "";
      values.departmentdescription = "";
    },
    onError(err) {
      if (err) {
        //console.log(err.networkError.result.errors);
        return error;
      }
    },
  });

  function updateDepartmentCallback() {
    updateDepartment();
  }

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9">
            <Row>
              <div className="card text-center mt-5 adddataform1">
                <div className="card-header ">
                  <h3>
                    {" "}
                    Department Name: {currDeptname} {""}Department No:
                    {currDeptno}{" "}
                  </h3>
                </div>
                <div className="card-body adddataform">
                  <p className="card-text">
                    <strong>Department Description:</strong>{" "}
                    {currDeptdescription}
                  </p>
                </div>

                <div className="card-footer text-muted">
                  Created: {moment(createdAt).fromNow()}
                  {"- : -"}
                  Date: {moment(createdAt).format("DD-MM-YYYY-HH-MM")} By:{" "}
                  {username}
                </div>
                <div>
                  <Button variant="success" onClick={handleBack}>
                    Back
                  </Button>
                  {user && user.user.username === username && (
                    <DeleteButton
                      departmentId={departmentId}
                      departmentname={currDeptname}
                    />
                  )}
                </div>
              </div>
            </Row>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Row className="m-5">
                <div className="sectiondescription">
                  <h6 className="leading">
                    Edit <strong> Department</strong> on the System
                  </h6>
                </div>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Department No</InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder={currDeptno}
                      name="departmentno"
                      value={departmentno}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Department Name</InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder={currDeptname}
                      name="departmentname"
                      value={departmentname}
                      onChange={onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <hr></hr>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>Department Description</InputGroup.Text>
                    <FormControl
                      required
                      type="text"
                      placeholder={currDeptdescription}
                      name="departmentdescription"
                      as="textarea"
                      rows={3}
                      value={departmentdescription}
                      onChange={onChange}
                    />
                    <Button type="submit" variant="success">
                      EDIT Department
                    </Button>
                  </InputGroup>
                </Form.Group>
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
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default EditDepartment;
