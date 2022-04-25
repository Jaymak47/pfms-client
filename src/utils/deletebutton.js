import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon } from "semantic-ui-react";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

function DeleteButton({
  itemId,
  item,
  itemName,
  callback,
  mutationName,
  query,
  getItems,
  urlLink,
}) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  getItems = "";
  const [deleteItem, { error }] = useMutation(mutationName, {
    update(proxy) {
      const data = proxy.readQuery({ query: query });

      data.getProjects = data.getProjects.filter((a) => a.id !== itemId);
      proxy.writeQuery({ query: query, data });
      history.push(urlLink);
      if (callback) callback();
    },
    variables: {
      itemId,
    },
    onError(err) {
      if (err) {
        console.log(err.networkError.result.errors);
        return error;
      }
    },
  });
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-top`}>Delete {item}</Tooltip>}
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
          <Modal.Title>
            Delete {itemName} {item}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to delete {item}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;
