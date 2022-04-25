import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import LeftMenusGeneral from "../leftmenusgeneral";
import TargetsTable from "./targetTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import "semantic-ui-css/semantic.min.css";
import { LOAD_TARGETS, ADD_TARGET } from "../../graphql/targets";
import { useForm } from "../../utils/hooks";
import { useTargets, useTasks } from "../../graphql/usequeries";
import AddTargetReview from "./addtargetreview";

const TargetReview = () => {
  const user = useContext(AuthContext);

  const [targets, setTargets] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Addrecord, setAddRecord] = useState("");

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

  const { onChange, onSubmit, values, validated } = useForm(
    createTargetCallback,
    {
      targetno: "",
      targetname: "",
      task: "",
      agreedPerformance: "",
      performanceIndicator: "",
      startdate: "",
      enddate: "",
    }
  );

  const [createTarget, { error }] = useMutation(ADD_TARGET, {
    variables: values,

    update(proxy, result) {
      setAddRecord(
        `A new Target: ${values.targetname} successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_TARGETS,
        variables: { userId },
      });

      data.getUser.targets = [
        result.data.createTarget,
        ...data.getUser.targets,
      ];
      proxy.writeQuery({
        query: LOAD_TARGETS,
        variables: { userId },
        data,
      });
      values.targetno = "";
      values.targetname = "";
      values.task = "";
      values.agreedPerformance = "";
      values.performanceIndicator = "";
      values.startdate = "";
      values.enddate = "";
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });

  function createTargetCallback() {
    createTarget();
  }

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

  const {
    task,
    targetno,
    targetname,
    agreedPerformance,
    performanceIndicator,
    startdate,
    enddate,
  } = values;

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
                <h2>Mid-Year Review : Targets Reviewed</h2>
              </Row>
            </div>

            <Row className="m-1">
              <AddTargetReview
                onChange={onChange}
                onSubmit={onSubmit}
                validated={validated}
                targetno={targetno}
                targetname={targetname}
                agreedPerformance={agreedPerformance}
                performanceIndicator={performanceIndicator}
                startdate={startdate}
                enddate={enddate}
                task={task}
                tasks={tasks}
                error={error}
                Addrecord={Addrecord}
                values={values}
              />
            </Row>

            <Row>
              <h4>
                {totalCount === 0
                  ? "No Task in the Database"
                  : `Showing ${totalCount} Targets in the database.`}
              </h4>
              <TargetsTable
                targets={aTargets}
                onSort={handleSort}
                sortColumn={sortColumn}
                count={targets.length}
                input="input"
                loading={loading}
                name="Targets"
              />
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

export default TargetReview;
