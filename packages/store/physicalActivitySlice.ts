import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {PhysicalActivity, ActivityState} from '../interfaces/PhysicalActivity';


const initialState: ActivityState = {
    activity: [
        { pointA: "Home", pointB: "Gym", burnedCalories: 100, drankWater: true, mood: []},
        { pointA: "Office", pointB: "Park", burnedCalories: 150, drankWater: false, mood: []  },
    ],
    processingActivity: {pointA: "", pointB: "", burnedCalories: 0, drankWater: false, mood: [] },
}

const physicalActivitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        addPhysicalActivity: (state, action: PayloadAction<PhysicalActivity>) => {
            state.activity.push(action.payload);
        },
        addProcessingActivity: (state, action: PayloadAction<PhysicalActivity>) => {
            state.processingActivity = {...action.payload}
        },
    },  
})

export const { addPhysicalActivity, addProcessingActivity } = physicalActivitySlice.actions;
export default physicalActivitySlice.reducer;
