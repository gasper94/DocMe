import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {PhysicalActivity, ActivityState} from '../interfaces/PhysicalActivity';


const initialState: ActivityState = {
    activity: [
        { pointA: "Home", pointB: "Gym", burnedCalories: 100, drankWater: true },
        { pointA: "Office", pointB: "Park", burnedCalories: 150, drankWater: false },
    ],
}

const physicalActivitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        addPhysicalActivity: (state, action: PayloadAction<PhysicalActivity>) => {
            state.activity.push(action.payload);
        },
    },  
})

export const { addPhysicalActivity } = physicalActivitySlice.actions;
export default physicalActivitySlice.reducer;
