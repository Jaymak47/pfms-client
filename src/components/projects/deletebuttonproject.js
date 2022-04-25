import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon } from "semantic-ui-react";
import { LOAD_PROJECTS } from "../../graphql/queries";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { DELETE_PROJECT } from "../../graphql/deletemutation";

function DeleteButton({ projectId, callback, projectname }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [deleteProject, { error }] = useMutation(DELETE_PROJECT, {
    update(proxy) {
      const data = proxy.readQuery({ query: LOAD_PROJECTS });

      data.getProjects = data.getProjects.filter((a) => a.id !== projectId);
      proxy.writeQuery({ query: LOAD_PROJECTS, data });
      history.push("/projects");
      if (callback) callback();
    },
    variables: {
      projectId,
    },
    onError(err) {
      if (err) {
        console.log(err.graphQLErrors[0].message);
        return error;
      }
    },
  });
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-top`}>Delete Project</Tooltip>}
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
          <Modal.Title>Delete {projectname} Project </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to delete Project</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteProject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;
