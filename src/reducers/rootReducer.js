import { FETCH_DATA, FILTER_COUNTRIES, FILTER_BY_DATE } from '../actions/types';



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

function filterGraphDataByDate(data, start, end, enabledCountries){
    let graphData = mapDataToLineGraphData(data);

    return graphData.map((entry)=>{
        return filterCountryDataByDate(entry, start, end);

    });
}


function filterCountryDataByDate(entry, start, end){
    let filteredEntries = entry.data.filter((record)=>{
        return record.day >=start && record.day <= end   
    });
    return {
        id: entry.id,
        data:[
            ...filteredEntries
        ]
    }   
}





function getMostAffectedCountry(data, state){
    // let graphData = mapDataToLineGraphData(data);
    let graphData = data;

    var numberOfInfectionsToCountriesMap = {};

    graphData.forEach((entry)=>{
        console.log('entry', entry);

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
        name: numberOfInfectionsToCountriesMap[maxNumberOfInfections],
        infections: maxNumberOfInfections
    };
    console.log('mostInfectedCountry', mostInfectedCountry);

    return mostInfectedCountry;

}



export default (state = initialState, action) => {
    switch (action.type) {

    case FETCH_DATA:
        console.log('reducer called', action.payload)
        console.log('state',state);
        return { 
            ...state, 
            allData : action.payload,
            graphData: [],
            
            allCountries: action.payload.map((entry)=>{
                return entry.country
            })
        }
    
    case FILTER_COUNTRIES:
        
        let entry = action.payload

        let countryData = state.allData.find((e)=> e.country === entry.country)


        countryData = {
            id: countryData.country,
            data: countryData.records.map(record=>{
                return { x: record.day, y:record.new, day:record.day}
            })
        }
        
        
        
        if(!entry.enabled){
                return {
                    ...state,
                    enabledCountries: state.enabledCountries.filter((country)=> country !== entry.country),
                    graphData: state.graphData.filter((data)=> data.id !== entry.country),
                    mostAffectedCountry: getMostAffectedCountry(state.graphData.filter((data)=> data.id !== entry.country))['name']
                }
        }else{
            return{
                ...state,
                graphData: [
                    ...state.graphData,
                    filterCountryDataByDate(countryData, state.startDate, state.endDate)
                ],
                enabledCountries:[
                    ...state.enabledCountries,
                    entry.country
                ],
                mostAffectedCountry: getMostAffectedCountry([
                    ...state.graphData,
                    countryData
                ])['name']

            }
        }

    case FILTER_BY_DATE:
        let{start,end} = action.payload;

        start = parseInt(start)
        end = parseInt(end)
        
        let mostAffectedCountry = getMostAffectedCountry(filterGraphDataByDate(state.allData, start,end))['name'];

        let mostAffectedCountryRawData = state.allData.find((entry)=> entry.country === mostAffectedCountry);

        console.log('most affected Country data', mostAffectedCountryRawData);
        
        console.log('day', end);

        let currentDayData = mostAffectedCountryRawData.records.find((entry)=> entry.day == end)

        console.log('current Day Data', currentDayData);

        return {
            ...state,
            graphData: filterGraphDataByDate(state.allData, start,end, state.enabledCountries).filter((entry)=>state.enabledCountries.includes(entry.id) ),
            mostAffectedCountry: mostAffectedCountry,
            pieChartData: [
                {
                    id: "new",
                    label: "New Case",
                    value: currentDayData.new
                },
                {
                    id: "death",
                    label: "Deaths",
                    value: currentDayData.death,
                  },
                {
                    id: "recovery",
                    label: "Recoveries",
                    value: currentDayData.death,
                } 
            ],
            startDate:start,
            endDate:end 
        }

    default:
        return state
    }
}
