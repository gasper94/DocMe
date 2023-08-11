interface PhysicalActivity {
    pointA: string;
    pointB: string;
    burnedCalories: number;
    drankWater: boolean;
}

interface ActivityState {
    activity: PhysicalActivity[];
}

export {PhysicalActivity, ActivityState}