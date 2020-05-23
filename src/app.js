import React, {useState, useEffect} from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import "./style.css";
import CountryFilter from './components/CountryFilter';
import DateFilter from './components/DateFilter';

const App = (props) => {
  const [rawData, setRawData] = useState([]);
  const [allCountries, setAllCoutries] = useState([]);
  const [enabledCountries, setEnabledCountries] = useState([]);
  const [startDate, setStartDate] = useState(1);
  const [endDate, setEndDate] = useState(1);
  const [mostAffectedCountry, setMostAffectedCountry] = useState();
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const setupLineChartData = (allData)=>{
    let data = allData.map((entry)=>{
      return {
          id: entry.country,
          data: entry.records.map(record=>{
              return { x: record.day, y:record.new, day:record.day}
          })
      }
    })
    data = filterLineChartDataByDate(data)

    data = filterLineChartDataByCountry(data)
    setLineChartData(data);
  }


  const filterLineChartDataByDate = (data) =>{
      // let graphData = mapDataToLineGraphData(data);

      return data.map((entry)=>{
          return filterCountryDataByDate(entry);

      });
  }


  const filterCountryDataByDate = (entry) =>{
      let filteredEntries = entry.data.filter((record)=>{
          return record.day >=startDate && record.day <= endDate   
      });

      return {
          id: entry.id,
          data:[
              ...filteredEntries
          ]
      }   
  }


  const filterLineChartDataByCountry = (data)=>{
    if(enabledCountries == []){
      return [];
    }else{

      return data.filter((data)=> enabledCountries.includes(data.id))
    }

  }



  const fetchData = () => {
    fetch('http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result')
    .then(res=>res.json())
    .then(data=>{
      setRawData(data);
      setAllCoutries(data.map((entry)=> entry.country))
      setupLineChartData(data)
    });

  }



  const getMostAffectedCountry = () =>{
    var numberOfInfectionsToCountriesMap = {};

    lineChartData.forEach((entry)=>{
        let reducedValue = entry.data.reduce((sum,current,i)=> {
            return {y: sum.y + parseInt(current.y)}
        })['y'];

        numberOfInfectionsToCountriesMap =  {
            ...numberOfInfectionsToCountriesMap,
            [reducedValue]: entry.id
            //infections: country name
        };
    })

    if(numberOfInfectionsToCountriesMap !== {}){
      let maxNumberOfInfections = Math.max(
          ...Object.keys(numberOfInfectionsToCountriesMap).map((val) => parseInt(val))
      )
      
      let country = {
          name: numberOfInfectionsToCountriesMap[maxNumberOfInfections],
          infections: maxNumberOfInfections
      };
      console.log('country', country);

      setMostAffectedCountry(country['name']);

    }else{
      setMostAffectedCountry('empty');
    }

  }


  const setupPieChartdata = () =>{
    let mostAffectedCountryRawData = rawData.find((entry)=> entry.country === mostAffectedCountry);
    if(mostAffectedCountryRawData != null){
      let currentDayData = mostAffectedCountryRawData.records.find((entry)=> entry.day == endDate)

      setPieChartData([
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
      ])
    }
  }

  //checks the start & end dates' validity
  const validateDateRange = ()=>{
    if(startDate > endDate || endDate< startDate){
      setLineChartData([])
    }
  }




  //fetch app data
  useEffect(()=>{
    fetchData();
  },[]);
  
  //listen to changes in line chart data and recalculate most affected country
  useEffect(()=>{
    getMostAffectedCountry()
  },[lineChartData]);


  //update line chart data on state changes in filters
  useEffect(()=>{
    setupLineChartData(rawData)
  },[startDate, endDate, enabledCountries])


  // listen to changes in mostAffectedCountry and update piechart data
  useEffect(()=>{
    setupPieChartdata()
  },[mostAffectedCountry])


  //listen to changes in start date and end date and validate the user's entry
  useEffect(()=>{
    validateDateRange()
  },[startDate,endDate])

  const chartCotainerStyle = {
    marginTop:'32pt'
  }
  
  return (
    <div>
      <CountryFilter countries={allCountries} enabledCountries={enabledCountries} setEnabledCountries={setEnabledCountries}/>
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate}/>
      
      <div style={chartCotainerStyle}>
        {lineChartData.length == 0?  (
          <div>
            <h1>No data to display</h1> 
            <h3>Please select atleast 1 country</h3>

          </div>
        ):  (<LineChart data = {lineChartData} />)}
      </div>
      
      {
      mostAffectedCountry!= null? (
        <div>
          <h1>Most Affected Country</h1>
          <h2>{mostAffectedCountry}</h2>
            <PieChart data = {pieChartData} />
        </div>
      ) : ''
      }

    </div>
  );

  
};





export default App;
