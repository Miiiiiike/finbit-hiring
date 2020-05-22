import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchData } from '../actions/caseDataActions';
import PieChart from '../core/PieChart';

class MostAffectedCountry extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        if(this.props.pieChartData != null && this.props.country != null){

            return (
                <div>
                    <h2>Most Affected Country: {this.props.country}</h2>
                    <PieChart data={this.props.pieChartData} />
                </div>
            ) ; 
        }else{
            return (
                <div>
                    <h1>Most Affected Country</h1>
                    <p>Please enable the countries and select the date</p>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return{
        pieChartData: state.pieChartData,
        country:state.mostAffectedCountry
    }
}

export default connect(mapStateToProps, {fetchData})(MostAffectedCountry)
