import axios from 'axios';

const axiosUtil = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: "9bc86950b7f7af6757bcbba2c6db0268",
        language: "ko-KR"
    }
});

export default axiosUtil;

