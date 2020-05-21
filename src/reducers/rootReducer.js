import { FETCH_DATA } from '../actions/types';

const initialState = {
    caseData: [

    ]
}

export default (state = initialState, action) => {
    switch (action.type) {

    case FETCH_DATA:
        console.log('reducer called', action.payload)



        return { 
            ...state, 
            data : action.payload.map((country)=>{
                return {
                    id:country,
                    data: country.records.map(record=>{
                            return {
                                x: record.day,
                                y: record.new
                            }
                        })
            }
        })}

    default:
        return state
    }
}
