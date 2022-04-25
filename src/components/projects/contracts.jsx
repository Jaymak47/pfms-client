import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  LOAD_PROJECTS,
  LOAD_USERS,
  LOAD_DEPARTMENTS,
} from "../../graphql/queries";

import _ from "lodash";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import LeftMenusGeneral from "../leftmenusgeneral";
import { paginate } from "../../utils/paginate";
import Pagination from "../../common/pagination";
import ProjectTable from "./projectTable";
import AddProjects from "./addproject";
import { AuthContext } from "../../context/auth";

function PerformanceContracts() {
  const { user } = useContext(AuthContext);
  const {
    loading: loadingProjects,
    data: projectdata,
    error,
  } = useQuery(LOAD_PROJECTS);
  const { loading: loadingUsers, data: usersdata } = useQuery(LOAD_USERS);

  const { loading: loadingDepartments, data: departmentsdata } =
    useQuery(LOAD_DEPARTMENTS);
  const [errors, setErrors] = useState({});
  const [netErrors, setNetErrors] = useState("");
  const [Addrecord, setAddRecord] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });
  const [pageSize, setpageSize] = useState(100);
  const [currentPage, setcurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get Data From Server
  useEffect(() => {
    if (projectdata) {
      setProjects(projectdata.getProjects);
    }
  }, [projectdata]);

  const { id: projectId, projectname: currProjectname } = projects;

  useEffect(() => {
    if (usersdata) {
      setUsers(usersdata.getUsers);
    }
  }, [usersdata]);
  useEffect(() => {
    if (departmentsdata) {
      setDepartments(departmentsdata.getDepartments);
    }
  }, [departmentsdata]);

  ///getPaged Data Function

  function getPagedData() {
    const allProjects = projects;

    let filtered = allProjects;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedProjects = paginate(sorted, currentPage, pageSize);

    return {
      sorted,
      totalCount: filtered.length,
      aProjects: paginatedProjects,
    };
  }
  const { totalCount, aProjects } = getPagedData();

  const handleSort = (sortColumn) => {
    setsortColumn(sortColumn);
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9" className="mt-2">
            <div className="sectiondescription">
              <Row className="m-3">
                <h2>County Performance Contracts</h2>
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
                    <Modal.Title>Add Project</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    {user && (
                      <AddProjects
                        Addrecord={Addrecord}
                        setAddRecord={setAddRecord}
                        departments={departments}
                        handleClose={handleClose}
                      />
                    )}
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            <Row className="m-1">
              <h4>
                {totalCount === 0
                  ? "No Projects in the Database"
                  : `Showing ${totalCount} Projects in the database.`}
              </h4>
              <Col></Col>
              <Col md="2">
                <Button onClick={handleShow} variant="success" className="mx-2">
                  Add Project
                </Button>
              </Col>

              <ProjectTable
                error={error}
                projects={aProjects}
                onSort={handleSort}
                sortColumn={sortColumn}
                count={projects.length}
                input="Input"
                loading={loadingProjects}
                name="Projects"
                projectId={projectId}
                currProjectname={currProjectname}
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

export default PerformanceContracts;
