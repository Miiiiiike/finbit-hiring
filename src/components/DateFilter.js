import React, {useEffect} from 'react'

export default function DateFilter({setStartDate, setEndDate}) {

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
        <div>
            <h1>Date</h1>
            <label>
                Start Date
                <select name="startDate" onChange={onChange}>
                    {getDateRange().map((i)=>(<option key={i}>{i}</option>)  )}
                </select>
                
            </label>

            <label>
                End Date
                <select name="endDate" onChange={onChange}>
                    {getDateRange().map((i)=>(<option key={i}>{i}</option>)  )}
                    
                </select>
            </label>



        </div>
    )
}
