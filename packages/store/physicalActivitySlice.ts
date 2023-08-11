import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PhysicalActivity {
    pointA: string;
    pointB: string;
    burnedCalories: number;
    drankWater: boolean;
}

interface ActivityState {
    activity: PhysicalActivity[];
}

const initialState: ActivityState = {
    activity: [
        { pointA: "Home", pointB: "Gym", burnedCalories: 100, drankWater: true },
        { pointA: "Office", pointB: "Park", burnedCalories: 150, drankWater: false },
        { pointA: "Office", pointB: "Park", burnedCalories: 150, drankWater: false },
    ],
}

const physicalActivitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        addPhysicalActivity: (state, action: PayloadAction<PhysicalActivity>) => {
            state.activity = [...state.activity, action.payload];
        },
    },  
})

export const { addPhysicalActivity } = physicalActivitySlice.actions;
export default physicalActivitySlice.reducer;
