import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import _ from "lodash";
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
import { LOAD_PROJECTS, LOAD_DEPARTMENTS } from "../../graphql/queries";
import { DELETE_PROJECT } from "../../graphql/deletemutation";
import { useProject } from "../../graphql/usequeries";
import { UPDATE_PROJECT } from "../../graphql/updatecomponents";
import DeleteButton from "./deletebuttonproject";
import LeftMenusGeneral from "../leftmenusgeneral";
import { useForm } from "../../utils/hooks";

const EditProject = (props) => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const [project, setProject] = useState({});
  const [departments, setDepartments] = useState([]);
  const [Addrecord, setAddRecord] = useState("");
  const projectId = props.match.params.projectId;
  const {
    data: projectdata,
    loading,
    error: ErrorLoadingProjectData,
  } = useProject(projectId);
  const { loading: loadingDepartments, data: departmentsdata } =
    useQuery(LOAD_DEPARTMENTS);

  //Load Data from the Server
  useEffect(() => {
    if (projectdata) {
      setProject(projectdata.getProject);
    }
  }, [projectdata]);

  useEffect(() => {
    if (departmentsdata) {
      setDepartments(departmentsdata.getDepartments);
    }
  }, [departmentsdata]);

  const {
    projectno: currProjectno,
    projectname: currProjectname,
    projectdescription: currProjectdescription,
    department: currDepartment,
    createdAt,
    username,
    id,
  } = project;

  const { onChange, onSubmit, values, validated } = useForm(
    updateProjectCallback,
    {
      projectId: projectId,
      projectno: currProjectno,
      projectname: currProjectname,
      projectdescription: currProjectdescription,
      department: currDepartment,
    }
  );

  const { projectno, projectname, projectdescription, department } = values;

  const handleBack = () => {
    history.push("/projects");
  };

  const [updateProject, { error }] = useMutation(UPDATE_PROJECT, {
    variables: {
      projectId,
      projectno,
      projectname,
      projectdescription,
    },

    update(proxy, result) {
      setAddRecord(
        `Project: ${values.projectname} Edited successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_PROJECTS,
      });

      proxy.writeQuery({ query: LOAD_PROJECTS, data });
      history.push("/projects");
      values.projectno = "";
      values.projectname = "";
      values.projectdescription = "";
    },
    onError(err) {
      if (err) {
        //console.log(err.networkError.result.errors);
        return error;
      }
    },
  });

  function updateProjectCallback() {
    updateProject();
  }

  return (
    <div>
      <Row>
        <Row className="m-3"></Row>

        <Row className="mt-3">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9" className="mt-5">
            <div className="sectiondescription">
              <Row className="m-3">
                <h2>County Programmes / Projects</h2>
                <h5 className="tabcontentdisplay">
                  A secure, just and prosperous County, where people achieve
                  their full potential and enjoy a high quality of life.
                </h5>
              </Row>
              <Row>
                <div class="card text-center mt-5 adddataform1">
                  <div class="card-header ">
                    <h3>
                      {" "}
                      Project Name: {currProjectname}{" "}
                      <h6>
                        {""}Project No:
                        {currProjectno}{" "}
                      </h6>
                    </h3>
                  </div>
                  <div class="card-body adddataform">
                    <h5 class="card-title"></h5>
                    <p class="card-text">
                      <h3>Project Description</h3> {currProjectdescription}
                    </p>
                  </div>

                  <div class="card-footer text-muted">
                    Created: {moment(createdAt).fromNow()}
                    {"- : -"}
                    Date: {moment(createdAt).format(
                      "DD-MM-YYYY-HH-MM"
                    )} By: {username}
                  </div>
                  <div>
                    <Button variant="success" onClick={handleBack}>
                      Back
                    </Button>
                    {user && user.user.username === username && (
                      <DeleteButton
                        projectId={projectId}
                        projectname={currProjectname}
                      />
                    )}
                  </div>
                </div>

                <Row className="mt-5">
                  <div>
                    <h6>
                      Edit <strong> Project</strong> on the System
                    </h6>
                  </div>
                  <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Row className="m-3">
                      <Form.Group as={Col} md="6">
                        <InputGroup>
                          <InputGroup.Text>Project No</InputGroup.Text>
                          <FormControl
                            required
                            type="text"
                            placeholder={currProjectno}
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
                            placeholder={currProjectname}
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
                            placeholder={currProjectdescription}
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
                          <InputGroup.Text>
                            DutyStation-Department
                          </InputGroup.Text>
                          <Form.Select
                            required
                            type="text"
                            placeholder={currDepartment}
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
                          <Button type="submit" variant="success">
                            EDIT Project
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>
              </Row>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default EditProject;
