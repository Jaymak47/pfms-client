import React, { useEffect, useState, useContext } from "react";
import { useUsers } from "../../graphql/queries";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import LeftMenusGeneral from "../leftmenusgeneral";
import Pagination from "../../common/pagination";
import { useDepartment } from "../../graphql/queries";
import JointreviewUsersTable from "./jointreviewuserstable";

export default function SupervisorjointreviewAppraisee() {
  const user = useContext(AuthContext);

  const {
    error,
    loading: loadingUsers,
    data: usersdata,
  } = useUsers(user.user.department);

  const departmentId = user.user.department;

  const [users, setUsers] = useState([]);
  const { data: departmentdata } = useDepartment(departmentId);
  const [department, setDepartment] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(100);

  //Initialize Sort Columns
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });

  //Load Data from the Server
  useEffect(() => {
    if (usersdata) {
      setUsers(usersdata.getUsers);
    }
  }, [usersdata]);
  ///getPaged  Data Function

  useEffect(() => {
    if (departmentdata) {
      setDepartment(departmentdata.getDepartment);
    }
  }, [departmentdata]);

  function getPagedData() {
    try {
      const allUsers = users;
      let filtered = allUsers;
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      const paginatedUsers = paginate(sorted, currentPage, pageSize);
      return {
        totalCount: filtered.length,
        pUsers: paginatedUsers,
      };
    } catch (error) {
      console.log(error);
    }
  }
  const { totalCount, pUsers } = getPagedData();

  const handleSort = (sortColumn) => {
    try {
      setsortColumn(sortColumn);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setpageSize(100);
    setcurrentPage(page);
    console.log(page);
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
            <Row className="m-3">
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
                        County Public Service. Officers in Jog Group ‘H’ and
                        below will complete a separate appraisal report.
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
              <h2>
                Appraisees{""} {department.departmentname} Department
              </h2>
              Search Bar
            </Row>

            <Row className="m-3">
              <h4>
                Showing {pUsers.length} Users {"Page:=>"} {currentPage}
                {" -----"}
                Total {users.length} in the database.
              </h4>
              <h4>Select a user below to appraise</h4>
              <Row>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Row>
              <JointreviewUsersTable
                users={pUsers}
                loading={loadingUsers}
                onSort={handleSort}
                sortColumn={sortColumn}
                count={users.length}
                input="Input"
                name="Users"
                error={error}
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
