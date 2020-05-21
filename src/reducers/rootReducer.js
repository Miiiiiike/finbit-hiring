import { FETCH_DATA, FILTER_COUNTRIES } from '../actions/types';

const initialState = {
    allData: [

    ],
    graphData:[

    ],
    allCountries:[

    ]
}

export default (state = initialState, action) => {
    switch (action.type) {

    case FETCH_DATA:
        console.log('reducer called', action.payload)

        return { 
            ...state, 
            allData : action.payload,
            graphData: [],
            
            allCountries: action.payload.map((entry)=>{
                return entry.country
            })
        }
    
    case FILTER_COUNTRIES:
        console.log('state',state);
        
        let entry = action.payload
        console.log('entry', entry)

        console.log('alldata', state.allData);
        let countryData = state.allData.find((e)=> e.country === entry.country)
        console.log('countryData',countryData);


        // action.payload.map((entry)=>{
            //     return {
            //         id:entry.country,
            //         data: entry.records.map(record=>{
            //                 return {
            //                     x: record.day,
            //                     y: record.new
            //                 }
            //             }),
            //         enabled:true
            //     }
            // }),
        countryData = {
            id: countryData.country,
            data: countryData.records.map(record=>{
                return { x: record.day, y:record.new}
            })
        }
        
        
        if(!entry.enabled){
                return {
                    ...state,
                    graphData: state.graphData.filter((data)=> data.id !== entry.country)
                }
        }else{
            return{
                ...state,
                graphData: [
                    ...state.graphData,
                    countryData
                ]
            }
        }


    default:
        return state
    }
}
