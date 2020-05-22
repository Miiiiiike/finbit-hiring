import React from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import 'bootstrap/dist/css/bootstrap.css';
import "./style.css";
import InfectedCountries from './components/InfectedCountries';
import MostAffectedCountry from './components/MostAffectedCountry';
import CountryFilter from './components/CountryFilter';
import DateFilter from './components/DateFilter';
import { Provider } from 'react-redux';
import store from './store';

const App = (props) => {
  return(
    <Provider store={store}>
      <CountryFilter />
      <DateFilter />
      <InfectedCountries  />
      <MostAffectedCountry />

    </Provider>
  );
};




export default App;
