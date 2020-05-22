import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const initialState = {
    allData: [

    ],
    graphData:[

    ],
    allCountries:[

    ],
    enabledCountries:[

    ],
    mostAffectedCountry:'',
    mostAffectedCountryGraphData:[

    ],

    startDate:1,
    endDate:1
    
}

export default createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)