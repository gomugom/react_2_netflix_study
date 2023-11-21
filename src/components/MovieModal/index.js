import React, { useRef } from 'react'
import "./movieModal.css"

export default function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) {
    
    // document.getElementById처럼 React에서 DOM을 가져올 때 사용
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        setModalOpen(false);
    });

  return (
    <div className='presentation'>
        <div className='wrapper-modal'>
            <div className='modal' ref={ref}>
                <span onClick={() => setModalOpen(false)} className='modal-close'>
                    x
                </span>
                <img
                    className='modal_poster-img'
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt='modal_poster-img' 
                />

                <div className='modal_content'>
                    <p className='modal_details'>
                        <span className='modal_user_perc'>
                            100% for you
                        </span>
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className='modal_title'>
                        {title ? title : name}
                    </h2>
                    <p className='modal_overview'>
                        평점: {vote_average}
                    </p>
                    <p className='modal_overview'>
                        {overview ? overview : ''}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
