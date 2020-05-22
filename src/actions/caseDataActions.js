import axios from 'axios';
import { FETCH_DATA, FILTER_COUNTRIES, FILTER_BY_DATE } from '../actions/types';

let axiosConfig = {
    headers: {'Access-Control-Allow-Origin': '*'}
}

export const fetchData = () => dispatch =>{
    axios.get('http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result',axiosConfig)
    .then(response=>{  
        dispatch({type:FETCH_DATA, payload: response.data})
    })
    .catch(
        error => console.error(error)
    );
}


export const filterCountries = (country,enabled) => dispatch => {

    dispatch({type:FILTER_COUNTRIES, payload:{country, enabled} })
    
}

export const filterByDate = (start, end)=>dispatch => {
    dispatch({type: FILTER_BY_DATE, payload: {start,end}});
}
