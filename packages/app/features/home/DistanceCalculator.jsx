
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
