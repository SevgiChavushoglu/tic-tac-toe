import { Button, Modal, ModalBody } from "react-bootstrap";

export interface IModal {
  show: boolean;
  message: string;
}
const EndOfGameModal = ({ message, show }: IModal) => {
  return (
    <Modal show={show} centered>
      <ModalBody className="p-4">
        <h1 className="text-info text-center">{message}</h1>
      </ModalBody>
      {/* <Modal.Footer> */}
      <Button size="lg" className="btn-secondary text-light rounded-0 ">
        Restart
      </Button>
      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default EndOfGameModal;
