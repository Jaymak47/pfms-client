import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFormat from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import TableFooter from "./tableFooter";

const Table = ({ columns, sortColumn, onSort, data, count, name }) => {
  return (
    <>
      <Row className="m-3">
        <TableFormat striped bordered hover>
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={data} />
        </TableFormat>
        <TableFooter count={count} name={name} />
      </Row>
    </>
  );
};

export default Table;
