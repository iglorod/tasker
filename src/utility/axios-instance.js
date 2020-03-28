import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://immense-lake-83365.herokuapp.com/'
});

export default instance;
