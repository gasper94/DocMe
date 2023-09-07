import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';


// import React, { useState } from 'react';
import { Button } from 'react-native';

// Components
import AlertToggle from './alertToggle';
import MultiStepForm from '../MultiStepForm/MultiStepForm';

// const { useParam } = createParam<{ id: string }>()

// const SquareGrid = () => {
//   const gridSize = 15;
//   const squareSize = 40;

//   const renderSquares = () => {
//     const squares = [];

//     for (let i = 0; i < gridSize; i++) {
//       for (let j = 0; j < gridSize; j++) {
//         const key = `${i}-${j}`;
//         const squareStyle = {
//           left: j * squareSize,
//           top: i * squareSize,
//         };

//         squares.push(
//           <View key={key} style={[styles.square, squareStyle]} />
//         );
//       }
//     }

//     return squares;
//   };

//   return (
//     <View style={styles.container}>
//       {renderSquares()}
//     </View>
//   );
// };

export function UserDetailScreen() {
  // const [id] = useParam('id')

  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
      <Text>Hello</Text>
      <AlertToggle />
      <Text>UserPage</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const handlePreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    // setCurrentDay(new Date());
    let currentDayx = new Date();
    if(currentDayx.getDate() !== currentDay && currentDayx.getMonth() !== selectedDate.getMonth()){
      setCurrentDay(new Date().getDate());
    }else{
      setCurrentDay(0);
    }
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

    let currentDayx = new Date();
    if(currentDayx.getDate() !== currentDay && currentDayx.getMonth() !== selectedDate.getMonth()){
      setCurrentDay(new Date().getDate());
    }else{
      setCurrentDay(0);
    }
    // setCurrentDay(new Date());
  };

  return (
    <View className='w-full h-auto rounded bg-red-500 overflow-hidden max-w-5xl'>
      <View className='bg-blue-100'>
        <View className='flex flex-row justify-between items-center p-4'>
         <Text className='text-sm'>
           {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
           {/* {selectedDate.getMonth()} */}
         </Text>
         <View className='flex flex-row gap-4'>
          <Button title="Previous" onPress={handlePreviousMonth} />
          <Button title="Next" onPress={handleNextMonth} />
         </View>
       </View>
      </View>
      <View className='bg-pink-300'>
        <View className='flex flex-row justify-between items-center p-4'>
          {daysOfWeek.map((day) => (
            <View
              key={day}
              className='flex flex-1 items-center border-1'
            >
              <Text >{day}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className='w-full'>
        <View className='grid grid-cols-7 p-4'>
        {[...Array(firstDayOfMonth.getDay()).keys()].map((_) => (
          <View key={_} 
            className={`flex justify-center flex-1 bg-gray-200 h-4 p-8 w-full`}
          ></View>
        ))}
       {[...Array(daysInMonth).keys()].map((day) => (
         <View
           key={day + 1}
           className={`flex justify-center items-center flex-1 bg-white p-8 h-4 `}
         >
            <Text className={`${currentMonth === selectedDate.getMonth() && currentDay === (day + 1) ? 'bg-red-100' : null}`}> {`${day + 1}`}</Text>
         </View>
       ))}
       </View>
      </View>
    </View>
  );
};