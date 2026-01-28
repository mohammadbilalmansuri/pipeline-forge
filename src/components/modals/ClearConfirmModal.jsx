import { useClearPipeline } from "@/stores";
import { Button } from "../ui";
import Modal from "./Modal";

const ClearConfirmModal = ({ isOpen, onClose }) => {
  const clearPipeline = useClearPipeline();

  const handleConfirm = () => {
    clearPipeline();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clear Pipeline"
      className="flex flex-col gap-5 items-center text-center"
    >
      <p className="text-gray-900 font-medium text-lg">
        Are you sure you want to clear the pipeline?
      </p>

      <p className="text-gray-500 text-sm -mt-2.5 max-w-[90%]">
        This action will remove all nodes and connections. This cannot be
        undone.
      </p>

      <Button variant="primary" onClick={handleConfirm}>
        Clear Pipeline
      </Button>
    </Modal>
  );
};

export default ClearConfirmModal;
