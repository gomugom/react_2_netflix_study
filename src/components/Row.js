import React, { useEffect, useState } from 'react'
import axiosUtil from '../api/axios';
import '../components/css/Row.css';
import MovieModal from './MovieModal';
export default function Row({title,id,fetchUrl,isLargeRow}) {
  
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    // mount 직후 호출
    useEffect(() => {
        fetchMovieData();
        // unmount할게 없음으로 return구현 x
    }, []);

    const fetchMovieData = async () => {
        const request = await axiosUtil.get(fetchUrl);
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    return (
    <section className='row'>
        <h2>{title}</h2>
        <div className='slider'>
            <div className='slider_arrow-left'>
                <span className='arrow' onClick={() => {
                    document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                }}>
                    {"<"}
                </span>
            </div>
            <div id={id} className='row_posters'>
                {movies.map(movie => {
                    <img key={movie.id}
                         className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                         src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}     
                         alt={movie.name}
                         onClick={() => handleClick(movie)}
                    />
                })}
            </div>
            <div className='slider_arrow-right' onClick={() => {
                document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}>
                <span className='arrow'>
                    {">"}
                </span>
            </div>
        </div>

        {
            modalOpen ?? (
                <MovieModal setModalOpen = {setModalOpen} {...movieSelected} />
            )
        }
    </section>
  )
}
