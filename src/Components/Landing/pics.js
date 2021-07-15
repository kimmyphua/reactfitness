import NutritionTable from "../Views/NutritionTable";
import React from "react";
import Home from "./Home";
import ExerciseDemo from "./ExcerciseDemo";

const places = [
    {
        title: 'Get Nutrition Data',
        description:
            <Home />,
        imageUrl: 'https://i.imgur.com/nKnCdWe.png',
        time: 1500,
    },
    {
        title: 'Track Workouts',
        description: <ExerciseDemo/>,
        imageUrl: 'https://i.imgur.com/humePXC.png',
        time: 1500,
    },
    {
        title: 'Track Weight',
        description:
        'Weighing yourself regularly can help increase your awareness of your weight and weight-related behaviors. It may help you lose more weight and prevent you from gaining that weight back in the long-term. Regular self-weighing may just be that extra motivation you need to achieve your weight goals.',
        imageUrl: 'https://i.imgur.com/6NLpv9V.png',
        time: 1500,
    },
    {
        title:  'Track Nutrition',
        description:
        'Benefits of tracking your food : It can help you remember what you have eaten that day.\n' +
            'If you are also tracking calories, you can see where you can improve if you are trying to achieve a goal.\n' +
            'It will let you see if you are eating too much or NOT enough.\n' +
            'It will let you see what time of day you typically get hungry and help you adjust your eating schedule.\n' +
            'It can help you realize if you are eating out of boredom rather than hunger.\n',
        imageUrl: 'https://i.imgur.com/enUYtpL.png',
        time: 1500,
    }
];

export default places;
