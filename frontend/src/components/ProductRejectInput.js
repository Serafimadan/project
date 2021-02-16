import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { rejectProduct } from "../actions/productActions";

const ProductRejectInput = ({
  product,
  notifications,
  toggle,
  setToggle,
  useDispatch,
}) => {
  const [feedback, setFeedback] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const notificationId = notifications.filter(
      (not) => not.product === product._id
    );
    //notificationId[0]; to remove this notification from other experts
    dispatch(rejectProduct(product._id, notificationId[0]._id, feedback));
    setToggle(false);
  };
  return (
    <Modal show={toggle} onHide={() => setToggle(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Why are you rejecting this Art?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="reject">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="reject"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
          ></Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="text-left">
        <Button
          type="submit"
          variant="danger"
          disabled={feedback.trim() === "" ? true : false}
          onClick={(e) => submitHandler(e)}
        >
          Reject Art
        </Button>
        <Button variant="primary" onClick={() => setToggle(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductRejectInput;
