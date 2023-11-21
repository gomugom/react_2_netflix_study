import React, { useEffect, useState } from 'react';
import './css/Nav.css';
import { useNavigate } from 'react-router-dom';

export const Nav = React.memo(() => {

    /*
        [ useEffect ]
        : class에서 componentDidMount, componentUpdate, componentWillUnMount 등의 기능을 Hooks에서 구현할 수 있도록 해준다.

        useEffect(function, [의존성변수1, 변수2,...])
        - 최초 mount시 function이 수행되며 배열에 있는 의존성이 변경되 rerendering될 때 function이 수행된다.
        - function return 부분은 component가 unmount될 때 호출됨(return부분에 자원 해제 등의 작업)

        -> 빈 배열을 넘겨주면 => 최초 component mount시에만 호출됨
        -> 배열을 생략 => component rerendering시마다 호출됨
        -> 의존성변수 전달 => 의존성변수가 변경되어 rerendering될때마다 function 호출
    */

    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // component가 mount될 때 event가 등록되고 unmount될 때 event 해제되면 됨
    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => { // unmount때 호출될 것을 등록해주면 됨
            window.removeEventListener("scroll", () => {});
        }
    }, []); // mount, unmount시에만 동작하면 됨

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }
    

  return (
    <nav className={`nav ${show && "nav_black"}`}>
        <img 
            alt='Netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
            className='nav_logo'
            onClick = {() => window.location.reload()}
        />

        <input value={searchValue} onChange={handleChange} className='nav_input' type="text" placeholder='검색어를 입력하세요.' />

        <img 
            alt="User logged"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
            className='nav_avatar'
        />
    </nav>
  )
});
