import { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { FaHandPointLeft } from "react-icons/fa";
import { AuthContext } from "../../context/auth";

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
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import "semantic-ui-css/semantic.min.css";

import {
  useTrainings,
  ADD_TRAININGS,
  LOAD_TRAININGS,
} from "../../graphql/trainings";
import { useForm } from "../../utils/hooks";
import { useTasks } from "../../graphql/tasks";
import TrainingTable from "./trainingTable";

const Trainings = () => {
  const user = useContext(AuthContext);
  const [trainings, setTrainings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [Addrecord, setAddRecord] = useState("");

  const { id: userId } = user.user;

  const { data: tasksdata } = useTasks(user.user.department);
  console.log(tasksdata);
  const {
    error: trainingserrors,
    data: trainingsData,
    loading: loadingTrainings,
  } = useTrainings(user.user.department);
  //Load Data from the Server

  useEffect(() => {
    if (trainingsData) {
      setTrainings(trainingsData.getTrainings);
    }
  }, [trainingsData]);
  useEffect(() => {
    if (tasksdata) {
      setTasks(tasksdata.getTasks);
    }
  }, [tasksdata]);

  //Initialize Sort Columns
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });

  //Initialize Sorted, Paginated Projects, PageSize,Current Page

  const [pageSize, setpageSize] = useState(50);
  const [currentPage, setcurrentPage] = useState(1);

  //handle allTargets Data
  ///getPaged Data Function

  function getPagedData() {
    const allTrainings = trainings;

    let filtered = allTrainings;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedTrainings = paginate(sorted, currentPage, pageSize);

    return {
      sorted,
      totalCount: filtered.length,
      aTrainings: paginatedTrainings,
    };
  }
  const { totalCount, aTrainings } = getPagedData();

  const handleSort = (sortColumn) => {
    setsortColumn(sortColumn);
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const { onChange, onSubmit, values, validated } = useForm(
    createTrainingCallback,
    {
      trainingno: "",
      trainingname: "",
      trainingdescription: "",
      task: "",
      venue: "",
      resources: "",
      startdate: "",
      enddate: "",
      comments: "",
    }
  );

  const [createTraining, { error }] = useMutation(ADD_TRAININGS, {
    variables: values,
    update(proxy, result) {
      setAddRecord(
        `A new Training: ${values.trainingname} successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_TRAININGS,
      });
      data.getTrainings = [result.data.createTraining, ...data.getTrainings];
      proxy.writeQuery({ query: LOAD_TRAININGS, data });
      values.trainingno = "";
      values.tainingname = "";
      values.trainingdescription = "";
      values.task = "";
      values.venue = "";
      values.resources = "";
      values.startdate = "";
      values.enddate = "";
      values.comments = "";
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });

  function createTrainingCallback() {
    createTraining();
  }

  const {
    trainingno,
    trainingname,
    trainingdescription,
    task,
    venue,
    resources,
    startdate,
    enddate,
    comments,
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
            <Row>
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row className="m-5 adddataform">
                  <Row className="m-3">
                    <h2>Training Details</h2>
                    <Col md="12">
                      <h3 className="leading sectiondescription">
                        Add a <strong> Training</strong> to the System
                      </h3>
                    </Col>
                  </Row>
                  <Row className="m-3">
                    <Form.Group as={Col} md="6">
                      <InputGroup>
                        <InputGroup.Text>Training No</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="Training No"
                          name="trainingno"
                          value={trainingno}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <InputGroup>
                        <InputGroup.Text>Training Name</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="Training Name"
                          name="trainingname"
                          value={trainingname}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="m-3">
                    <Form.Group as={Col} md="12">
                      <InputGroup>
                        <InputGroup.Text>Training Description</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="Training Description"
                          name="trainingdescription"
                          value={trainingdescription}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="m-3">
                    <Form.Group as={Col} md="6">
                      <InputGroup>
                        <InputGroup.Text>Task </InputGroup.Text>
                        <Form.Select
                          type="text"
                          placeholder="Task"
                          name="task"
                          value={task}
                          onChange={onChange}
                        >
                          {" "}
                          {tasks.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.taskname}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <InputGroup>
                        <InputGroup.Text>Venue</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="Venue"
                          name="venue"
                          value={venue}
                          onChange={onChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <Row className="m-3">
                    <Form.Group as={Col} md="12">
                      <InputGroup>
                        <InputGroup.Text>Resources</InputGroup.Text>
                        <FormControl
                          required
                          type="text"
                          placeholder="Training Resources"
                          name="resources"
                          value={resources}
                          as="textarea"
                          onChange={onChange}
                        />
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
                        <InputGroup.Text>End Date--</InputGroup.Text>
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
                  <Row className="m-1">
                    <Form.Group as={Col} md="12">
                      <InputGroup>
                        <InputGroup.Text> Comments </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Comments"
                          name="comments"
                          value={comments}
                          onChange={onChange}
                          as="textarea"
                          rows={3}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </Row>
                <Row className="m-3">
                  <Col></Col>
                  <Col md="3">
                    <Button type="submit" variant="success">
                      Submit Training
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
            <Row className="m-1">
              <h4>
                {totalCount === 0
                  ? "No Training Activities in the Database"
                  : `Showing ${totalCount} Training Activities in the database.`}
              </h4>

              <TrainingTable
                error={error}
                trainings={aTrainings}
                onSort={handleSort}
                sortColumn={sortColumn}
                count={trainings.length}
                input="Add New"
                loading={loadingTrainings}
                name="Trainings"
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

export default Trainings;
