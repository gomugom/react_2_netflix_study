import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosUtil from '../../api/axios';

export default function DetailPage() {
  
    const {movieId} = useParams(); // /:movieId 로 전달한 값을 useParams를 통해 가져올 수 있다.
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request = await axiosUtil.get(`/movie/${movieId}`);
            setMovie(request.data);
        }
        fetchData();
    }, [movieId])

    if(!movie) return <div>...loading</div>;

    return <section>
        <img 
            className='modal-poster-img'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="poster"
        />
    </section>

}
