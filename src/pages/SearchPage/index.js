import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosUtil from '../../api/axios';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebouncd';

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const useQuery = () => {
        // useLocation().search => ?q=value
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q"); // value

    const debounceValue = useDebounce(searchTerm, 500);

    useEffect(() => {
        if(debounceValue) {
            fetchSearchMovie(debounceValue);
        }        
    }, [debounceValue]); // searchTerm이 바낄때마다 호출해야함으로

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axiosUtil.get(`/search/multi?include_adult=false&query=${searchTerm}`)
            setSearchResults(request.data.results);
        } catch(error) {

        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {
                    searchResults.map((movie) => {
                        if(movie.backdrop_path !== null && movie.media_type !== 'person') {
                            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                            return(
                                <div className='movie' key={movie.id}>
                                    <div onClick={() => navigate(`/${movie.id}`)} className='movie_column-poster'>
                                        <img 
                                            src={movieImageUrl}
                                            alt="movie image"
                                            className='movie_poster'
                                        />
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results_text'>
                    <p>
                        찾고자하는 검색어 "{debounceValue}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    }

  return renderSearchResults();
}
