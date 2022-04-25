import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { FaHandPointLeft } from "react-icons/fa";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";

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
import SupervisorappraisaljointreviewTable from "./supervisorappraisaljointreviewTable";

const JointReview = (props) => {
  const user = useContext(AuthContext);
  const history = useHistory();
  const userId = props.match.params.id;
  const [targets, setTargets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Addrecord, setAddRecord] = useState("");
  const [targetId, setTargetId] = useState("");
  const [target, setTarget] = useState({});
  console.log(props);
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

  const { selfScore, achievedResult, targetname } = values;

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

  const handleBack = () => {
    history.push("/supervisorappraisees");
  };
  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9">
            <div className="sectiondescription">
              <Row className="m-3">
                <h2>Supervisor Joint Reviews Appraisal</h2>
                <Row>
                  <Col md="2">
                    <h3>#</h3>
                  </Col>
                  <Col>
                    <h3 style={{ textAlign: "left" }}> Notes</h3>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col md="2">
                    <h3>1</h3>
                  </Col>
                  <Col>
                    <h6 className="leading" style={{ textAlign: "left" }}>
                      This appraisal process will be completed by officers in
                      Job Group ‘J’ and above and equivalent grades in the
                      County Public Service. Officers in Jog Group ‘H’ and below
                      will complete a separate appraisal report.
                    </h6>
                  </Col>
                  <hr></hr>
                </Row>

                <Row>
                  <Col md="2">
                    <h3>2</h3>
                  </Col>
                  <Col>
                    <h6 className="leading" style={{ textAlign: "left" }}>
                      The Appraisee and the Supervisor should read the SPAS
                      guidelines prior to embarking on the actual appraisal.
                    </h6>
                  </Col>
                  <hr></hr>
                </Row>
                <Row>
                  <Col md="2">
                    <h3>3</h3>
                  </Col>
                  <Col>
                    <h6 style={{ textAlign: "left" }}>
                      The Supervisor and Appraisee shall discuss and agree on
                      the performance evaluation and rating at the end of the
                      appraisal period.
                    </h6>
                  </Col>
                </Row>
              </Row>
            </div>
            <Row className="m-3"></Row>

            <Row>
              <h4>
                {totalCount === 0
                  ? "No Task in the Database"
                  : `Showing ${totalCount} Targets in the database.`}
              </h4>

              <Col md="9">
                <SupervisorappraisaljointreviewTable
                  targets={aTargets}
                  onSort={handleSort}
                  sortColumn={sortColumn}
                  count={targets.length}
                  input="input"
                  loading={loading}
                  name="Targets"
                  targetId={targetId}
                  appraiseTarget={appraiseTarget}
                />
                <>
                  <Col className="md-2">
                    <Button variant="warning" onClick={handleBack}>
                      Back
                    </Button>
                  </Col>
                </>
              </Col>

              <Col md="3" className="mt-5">
                <h3>
                  <FaHandPointLeft />
                  {""}
                  Select a Target on the table to Appraise
                </h3>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                  <div className="adddataform m-2">
                    <h3>{target.targetname}</h3>
                  </div>
                  <Row>
                    <Form.Group as={Col} md="12">
                      <InputGroup>
                        <InputGroup.Text> Achieved Result</InputGroup.Text>
                        <Form.Control
                          required
                          title="Score"
                          type="text"
                          placeholder="Achieved Result"
                          name="achievedResult"
                          value={achievedResult}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mt-3">
                    <Form.Group as={Col} md="12">
                      <InputGroup>
                        <InputGroup.Text> Score (Per %)</InputGroup.Text>
                        <Form.Control
                          required
                          title="Score"
                          type="text"
                          placeholder="0"
                          name="selfScore"
                          value={selfScore}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Col className="mt-2">
                    <Button variant="success" type="submit">
                      score
                    </Button>
                  </Col>
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

            <Row className="m-3">
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default JointReview;
