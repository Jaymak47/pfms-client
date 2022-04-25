import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { FaHandPointLeft } from "react-icons/fa";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";

import { Col, Row, Card } from "react-bootstrap";
import LeftMenusGeneral from "../leftmenusgeneral";
import SelfappraisalTable from "./selfappraisaltargettable";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import "semantic-ui-css/semantic.min.css";
import { LOAD_TARGETS, ADD_TARGET } from "../../graphql/targets";
import { useForm } from "../../utils/hooks";
import { useTargets, useTarget, useTasks } from "../../graphql/usequeries";
import { UPDATE_TARGET } from "../../graphql/updatecomponents";
import { string } from "prop-types";

const Appraisal = () => {
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

  const { selfScore, achievedResult, targetname, comment, reward, sanction } =
    values;

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              <Row className="m-3">
                <h2>Final Appraisal Report</h2>

                <div className="sectiondescription m-2">
                  <h4 className="leading">
                    The Final appraisal report with inputs from all the
                    Stakeholders: Appraisee, Supervisor, Departmental
                    Performance Management Committee and the County Public
                    Service Board
                  </h4>
                </div>
              </Row>
              <Row className="adddataform m-3">
                <Card>
                  <Card.Header>
                    <h3>
                      Staff Performance Appraisal Report -{" "}
                      {moment(Date.now()).format("YYYY")}
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        {" "}
                        <h3>
                          Appraisee Name:
                          {capitalizeFirstLetter(user.user.firstname) +
                            "  " +
                            capitalizeFirstLetter(user.user.surname)}
                        </h3>
                      </Col>
                      <Col md="2">
                        <h3>
                          {" "}
                          Date:
                          {moment(Date.now()).format("DD-MM-YYYY / hh:mm:ss")}
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" className="sectiondescription">
                        <h3>User Details</h3>
                        <h4 style={{ textAlign: "left" }}>
                          <strong>username:</strong>
                          {capitalizeFirstLetter(user.user.username)}
                        </h4>
                        <h4 style={{ textAlign: "left" }}>
                          Payroll No:{user.user.payrollno}
                        </h4>
                        <h4 style={{ textAlign: "left" }}>
                          Department:{user.user.department}
                        </h4>
                        <h4 style={{ textAlign: "left" }}>
                          Designation:{user.user.designation}
                        </h4>
                        <h4 style={{ textAlign: "left" }}>
                          Job Group:{user.user.jobgroup}
                        </h4>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    {" "}
                    <h4>SelScore Appraisal:</h4>
                  </Card.Body>
                </Card>
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
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Appraisal;
