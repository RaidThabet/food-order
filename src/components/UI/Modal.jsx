import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({open, onClose, children}) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
    
        if (open) {
          modal.showModal();
        }
    
        else {
          modal.close();
        }
      }, [open]);

    return createPortal(
      <dialog ref={dialog} className="modal flex items-center justify-center max-sm:px-3 bg-black bg-opacity-50" onClose={onClose}>
        <div className="modal-box max-w-full w-auto max-h-full h-auto bg-stone-300  ">
          {children}
        </div>
      </dialog>,
      document.getElementById("modal")
    );
}