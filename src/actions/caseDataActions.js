import axios from 'axios';
import { FETCH_DATA, FILTER_COUNTRIES } from '../actions/types';

let axiosConfig = {
    headers: {'Access-Control-Allow-Origin': '*'}
}

export const fetchData = () => dispatch =>{
    // console.log('fetchData called');
    axios.get('http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result',axiosConfig)
    .then(response=>{  
        console.log('response',response.data);
        dispatch({type:FETCH_DATA, payload: response.data})
    })
    .catch(
        error => console.error(error)
    );
}


export const filterCountries = (country,enabled) => dispatch => {

    dispatch({type:FILTER_COUNTRIES, payload:{country, enabled} })
    
}
