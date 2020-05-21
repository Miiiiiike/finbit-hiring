import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchData } from '../actions/caseDataActions';
import LineChart from '../core/LineChart';

class InfectedCountries extends Component {

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        if(this.props.data != null){
            console.log('data', this.props.data);
            // return (
            //     <p>place holder</p>

            // );

            return (
                <LineChart data={this.props.data} />
            ) ; 
        }else{
            return (
                <p>Waiting for data</p>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log('state', state);
    return{
        data: state.data
    }
}

export default connect(mapStateToProps, {fetchData})(InfectedCountries)
