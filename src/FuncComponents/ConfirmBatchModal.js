import { Button, Col, Form, Modal } from "react-bootstrap";
import {useState, useEffect} from "react";
import { WarehouseService } from "../Services/WarehouseService";
import { Redirect } from "react-router";

function ConfirmBatchModal(props) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const approve = () => {
    handleClose();
    props.confirmHandler();
}
  return (
    <>
      <a href="#" className="text-primary" onClick={handleShow}>
      Підтвердити отримання 
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Підтверджуєте отримання запасів {props.name} у кількості {props.count} шт.?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Скасувати
          </Button>
          <Button variant="success" onClick={approve}>
            Підтвердити отримання
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmBatchModal;
