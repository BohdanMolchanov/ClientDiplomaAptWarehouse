import { Button, Col, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { WarehouseService } from "../Services/WarehouseService";
import { AdminService } from "../Services/AdminService";
import { Redirect } from "react-router";

function ConfirmOrganizationModal(props) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const approve = () => {
    handleClose();
    props.confirmHandler();
  };
  return (
    <>
      <a href="#" className="text-primary" onClick={handleShow}>
        Підтвердити
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Конфірмація організації</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ви підтверджуєте реєстрацію організації {props.name} з ЄДРПОУ {props.edrpou}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Ні
          </Button>
          <Button variant="success" onClick={approve}>
            Так
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmOrganizationModal;
