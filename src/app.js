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

  //fetch app data
  
  useEffect(()=>{
    fetchData();
  },[]);


  useEffect(()=>{
    setupLineChartData(rawData)
  },[startDate, endDate, enabledCountries])


  return (
    <div>
      <CountryFilter countries={allCountries} enabledCountries={enabledCountries} setEnabledCountries={setEnabledCountries}/>
      <DateFilter setStartDate={setStartDate} setEndDate={setEndDate}/>
      
      <LineChart data={lineChartData}/>
        
    </div>
  );
};




const setLineChartData = ()=>{
  
}

export default App;
