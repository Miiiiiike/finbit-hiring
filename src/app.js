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
  const [mostAffectedCountry, setMostAffectedCountry] = useState('');
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

    data = filterDataByCountry(data)
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


  const filterDataByCountry = (data)=>{
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





  //fetch app data
  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(()=>{
    getMostAffectedCountry()
  },[lineChartData]);


  //update line chart data on state changes in filters
  useEffect(()=>{
    setupLineChartData(rawData)
  },[startDate, endDate, enabledCountries])


  useEffect(()=>{
    setupPieChartdata()
  },[mostAffectedCountry])



  return (
    <div>
      <CountryFilter countries={allCountries} enabledCountries={enabledCountries} setEnabledCountries={setEnabledCountries}/>
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate}/>
      
      <LineChart data={lineChartData}/>
      <h1>
      {mostAffectedCountry!= null? 'most affected country: ' + mostAffectedCountry : 'waiting for data'}
      </h1>

      {
        pieChartData != []? (<PieChart data = {pieChartData} />): (<p>waiting for data</p>)
      }

    </div>
  );
};





export default App;
