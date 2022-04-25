import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon } from "semantic-ui-react";
import { LOAD_ACTIVITIES } from "../../graphql/queries";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

function DeleteButton({ activityId, callback }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [deleteActivity, { error }] = useMutation(DELETE_ACTIVITY, {
    update(proxy) {
      const data = proxy.readQuery({ query: LOAD_ACTIVITIES });

      data.getActivities = data.getActivities.filter(
        (a) => a.id !== activityId
      );
      proxy.writeQuery({ query: LOAD_ACTIVITIES, data });
      history.push("/activities");
      if (callback) callback();
    },
    variables: {
      activityId,
    },
    onError(err) {
      if (err) {
        return error;
      }
    },
  });
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-top`}>Delete Activity</Tooltip>}
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
          <Modal.Title>Delete Activity {activityId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to delete Activity</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteActivity}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const DELETE_ACTIVITY = gql`
  mutation deleteActivity($activityId: ID!) {
    deleteActivity(activityId: $activityId)
  }
`;

export default DeleteButton;
