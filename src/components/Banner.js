import React, { useEffect, useMemo, useState } from 'react'
import requests from '../api/request';
import axiosUtil from '../api/axios';
import './css/Banner.css';
import styled from 'styled-components';

export default function Banner() {
    
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    // mount될 때 최초 한번만 실행되도록(return은 딱히 필요없음으로 void)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const results = await axiosUtil.get(requests.fetchNowPlaying);
       
        const {id: movieId} = results.data.results[Math.floor(Math.random() * results.data.results.length)];
        
        const {data: movieDetail} = await axiosUtil.get(`movie/${movieId}`, {params: {append_to_response: "videos"}});
        
        console.log(movieDetail);
        setMovie(movieDetail);
    }

    const truncate = (str, n) => {
        return str.length > n ? str.substr(0, n-1) + "..." : str;
    };

    if(!isClicked) {
        return (
            <header className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover"}
                }
            >
                <div className='banner_contents'>
                    {/* <!-- && 가 true였으면 || 는 false의미 --> */}
                    <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>    
                
                    <div className='banner_buttons'>
                        <button className='banner_button play'
                            onClick={() => setIsClicked(true)}>Play</button>
                        <button className='banner_button info'>More Information</button>
                    </div>
                </div>
        
                <h1 className='banner_description'>
                    {/* {truncate(movie.overview, 100)} */}
                    {movie.overview}
                </h1>
        
                <div className='banner_fadeBottom'>
        
                </div>
            </header>
        );
    } else {
        return (
            <>
                <Container>
                    <HomeContainer>
                        <Iframe
                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                            width="640"
                            height="360"
                            frameborder="0"
                            allow="autoplay; fullscreen"
                            title="YouTube video player"
                        >
                        </Iframe>
                    </HomeContainer>
                
                </Container>
            </>
            
        );
    }

}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`