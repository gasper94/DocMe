import { createParam } from 'solito'
import { TextLink } from 'solito/link'
// import { Text } from 'app/design/typography'
// import { View  } from 'app/design/view'
import { StyleSheet } from 'react-native';
// import React, { useState } from 'react';


import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const { useParam } = createParam<{ id: string }>()

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
  const [id] = useParam('id')

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-center font-bold">{`User ID: ${id}`}</Text>
      {/* {SquareGrid()} */}
      {/* <View className='h-4 w-4 bg-red-700'></View> */}
      <View className='bg-pink-500'>
        <Text>Purple</Text>
      </View>
      {Calendar()}
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}



const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const handlePreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: 'red' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Button title="Previous" onPress={handlePreviousMonth} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 }}>
          {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
        </Text>
        <Button title="Next" onPress={handleNextMonth} />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        {daysOfWeek.map((day) => (
          <View
            key={day}
            style={{ flex: 1, backgroundColor: '#ccc', padding: 8, alignItems: 'center' }}
          >
            <Text>{day}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {[...Array(firstDayOfMonth.getDay()).keys()].map((_) => (
          <View key={_} style={{ flex: 1, backgroundColor: '#ccc', height: 40 }}></View>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <View
            key={day + 1}
            style={{ flex: 1, backgroundColor: '#fff', padding: 8, alignItems: 'center', height: 40 }}
          >
            <Text>{day + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};


// const Calendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
//   const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

//   const handlePreviousMonth = () => {
//     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="text-center mb-4">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handlePreviousMonth}
//         >
//           <Text>Previous</Text>
//         </button>
//         <h2 className="text-2xl font-bold">
//           <Text>
//           {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
//           </Text>
//         </h2>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleNextMonth}
//         >
//           <Text>Next</Text>
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-2">
//         {daysOfWeek.map((day) => (
//           <div className="bg-gray-200 py-2 px-4 text-center" key={day}>
//             <Text>

//             {day}
//             </Text>
//           </div>
//         ))}
//         {[...Array(firstDayOfMonth.getDay()).keys()].map((_) => (
//           <div className="bg-gray-200"></div>
//         ))}
//         {[...Array(daysInMonth).keys()].map((day) => (
//           <div className="bg-white py-2 px-4 text-center" key={day + 1}>
//             <Text>

//             {day + 1}
//             </Text>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     backgroundColor: '#fff',
//   },
//   square: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#ff0000',
//     margin: 2,
//   },
// });
