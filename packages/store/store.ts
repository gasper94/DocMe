import { configureStore, combineReducers} from '@reduxjs/toolkit'

// Reducer
import physicalActivityReducer from './physicalActivitySlice';

const rootReducer = combineReducers({
    activities: physicalActivityReducer,
    // Add other slices here
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;