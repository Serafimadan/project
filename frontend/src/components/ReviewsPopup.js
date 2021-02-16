import React from "react";
import { Modal, Button } from "react-bootstrap";

function ReviewsPopup(props) {
  return (
    <Modal
      dialogClassName='modal-0w'
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className='review-popup'>
        <p>Review submitted</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHideReview}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ReviewsPopup;
