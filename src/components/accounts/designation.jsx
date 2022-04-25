import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { LOAD_DESIGNATIONS } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { ADD_DESIGNATION } from "../../graphql/mutations";

import {
  Col,
  Row,
  Button,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import LeftMenusGeneral from "../../components/leftmenusgeneral";
import DesignationTable from "./designationtable";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import { useForm } from "../../utils/hooks";

const Designation = () => {
  const user = useContext(AuthContext);
  const { data: designationsdata } = useQuery(LOAD_DESIGNATIONS);
  const [designations, setDesignations] = useState([]);
  const [Addrecord, setAddRecord] = useState("");

  const { onChange, onSubmit, values, validated } = useForm(
    createDesignationCallback,
    {
      designationno: "",
      designationname: "",
      designationdescription: "",
    }
  );

  const [createDesignation, { error }] = useMutation(ADD_DESIGNATION, {
    variables: values,
    update(proxy, result) {
      setAddRecord(
        `A new Designation: ${values.designationname} successfully added to the System `
      );
      const data = proxy.readQuery({
        query: LOAD_DESIGNATIONS,
      });
      data.getDesignations = [
        result.data.createDesignation,
        ...data.getDesignations,
      ];
      proxy.writeQuery({ query: LOAD_DESIGNATIONS, data });
      values.designationno = "";
      values.designationname = "";
      values.designationdescription = "";
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });

  function createDesignationCallback() {
    createDesignation();
  }
  //Initialize Sort Columns
  const [sortColumn, setsortColumn] = useState({
    path: "",
    order: "",
  });

  //Initialize Sorted, Paginated Projects, PageSize,Current Page

  const [pageSize, setpageSize] = useState(50);
  const [currentPage, setcurrentPage] = useState(1);
  //Load Data from the Server
  useEffect(() => {
    if (designationsdata) {
      setDesignations(designationsdata.getDesignations);
      setpageSize(50);
    }
  }, [designationsdata]);

  //handle filtered Data
  function getPagedData() {
    const allDesignations = designations;

    let filtered = allDesignations;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedDesignations = paginate(sorted, currentPage, pageSize);

    return {
      sorted,
      totalCount: filtered.length,
      aDesignations: paginatedDesignations,
    };
  }
  const { totalCount, aDesignations } = getPagedData();

  const handleSort = (sortColumn) => {
    setsortColumn(sortColumn);
  };

  //Handle Paginate
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const { designationno, designationname, designationdescription } = values;

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9">
            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Row className="m-5">
                <h2>Designation Details</h2>

                <div className="sectiondescription">
                  <h6 className="leading">
                    Add a <strong> Designation</strong> to the System
                  </h6>
                </div>
              </Row>
              <Row className="m-3">
                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Designation No</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupdesignationno"
                      type="text"
                      placeholder="Designation No"
                      name="designationno"
                      value={designationno}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <InputGroup>
                    <InputGroup.Text>Designation Name</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupDesignationname"
                      type="text"
                      placeholder="Designation Name"
                      name="designationname"
                      value={designationname}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="m-3">
                <hr></hr>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>Designation Description</InputGroup.Text>
                    <FormControl
                      required
                      id="inlineFormInputGroupdesignationdescription"
                      type="text"
                      placeholder="Enter Designation Description Here"
                      name="designationdescription"
                      as="textarea"
                      rows={3}
                      value={designationdescription}
                      onChange={onChange}
                    />
                    <Button type="submit" variant="success">
                      Add Designation
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="m-3">
                <h4>
                  {totalCount === 0
                    ? "No Designations in the Database"
                    : `Showing ${totalCount} Designations in the database.`}
                </h4>
                <DesignationTable
                  designations={aDesignations}
                  onSort={handleSort}
                  sortColumn={sortColumn}
                  count={designations.length}
                  input="TestKenya"
                  name="Designations"
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
              <div className={Addrecord ? "ui success message" : null}>
                {Addrecord ? Addrecord : null}
              </div>
            </Form>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Designation;
