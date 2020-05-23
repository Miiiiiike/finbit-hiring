import React, {useEffect} from 'react'

export default function DateFilter({setStartDate, setEndDate}) {

    const containerStyle={
        marginTop:'24pt'
    }

    const labelStyle = {
        margin:'8px',
        fontWeight:'bold'

    }

    const selectStyle={
        width:'56pt',
        fontWeight:'bold',
        margin:'4pt'
    }

    const getDateRange = ()=>{
        let range = [];
        for(let i=1; i<31;i++){
            range.push(i);
        }
        return range;
    };

    const onChange = (e)=>{
        console.log(e.target.name, e.target.value);

        if(e.target.name == 'startDate'){
            setStartDate(parseInt(e.target.value));
        }else{
            setEndDate(parseInt(e.target.value));
        }

    }

    return (
        <div style={containerStyle}>
            <h1>Date</h1>
            <label style={labelStyle}>
                Start Date
                <select name="startDate" onChange={onChange} style={selectStyle}>
                    {getDateRange().map((i)=>(<option key={i}>{i}</option>)  )}
                </select>
                
            </label>

            <label style={labelStyle}>
                End Date
                <select name="endDate" onChange={onChange} style={selectStyle}>
                    {getDateRange().map((i)=>(<option key={i}>{i}</option>)  )}
                    
                </select>
            </label>
        </div>

    );
}
