import { Button, Col, Form, Modal } from "react-bootstrap";
import {useState} from "react";
import { WarehouseService } from "../Services/WarehouseService";

function ConfirmBatchModal(props) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const approve = () => {
    WarehouseService.ConfirmBatch(props.id);
    handleClose();
    
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
          <Button variant="secondary" onClick={handleClose}>
            Скасувати
          </Button>
          <Button variant="primary" onClick={approve}>
            Підтвердити отримання
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmBatchModal;
