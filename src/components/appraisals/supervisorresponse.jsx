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

const SupervisorResponse = () => {
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
                  <h2>Supervisor Response on Appraisal</h2>

                  <div className="sectiondescription m-2">
                    <h4 className="leading">
                      Supervisor’s comments on appraisee’s performance at the
                      end of the year including any factors that hindered
                      performance (Please indicate if the appraisee requires to
                      be put on a performance improvement plan/programme. If so,
                      indicate the type)
                    </h4>
                  </div>
                </Row>
                <Row className="adddataform m-3">
                  <Row className="m-3">
                    <Form.Group as={Col} md="4" className="mx-auto">
                      <InputGroup>
                        <InputGroup.Text>Appraisee Name</InputGroup.Text>
                        <Form.Select
                          required
                          type="text"
                          name="reward"
                          value={reward}
                          onChange={onChange}
                        >
                          <option key="1">0: Choose Appraisee</option>
                          <option value="john" key="1">
                            John Makola
                          </option>
                          <option value="abduba" key="2">
                            Abduba Mollu
                          </option>
                          <option value="Ann" key="3">
                            Ann Thuranira
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="m-3">
                    <Form.Group as={Col} md="4" className="mx-auto">
                      <InputGroup>
                        <InputGroup.Text>Reward--</InputGroup.Text>
                        <Form.Select
                          required
                          type="text"
                          name="reward"
                          value={reward}
                          onChange={onChange}
                        >
                          <option key="1">0: Choose Reward Type</option>
                          <option value="Bonus" key="1">
                            Bonus
                          </option>
                          <option value="Recommendation Letter" key="2">
                            Recommendation Letter
                          </option>
                          <option value="promote" key="3">
                            Promote
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mx-auto">
                      <InputGroup>
                        <InputGroup.Text>
                          Other interventions --
                        </InputGroup.Text>
                        <Form.Select
                          required
                          type="text"
                          name="reward"
                          value={reward}
                          onChange={onChange}
                        >
                          <option key="1">0: Choose other Interventions</option>
                          <option value="Counselling" key="2">
                            Counselling
                          </option>
                          <option value="Training" key="3">
                            Training {"&"} Development
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mx-auto">
                      <InputGroup>
                        <InputGroup.Text>Sanction --</InputGroup.Text>
                        <Form.Select
                          required
                          type="text"
                          name="sanction"
                          value={sanction}
                          onChange={onChange}
                        >
                          <option key="1">0: Choose Sanction</option>
                          <option value="Warning" key="2">
                            Warning
                          </option>
                          <option value="Separation" key="3">
                            Separation
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <Row className="m-3">
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <FormControl
                          required
                          type="text"
                          placeholder=" Write summary remarks/ Comments for consideration by the Departmental Performance Management Committee  "
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

export default SupervisorResponse;
