import { forwardRef, useImperativeHandle,useRef } from "react";
import { createPortal } from "react-dom"
import Button from './button.jsx';

const Modal = forwardRef( function Modal({children,buttonCaption},ref){
    const dialog = useRef();
    useImperativeHandle(ref,()=>{
        return {
            open(){
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" ref={dialog}>
            <form method="dialog" className="mt-4 text-right" >
                <Button>{buttonCaption}</Button>
            </form>
            {children}
        </dialog>,
        document.getElementById('modal-root')
    ); 
});
export default Modal;