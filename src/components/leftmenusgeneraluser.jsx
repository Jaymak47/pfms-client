import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FaGooglePlay, FaHome } from "react-icons/fa";
import { GiStairsGoal, GiDiceTarget } from "react-icons/gi";
import { AiOutlineAim } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

const LeftMenusGeneralUser = () => {
  const [sectors, setSectors] = useState(false);
  const [targets, setTargets] = useState(false);
  const [activity, setActivity] = useState(false);
  const [project, setProject] = useState(false);
  const [contracts, setContracts] = useState(false);
  const [trainings, setTrainings] = useState(false);
  const [appraisals, setAppraisals] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [feedback, setFeedback] = useState(false);

  return (
    <Row className="d-sm-none d-md-block m-2">
      <>
        <Col className="mt-1">
          <ListGroup>
            {/* Isiolo County Vision Mission Goals Sectors Objectives*/}

            <ListGroup.Item className="list-group-item-success p-3">
              <h3>County Goals, Objectives </h3>
              {/* About us Menu */}
              <>
                <Link style={{ textDecoration: "none" }} to="/dashboard">
                  <ListGroup.Item className="d-flex  ">
                    <Col md="1">
                      <FaHome style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>Home</Col>
                  </ListGroup.Item>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/countyvision">
                  <ListGroup.Item className="d-flex ">
                    <Col md="1">
                      <AiOutlineAim style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>County Vision</Col>
                  </ListGroup.Item>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/countymission">
                  <ListGroup.Item className="d-flex ">
                    <Col md="1">
                      <GiStairsGoal style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>County Mission</Col>
                  </ListGroup.Item>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/countygoals">
                  <ListGroup.Item className="d-flex ">
                    <Col md="1">
                      <GiDiceTarget style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>County Goals and Objectives</Col>
                  </ListGroup.Item>
                </Link>
              </>

              <ListGroup.Item
                action
                id="sectors"
                onClick={() => setSectors(!sectors)}
                className="d-flex "
              >
                <Col md="1">
                  <FaGooglePlay style={{ color: "green" }} />
                  ....
                </Col>

                <Col>
                  Sectors / Sub-Sectors / Department Goals
                  {sectors && (
                    <>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/agrilivefishdev"
                      >
                        <ListGroup.Item action>
                          Agriculture, Livestock and Fishery Development
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/waterenergyenv"
                      >
                        <ListGroup.Item action>
                          Water, Energy, Environment Natural Resource and
                          Climate Change
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/healthservices"
                      >
                        <ListGroup.Item action>Health Services</ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/landsurbanplanning"
                      >
                        <ListGroup.Item action>
                          Lands, Urban Planning Roads, Transport and public
                          works
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/tourismwildlifetrade"
                      >
                        <ListGroup.Item action>
                          Tourism, Wildlife, Trade, Public Service and County
                          Administration
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/educationvocationaltraining"
                      >
                        <ListGroup.Item action>
                          Education, vocational training, youth, sports, culture
                          and social service
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/fiananceeconomicplanning"
                      >
                        <ListGroup.Item action>
                          Finance, Economic Planning, ICT and Conflict
                          Resolution
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/officeofgovdpgov"
                      >
                        <ListGroup.Item action>
                          Office of the Governor and Deputy Governor
                        </ListGroup.Item>
                      </Link>
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/countyassembley"
                      >
                        <ListGroup.Item action>
                          County Assembly Services
                        </ListGroup.Item>
                      </Link>
                    </>
                  )}
                </Col>
              </ListGroup.Item>
            </ListGroup.Item>

            <ListGroup.Item className="list-group-item-success p-3">
              <h3>Work Planner</h3>

              {/* Projects */}
              <>
                {" "}
                <ListGroup.Item
                  action
                  id="countyprojects"
                  onClick={() => setProject(!project)}
                  className="d-flex "
                >
                  <Col md="1">
                    <FaGooglePlay style={{ color: "green" }} />
                  </Col>
                  <Col>
                    <h4>Projects {"&"} Contracts....</h4>
                    {project && (
                      <>
                        <Link style={{ textDecoration: "none" }} to="/projects">
                          <ListGroup.Item action className="mt-1">
                            View Projects
                          </ListGroup.Item>
                        </Link>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/contracts"
                        >
                          <ListGroup.Item action className="mt-1">
                            View Performance Contracts
                          </ListGroup.Item>
                        </Link>
                      </>
                    )}
                  </Col>
                </ListGroup.Item>{" "}
              </>

              {/* Activities */}
              <>
                {" "}
                <ListGroup.Item
                  action
                  id="countyplanning"
                  onClick={() => setActivity(!activity)}
                  className="d-flex "
                >
                  <Col md="1">
                    <FaGooglePlay style={{ color: "green" }} />
                  </Col>
                  <Col>
                    <h4>Activities {"&"} Tasks....</h4>
                    {activity && (
                      <>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/activities"
                        >
                          <ListGroup.Item action>
                            View Activities
                          </ListGroup.Item>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/tasks">
                          <ListGroup.Item action>View Tasks</ListGroup.Item>
                        </Link>
                      </>
                    )}
                  </Col>
                </ListGroup.Item>{" "}
              </>

              {/* Targets */}
              <>
                <Link style={{ textDecoration: "none" }} to="/targets">
                  <ListGroup.Item className="d-flex ">
                    <Col md="1">
                      <AiOutlineAim style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>
                      <h4>View {"&"} Set Targets</h4>
                    </Col>
                  </ListGroup.Item>
                </Link>
              </>
              <>
                <Link style={{ textDecoration: "none" }} to="/targetreviews">
                  <ListGroup.Item className="d-flex ">
                    <Col md="1">
                      <AiOutlineAim style={{ color: "#ee9b00" }} />
                    </Col>
                    <Col>
                      <h4>Target Reviews</h4>
                    </Col>
                  </ListGroup.Item>
                </Link>
              </>
            </ListGroup.Item>
            {/* Staff Appraisal Menu */}
            <ListGroup.Item className="list-group-item-warning">
              <h3>Staff Appraisal </h3>

              <Col>
                {/* Staff Appraisal */}

                <>
                  <Link style={{ textDecoration: "none" }} to="/selfappraisal">
                    <ListGroup.Item className="d-flex ">
                      <Col md="1">
                        <AiOutlineAim style={{ color: "#ee9b00" }} />
                      </Col>
                      <Col>
                        <h4>Self Appraisal</h4>
                      </Col>
                    </ListGroup.Item>
                  </Link>
                </>
                <>
                  <Link style={{ textDecoration: "none" }} to="/staffresponse">
                    <ListGroup.Item className="d-flex ">
                      <Col md="1">
                        <AiOutlineAim style={{ color: "#ee9b00" }} />
                      </Col>
                      <Col>
                        <h4>Staff Response</h4>
                      </Col>
                    </ListGroup.Item>
                  </Link>
                </>
                <>
                  <Link style={{ textDecoration: "none" }} to="/appraisals">
                    <ListGroup.Item className="d-flex ">
                      <Col md="1">
                        <AiOutlineAim style={{ color: "#ee9b00" }} />
                      </Col>
                      <Col>
                        <h4>Appraisal Reports</h4>
                      </Col>
                    </ListGroup.Item>
                  </Link>
                </>
                <>
                  <Link style={{ textDecoration: "none" }} to="/trainings">
                    <ListGroup.Item className="d-flex ">
                      <Col md="1">
                        <AiOutlineAim style={{ color: "#ee9b00" }} />
                      </Col>
                      <Col>
                        <h4>Trainings</h4>
                      </Col>
                    </ListGroup.Item>
                  </Link>
                </>
              </Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </>
    </Row>
  );
};

export default LeftMenusGeneralUser;
