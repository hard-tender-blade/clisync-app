import React from 'react'

export default function ModalContainer() {
    return (
        <div id="modal-container" className="">
            {/* Modal goes here */}
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <h3 id="modal-title" className="text-lg font-bold"></h3>
                    <p id="modal-content" className="py-4"></p>

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button id="modal-confirm" className="btn"></button>
                        {/* if there is a button in form, it will close the modal */}
                        <button id="modal-cancel" className="btn"></button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
