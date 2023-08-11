import { configureStore} from '@reduxjs/toolkit'

// Reducer
import physicalActivitySlice from './physicalActivitySlice';

export const store = configureStore({
    reducer: {activity: physicalActivitySlice}
})