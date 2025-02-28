import React from 'react'

function Modal({open,onClose}) {
  return (
    <div onClick={onClose} className={`fixed  inset-0 flex justify-center items-center 
    transition-colors ${open? "visible bg-black/20" : "invisible"}`}
    >
        <div onClick={(e)=> e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 
            transition-all ${open? "scale-100 opacity-100":"scale-125 opacity-0"}
            `}>
                <div className='w-56 h-56 text-center'>
                    Msg1
            
                </div>
            {/* {children} */}
        </div>
        </div>
  )
}

export default Modal