import React, { Component } from 'react'
import {connect} from 'react-redux';
import { filterCountries, filterByDate } from '../actions/caseDataActions';

class CountryFilter extends Component {
    

    onCheckChanged(e){
        this.props.filterCountries(e.target.name, e.target.checked);
        console.log((e.target.name, e.target.checked))
    }
    
    

    render() {
        if(this.props.countries != null){
            return (
                <div>
                    <h1>Countries</h1>
                    { this.props.countries.map(
                        (country)=> (<label key ={country.name}><input type="checkbox" className="mx-2 " onChange={this.onCheckChanged.bind(this)} name={country}/> {country}</label>) 
                        )
                    }
                </div>
            );
        }else{
            return(
                <p>wating for data</p>
            );
        }
    }
}

function mapStateToProps(state){
    if(state.allCountries != null){
        return {
            countries: state.allCountries
        };
    }else{
        return state;
    }
}

export default connect(mapStateToProps, {filterCountries, filterByDate})(CountryFilter);