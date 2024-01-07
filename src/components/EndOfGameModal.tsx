import { Button, Modal, ModalBody } from "react-bootstrap";

export interface IModal {
  show: boolean;
  message: string;
  handleRestart: () => void;
}
const EndOfGameModal = ({ message, show, handleRestart }: IModal) => {
  return (
    <Modal show={show} centered>
      <ModalBody className="p-4">
        <h1 className="text-info text-center">{message}</h1>
      </ModalBody>
      <Button
        size="lg"
        className="btn-secondary text-light rounded-0 "
        onClick={handleRestart}
      >
        Restart
      </Button>
    </Modal>
  );
};

export default EndOfGameModal;
