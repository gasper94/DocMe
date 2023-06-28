
{/* <script src="https://maps.googleapis.com/maps/api/js?key=&libraries=geometry"></script> */}

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// utils
import {getRandom} from "../../sample/index";

const MapViewComponent = () => {
  const [distance, setDistance] = useState(null);
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');

  const replaceSpacesWithPlus = (string) => {
    return string.replace(/ /g, '+');
    }

  const calculateDistance = async () => {

    const newobject = await getRandom(pointA, pointB);
    console.log('component', newobject);
    setDistance(newobject);
    // alert(JSON.stringify(newobject))
    
  };

  // const calculateDistance = async () => {
  //       const url = `http://10.0.0.140:3006/calculateDistance`
    
  //     await fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //           alert("data" + data);
  //           console.log('data', data);
          
  //       })
  //       .catch((error) => {
  //         console.log('Error calculating distance:', error);
  //       });
  // };

// const calculateDistance = async () => {
//   console.log("calculateDistance:", pointA, pointB);
  
//   if (pointA && pointB) {
//     const apiKey = 'AIzaSyA1f3z5AMyYu7ImdMxq21YYR3QSjAngGeE';
//     const PointANew = replaceSpacesWithPlus(pointA);
//     const PointBNew = replaceSpacesWithPlus(pointB);
//     console.log("calculateDistance:", pointA, pointB);
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="${PointANew}"&destinations="${PointBNew}"&key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log('data', data);

//       if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
//         const distanceInMiles = data.rows[0].elements[0].distance.text;
//         setDistance(distanceInMiles);
//         console.log('distanceInMiles', distanceInMiles);
//       } else {
//         setDistance(null);
//       }
//     } catch (error) {
//       console.log('Error calculating distance:', error);
//     }
//   }
// };


  return (
    <View>
      <TextInput
        placeholder="Point A"
        value={pointA}
        onChangeText={setPointA}
      />
      <TextInput
        placeholder="Point B"
        value={pointB}
        onChangeText={setPointB}
      />
      <Button title="Calculate Distance" onPress={calculateDistance} />
      {distance && <Text>Distance: {distance}</Text>}
      {/* <MapView style={{ width: '100%', height: 300 }}>
        <Marker coordinate={{ latitude: LATITUDE_A, longitude: LONGITUDE_A }} />
        <Marker coordinate={{ latitude: LATITUDE_B, longitude: LONGITUDE_B }} />
      </MapView> */}
    </View>
  );
};

export default MapViewComponent;
