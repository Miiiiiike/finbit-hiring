import React, { Component } from 'react'
import {connect} from 'react-redux';
import { filterCountries, filterByDate } from '../actions/caseDataActions';

class DateFilter extends Component {

    constructor(props) {
        super (props);
        this.state = { 
            start: 1,
            end : 30
        }
    }

    

    onSelectChanged(e){
        
        this.setState(
            { 
                [e.target.name]: e.target.value
            },()=>{
                this.props.filterByDate(this.state.start,this.state.end)
            }
        )
        


    }

    render() {
        let range = [];
        for(let i = 1; i < 31; i++){
            range.push(i);
        }
        
        return (
            <div>
                <h1>Dates</h1>
                <label>
                    Start
                    <select name="start" className="form-control" onChange={this.onSelectChanged.bind(this)}>
                        {range.map((i)=> (<option value= {i} key={i}>{i}</option>))}
                    </select>
                </label>
                
                <label className="mx-4">
                    End
                    <select name="end" className="form-control" onChange={this.onSelectChanged.bind(this)}>
                        {range.map((i)=> (<option value= {i} key={i}>{i}</option>))}
                        
                    </select>
                </label>
            </div>

        );
    }
}

function mapStateToProps(state){
    if(state.allCountries != null){
        return {
            dates: state.allCountries
        };
    }else{
        return state;
    }
}

export default connect(mapStateToProps, {filterCountries, filterByDate})(DateFilter);