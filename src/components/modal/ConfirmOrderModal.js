import Modal from "@material-ui/core/Modal";
import { useState } from "react";

export default function ConfirmOrderModal() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const body = (
    <div>
      <h2 id="simple-modal-title">Order Confirmation</h2>
      <p id="simple-modal-description">Confirm Order Completition?</p>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
