import React, { useEffect, useState, useContext } from "react";
import { LOAD_USERS, useUsers } from "../../graphql/queries";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import LeftMenusGeneral from "../leftmenusgeneral";
import UsersTable from "./userstable";
import Pagination from "../../common/pagination";

export default function Employees() {
  const user = useContext(AuthContext);

  const {
    error,
    loading: loadingUsers,
    data: usersdata,
  } = useUsers(user.user.department);

  const [users, setUsers] = useState([]);
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
              <h2>
                County Staff Database
                Departments/Directorates/Divisions/Sections/Units{" "}
              </h2>
              Search Bar
            </Row>

            <Row className="m-3">
              <h4>
                Showing {pUsers.length} Users {"Page:=>"} {currentPage}
                {" -----"}
                Total {users.length} in the database.
              </h4>
              <Row className="m-3">
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Row>
              <UsersTable
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
