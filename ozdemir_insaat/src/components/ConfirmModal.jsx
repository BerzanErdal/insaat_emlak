import './ConfirmModal.css';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Evet, Sil
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
