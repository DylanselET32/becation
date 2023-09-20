import { useState, useCallback } from 'react';

function useConfirmation() {
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleShowModal = useCallback((action) => {
    setConfirmAction(() => action);
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setConfirmAction(null); // Resetear la acción confirmada al cerrar el modal
  }

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    handleCloseModal();
  }

  return {
    showModal,
    handleShowModal,
    handleCloseModal,
    handleConfirm
  };
}

export default useConfirmation;
