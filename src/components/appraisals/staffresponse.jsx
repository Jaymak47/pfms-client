import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { FaHandPointLeft } from "react-icons/fa";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";

import {
  Col,
  Row,
  Button,
  Modal,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import LeftMenusGeneral from "../leftmenusgeneral";
import SelfappraisalTable from "./selfappraisaltargettable";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import "semantic-ui-css/semantic.min.css";
import { LOAD_TARGETS, ADD_TARGET } from "../../graphql/targets";
import { useForm } from "../../utils/hooks";
import { useTargets, useTarget, useTasks } from "../../graphql/usequeries";
import { UPDATE_TARGET } from "../../graphql/updatecomponents";

const StaffResponse = () => {
  const user = useContext(AuthContext);

  const [targets, setTargets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Addrecord, setAddRecord] = useState("");
  const [targetId, setTargetId] = useState("");
  const [target, setTarget] = useState({});

  const { id: userId } = user.user;

  const {
    data: tasksdata,
    loading: loadingTasks,
    error: tasksError,
  } = useTasks(userId);
  //Load Data from the Server
  useEffect(() => {
    if (tasksdata) {
      setTasks(tasksdata.getUser.tasks);
    }
  }, [tasksdata]);

  const { data: targetsdata, loading } = useTargets(userId);
  //Load Data from the Server
  useEffect(() => {
    if (targetsdata) {
      setTargets(targetsdata.getUser.targets);
    }
  }, [targetsdata]);

  //Initialize Sort Columns
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });

  //Initialize Sorted, Paginated Projects, PageSize,Current Page

  const [pageSize, setpageSize] = useState(50);
  const [currentPage, setcurrentPage] = useState(1);

  //handle allTargets Data
  function getPagedData() {
    const allTargets = targets;

    const sorted = _.orderBy(allTargets, [sortColumn.path], [sortColumn.order]);

    const paginatedTargets = paginate(sorted, currentPage, pageSize);

    return {
      sorted,
      totalCount: targets.length,
      aTargets: paginatedTargets,
    };
  }
  const { totalCount, aTargets } = getPagedData();

  const handleSort = (sortColumn) => {
    setsortColumn(sortColumn);
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const appraiseTarget = (target) => {
    setTargetId(target);
  };
  const {
    data: targetData,
    loading: LoadTarget,
    error: ErrorLoadingProjectData,
  } = useTarget(targetId);

  useEffect(() => {
    if (targetData) {
      setTarget(targetData.getTarget);
    }
  }, [targetData]);

  const { onChange, onSubmit, values, validated } = useForm(
    updateTargetCallback,
    {
      selfScore: "",
      achievedResult: "",
      targetname: "",
    }
  );

  const { selfScore, achievedResult, targetname, comment, response } = values;

  const [updateTarget, { error }] = useMutation(UPDATE_TARGET, {
    variables: {
      targetId,
      selfScore,
      achievedResult,
    },

    update(proxy, result) {
      setAddRecord(
        `Selfscore: ${target.targetname} Edited successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_TARGETS,
      });
      data.getUser.targets = [
        result.data.updateTarget,
        ...data.getUser.targets,
      ];
      proxy.writeQuery({ query: LOAD_TARGETS, data });
      values.selfScore = "";
      values.achievedResult = "";
    },
    onError(err) {
      if (err) {
        //console.log(err.networkError.result.errors);
        return error;
      }
    },
  });

  function updateTargetCallback() {
    updateTarget();
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
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row className="m-3">
                  <h2>Staff Response on Appraisal</h2>

                  <div className="sectiondescription m-2">
                    <h4 className="leading">
                      Where the Appraisee is not satisfied with the SPAS
                      evaluation, he/she may appeal to the DPMC/CHRAC as
                      provided in the SPAS guidelines.
                    </h4>
                  </div>
                </Row>
                <Row className="adddataform m-3">
                  <Row className="m-4">
                    <h3>
                      Thank your for your response on my Staff Appraisal Report.
                      I appreciate your comments.
                    </h3>
                  </Row>
                  <Row className="m-3">
                    <Col md="12">
                      <Form.Group>
                        <InputGroup>
                          <InputGroup.Text>Response: I </InputGroup.Text>
                          <Form.Select
                            type="text"
                            placeholder="Role"
                            name="response"
                            value={response}
                            onChange={onChange}
                          >
                            <option key="1">0: Choose Agree or Disagree</option>
                            <option value="promotion" key="2">
                              Agree
                            </option>
                            <option value="salaryreview" key="3">
                              Disagree
                            </option>
                          </Form.Select>
                          <InputGroup.Text>
                            With the submitted Staff Appraisal Report{" "}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="m-3">
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <FormControl
                          required
                          id="inlineFormInputGroupdepartmentdescription"
                          type="text"
                          placeholder=" Write here reasons/comments for Agreement/Disagreement: .. I.e. Thank you for recognizing the effort I put in the Tasks Allocated. I appreciate/Disagree with your comments. I agree/disagree that I ...... "
                          name="responsenotes"
                          as="textarea"
                          rows={5}
                          value={comment}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </Row>
                <Row className="m-3">
                  <Col></Col>
                  <Col md="3">
                    <Button type="submit" variant="success">
                      Submit Response
                    </Button>
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
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default StaffResponse;
