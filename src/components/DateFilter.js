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
        console.log(e.target.name,e.target.value);

        this.setState(
            { 
                [e.target.name]: e.target.value
             }
        )
            
        this.props.filterByDate({start:this.state.start, end: this.state.end})

    }

    render() {
        let range = [];
        for(let i = 1; i < 31; i++){
            range.push(i);
        }
        
        return (
            <div>
                <label>
                    Start
                    <select name="start" className="form-control" onChange={this.onSelectChanged.bind(this)}>
                        {range.map((i)=> (<option value= {i}>{i}</option>))}
                    </select>
                </label>
                
                <label className="mx-4">
                    End
                    <select name="end" className="form-control" onChange={this.onSelectChanged.bind(this)}>
                        {range.map((i)=> (<option value= {i}>{i}</option>))}
                        
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