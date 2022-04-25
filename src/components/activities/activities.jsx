import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/auth";
import _ from "lodash";
import {
  LOAD_PROJECTS,
  useProjects,
  LOAD_ACTIVITIES,
  useActivities,
} from "../../graphql/queries";
import { useDepartment } from "../../graphql/queries";
import { Row, Col, Modal, Button } from "react-bootstrap";
import ActivityTable from "./activityTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import LeftMenusGeneral from "../../components/leftmenusgeneral";
import AddActivities from "./addactivity";

export default function Activities() {
  const user = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [department, setDepartment] = useState({});
  const departmentId = user.user.department;
  const { data: departmentdata } = useDepartment(departmentId);
  const {
    error: projectError,
    loading: loadingProjects,
    data: projectdata,
  } = useProjects(user.department);

  //Load Data from the Server
  useEffect(() => {
    if (projectdata) {
      setProjects(projectdata.getProjects);
    }
  }, [projectdata]);

  useEffect(() => {
    if (departmentdata) {
      setDepartment(departmentdata.getDepartment);
    }
  }, [departmentdata]);

  const {
    error,
    data: activitiesdata,
    loading: loadingActivities,
  } = useActivities(user.user.department);

  useEffect(() => {
    if (activitiesdata) {
      setActivities(activitiesdata.getActivities);
    }
  }, [activitiesdata]);

  //Initialize Projects

  const [Addrecord, setAddRecord] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Initialize Sort Columns
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });

  //Initialize Sorted, Paginated Projects, PageSize,Current Page

  const [pageSize, setpageSize] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);

  ///getPaged Data Function

  function getPagedData() {
    const allActivities = activities;

    let filtered = allActivities;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedActivities = paginate(sorted, currentPage, pageSize);

    return {
      sorted,
      totalCount: filtered.length,
      aActivities: paginatedActivities,
    };
  }
  const { totalCount, aActivities } = getPagedData();

  const handleSort = (sortColumn) => {
    setsortColumn(sortColumn);
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setpageSize(10);
    setcurrentPage(page);
  };

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral />
          </Col>
          <Col md="9" className="mt-2">
            <div className="sectiondescription">
              <Row className="m-3">
                <h2>
                  {department.departmentname} {""} Department Activities
                </h2>
                <h5 className="tabcontentdisplay">
                  A secure, just and prosperous County, where people achieve
                  their full potential and enjoy a high quality of life.
                </h5>
              </Row>
            </div>
            <Row className="m-3">
              <Col></Col>
              <Col md="2">
                <Modal
                  size="lg"
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  dialogClassName="modal-90w"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Activity</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <AddActivities
                      setAddRecord={setAddRecord}
                      Addrecord={Addrecord}
                      handleClose={handleClose}
                      projects={projects}
                    />
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            <Row className="m-1">
              <h4>
                {totalCount === 0
                  ? "No Activities in the Database"
                  : `Showing ${totalCount} Activities in the database.`}
              </h4>
              <Col></Col>
              <Col md="2">
                <Button onClick={handleShow} variant="success" className="mx-2">
                  Add Activity
                </Button>
              </Col>

              <ActivityTable
                error={error}
                activities={aActivities}
                onSort={handleSort}
                sortColumn={sortColumn}
                count={activities.length}
                input="Add New"
                loading={loadingActivities}
                name="Activities"
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
}
