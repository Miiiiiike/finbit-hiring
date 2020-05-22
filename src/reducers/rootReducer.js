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

function filterGraphDataByDate(data, start, end){
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


function getMostAffectedCountry(data){
    // let graphData = mapDataToLineGraphData(data);
    let graphData = data;

    var numberOfInfectionsToCountriesMap = {};

    graphData.forEach((entry)=>{
        // console.log('reduced value', );

        let reducedValue = entry.data.reduce((sum,current,i)=> {
            return {y: sum.y + parseInt(current.y)}
        })['y'];

        console.log('reducedvalue', reducedValue);

        numberOfInfectionsToCountriesMap =  {
            ...numberOfInfectionsToCountriesMap,
            [reducedValue]: entry.id
            //infections: country name
        };

        

        // numberOfInfectionsToCountriesMap[]

    })

    console.log('numberOfInfectionToCountriesMap');
    console.log(numberOfInfectionsToCountriesMap);

    let maxNumberOfInfections = Math.max(
        ...Object.keys(numberOfInfectionsToCountriesMap).map((val) => parseInt(val))
    )
    console.log('keys' , Object.keys(numberOfInfectionsToCountriesMap));
    
    let mostInfectedCountry = {
        country: numberOfInfectionsToCountriesMap[maxNumberOfInfections],
        infections: maxNumberOfInfections
    };
    console.log('mostInfectedCountry', mostInfectedCountry);

    return mostInfectedCountry;

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
        // console.log('filter by date called in reducer');
        // console.log(start, end)

        // let filteredGraphData = state.graphData.map((entry)=>{
            // let filteredEntries = entry.data.filter((record)=>{
                // return record.day >=start && record.day <= end   
            // });
            // return {
                // id: entry.id,
                // data:[
                    // ...filteredEntries
                // ]
            // }   

        // });

        // console.log('filtered data', filteredGraphData);

        

        return {
            ...state,
            graphData: filterGraphDataByDate(state.allData, start,end),
            mostAffectedCountry: getMostAffectedCountry(filterGraphDataByDate(state.allData, start,end))
        }

    default:
        return state
    }
}
