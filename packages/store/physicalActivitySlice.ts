import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {PhysicalActivity, ActivityState} from '../interfaces/PhysicalActivity';


const initialState: ActivityState = {
    activity: [
        { pointA: "Gellert Park", pointB: "AMC Movie Theather", burnedCalories: 350, drankWater: true, mood: ['happy', 'relax']},
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
