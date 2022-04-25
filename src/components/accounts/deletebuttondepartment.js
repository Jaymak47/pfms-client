import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon } from "semantic-ui-react";
import { LOAD_DEPARTMENTS } from "../../graphql/queries";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

function DeleteButton({ departmentId, callback, departmentname }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [deleteDepartment, { error }] = useMutation(DELETE_DEPARTMENT, {
    update(proxy) {
      const data = proxy.readQuery({ query: LOAD_DEPARTMENTS });

      data.getDepartments = data.getDepartments.filter(
        (a) => a.id !== departmentId
      );
      proxy.writeQuery({ query: LOAD_DEPARTMENTS, data });
      history.push("/departments");
      if (callback) callback();
    },
    variables: {
      departmentId,
    },
    onError(err) {
      if (err) {
        console.log(err);
        return error;
      }
    },
  });
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-top`}>Delete Department</Tooltip>}
      >
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setShow(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {departmentname} Department </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to delete Department</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteDepartment}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($departmentId: ID!) {
    deleteDepartment(departmentId: $departmentId)
  }
`;

export default DeleteButton;
