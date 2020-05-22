import { FETCH_DATA, FILTER_COUNTRIES, FILTER_BY_DATE } from '../actions/types';

const initialState = {
    allData: [

    ],
    graphData:[

    ],
    allCountries:[

    ],
    mostAffectedCountry:'',
    mostAffectedCountryGraphData:[

    ]
}

function mapDataToLineGraphData(data){
    return data.map((entry)=>{
        return {
            id: entry.country,
            data: entry.records.map(record=>{
                return { x: record.day, y:record.new, day:record.day}
            })
        }
    })
}

function filterGraphDataByDate(data){
    let graphData = mapDataToLineGraphData(data);
    return graphData.map((entry)=>{
        let filteredEntries = entry.data.filter((record)=>{
            return record.day >=start && record.day <= end   
        });
        return {
            id: entry.id,
            data:[
                ...filteredEntries
            ]
        }   

    });
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


        countryData = {
            id: countryData.country,
            data: countryData.records.map(record=>{
                return { x: record.day, y:record.new, day:record.day}
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

    case FILTER_BY_DATE:
        let{start,end} = action.payload;

        start = parseInt(start)
        end = parseInt(end)
        console.log('filter by date called in reducer');
        console.log(start, end)

        let filteredGraphData = state.graphData.map((entry)=>{
            let filteredEntries = entry.data.filter((record)=>{
                return record.day >=start && record.day <= end   
            });
            return {
                id: entry.id,
                data:[
                    ...filteredEntries
                ]
            }   

        });
        console.log('filtered data', filteredGraphData);


        return {
            ...state,
            graphData:filteredGraphData
        }

    default:
        return state
    }
}
