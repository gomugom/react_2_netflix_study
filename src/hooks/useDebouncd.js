import React, { useEffect } from 'react'

/*
    입력시마다 계속 영화를 검색하게 되면 여러명이 사용하게 될 때 부하가 서버에 많이 걸릴 수 있다.
    따라서, 일정시간을 딜레이시켜 사용자의 타이핑이 어느정도 끝날 때까지 딜레이시켜줄 필요가 있다.
    => 이를 debounce라고한다.
*/ 
export const useDebounce = (value, delay) => {
  
    const [debounceValue, setDebounceValue] = useState(value);
  
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(debounceValue); // delay시간이후 값을 세팅
        }, delay);    

        return () => { // delay전에 또다른 useDebounce가 호출될 수 있음으로 자원해지가 필요하다.
            clearTimeout(handler);
        }
    }, [value, delay]);
    
    return debounceValue;

}
