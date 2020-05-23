import React from 'react'


const onChange = (country, enabledCountries, setEnabledCountries) =>{
    console.log('enabledCountries', enabledCountries)
    
    if(enabledCountries.includes(country)){
        setEnabledCountries(
            enabledCountries.filter(
                ec => ec!== country
            ),
        )
    }else{
        setEnabledCountries(
           [
               ...enabledCountries,
               country
           ],
           
        )
        // console.log('enabledCountries', enabledCountries)
    }

}

export default function CountryFilter({countries, enabledCountries, setEnabledCountries}) {
    return (
        <div>
            <h1>Countries</h1>
            { countries.map(country=> (
                <label key={country}>
                    <input type="checkbox"  value={country} onChange={()=>{
                        onChange(country, enabledCountries, setEnabledCountries)
                    }}/>
                    {country}
                </label>
            ))}
        </div>
    )
}
