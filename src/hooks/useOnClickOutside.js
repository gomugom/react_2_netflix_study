import React, { useEffect } from 'react'

// Custom Hooks
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {

        // 창 외부를 클릭했는지 유무
        if(!ref.current || ref.current.contains(event.target)) {
            return; // 내부 클릭시 그냥 return
        } else {
            handler(); // setModalOpen(false) 창 닫기 실행
        }

    };
    
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchStart", listener);
    
    return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchStart", listener);
    }
  }, []);
}
