interface PhysicalActivity {
    pointA: string;
    pointB: string;
    burnedCalories: number;
    drankWater: boolean;
    mood: String[];
}

interface ActivityState {
    activity: PhysicalActivity[];
    processingActivity: PhysicalActivity;
}

export {PhysicalActivity, ActivityState}