import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({open, onClose, children}) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
    
        if (open) {
          modal.showModal();
        }
    
        return () => {
          modal.close();
        }
      }, [open]);

    return createPortal(
      <dialog ref={dialog} className="modal flex items-center justify-center bg-black bg-opacity-50" onClose={onClose}>
        <div className="modal-box max-w-full w-auto bg-amber-500  ">
          {children}
        </div>
      </dialog>,
      document.getElementById("modal")
    );
}