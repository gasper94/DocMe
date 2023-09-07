// other
import { SolitoImage } from 'solito/image'
import React, {useState, useEffect} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import polyline from '@mapbox/polyline';

// Router
import { useRouter } from 'solito/router'

// View
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { SafeAreaView, ScrollView} from 'moti';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, ChevronRight, XMark } from '@nandorojo/heroicons/24/outline';

// State Management
import { useSelector} from 'react-redux'
import {RootState} from "../../../store/store";

// Styling
import COLORS from '../../design/const';

export function SavedActivities() {
    
    const [walkingPath, setWalkingPath] = useState([]);
    
    // Routing
    const { push, replace, back, parseNextPath } = useRouter()
    
    const activity = useSelector((state: RootState) => state.activities.activity);

    const marker1Coordinate = {
      latitude: 37.78825,
      longitude: -122.4324,
    };

    const marker2Coordinate = {
      latitude: 37.75825,
      longitude: -122.4824,
    };

    // Calculate the center coordinate between the two markers
    const centerCoordinate = {
      latitude: (marker1Coordinate.latitude + marker2Coordinate.latitude) / 2,
      longitude: (marker1Coordinate.longitude + marker2Coordinate.longitude) / 2,
    };

    // Path coordinates
    const pathCoordinates = [marker1Coordinate, marker2Coordinate];

    useEffect(() => {
      // Fetch walking directions from a routing service (e.g., Google Maps Directions API)
      const fetchWalkingDirections = async () => {
        const startCoordinate = `${marker1Coordinate.latitude},${marker1Coordinate.longitude}`; // Replace with your marker1 coordinate
        const endCoordinate = `${marker2Coordinate.latitude},${marker2Coordinate.longitude}`;   // Replace with your marker2 coordinate
        const apiKey = process.env.GOOGLE_API;    // Replace with your API key

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoordinate}&destination=${endCoordinate}&mode=walking&key=${apiKey}`
          );

          const data = await response.json();

          if(data.status === 'OK'){
            const encodedString = data.routes[0].overview_polyline.points;

            const decodedCoordinates = polyline.decode(encodedString);
            console.log("data decoded:", decodedCoordinates);

            const formattedCoordinates = decodedCoordinates.map(([latitude, longitude]) => ({
              latitude,
              longitude,
            }));

            // const coordinates = decodedCoordinates.map((point) => ({
            //   latitude: point.lat,
            //   longitude: point.lng,
            // }));

            console.log("data coordinates:", formattedCoordinates);








            setWalkingPath(formattedCoordinates);
          }



          // if (data.status === 'OK') {
          //   const coordinates = data.routes[0].overview_path.map((point) => ({
          //     latitude: point.lat,
          //     longitude: point.lng,
          //   }));

          //   setWalkingPath(coordinates);
          // }
        } catch (error) {
          console.error('Error fetching walking directions:', error);
        }
      };

      fetchWalkingDirections();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
            <View style={styles.navigation}>
                <TouchableOpacity style={styles.navigationItem} onPress={() => push("/")}>
                <ArrowLeft color={'#4250CF'}/>
                </TouchableOpacity>
                <View style={styles.navigationMiddle}>
                <Text style={styles.navigationText}>Saved Physical Activities</Text>
                </View>
                <View></View>
            </View>
            {/* <View>
                <Text>{`${JSON.stringify(activity)}`}</Text>
            </View> */}
            <ScrollView contentContainerStyle={styles.containerx}>
                {activity.map((activity, index) => (
                    <View style={styles.card} key={index}>
                      <View style={styles.cardHeadingContent}>
                        <View style={styles.cardHeadingUserImage}>
                          <SolitoImage
                            alt="user-image"
                            src={require('../../../assets/images/ulises.jpeg')}
                            style={{ borderRadius: 40 }}
                            height={50}
                            width={50}
                            />
                        </View>
                        <View style={styles.cardHeadingTitle}>
                          <Text style={styles.cardTitle}>Activity Name</Text>
                          <View style={styles.cardHeadingTitleContent}>
                            <Text>Feb 2, 2023</Text>
                            <View style={styles.box}></View>
                            <View>
                              <Text>14mi</Text>
                            </View>
                          </View>

                        </View>
                        <View style={styles.options}>
                          <ChevronRight color={'#4250CF'}/>
                        </View>
                      </View>

                      <View>

                      <View style={styles.cardText}>
                          <Text>
                            Point A: 
                          </Text>
                          <Text style={{color: '#4250CF'}}>
                            {activity.pointA}
                          </Text>
                      </View>
                      <View style={styles.cardText}>
                          <Text>
                            Point B: 
                          </Text>
                          <Text style={{color: '#4250CF'}}>
                            {activity.pointB}
                          </Text>
                      </View>

                      <Text style={styles.cardText}>
                          Calories: <Text style={{color: '#4250CF'}}>{activity.burnedCalories ? activity.burnedCalories : 0}</Text>
                      </Text>
                      <Text style={styles.cardText}>
                          Drank Water: <Text style={{color: '#4250CF'}}>{activity.drankWater ? 'Yes' : 'No'}</Text>
                      </Text>

                      <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 4}}>
                            <Text>Mood:</Text> 
                            {/* {activity.mood.join(', ')} */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                              {activity.mood ? (
                                activity.mood.map((item, index) => (
                                  <TouchableOpacity
                                  key={index}
                                  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4250CF', borderRadius: 99, paddingHorizontal: 6 }}
                                  onPress={() => {}}
                                  >
                                      <Text style={{ padding: 5, color: 'white' }}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                                ) : (
                                  <Text style={{ color: COLORS.grey, paddingTop: 10 }}>Empty</Text>
                                  )}
                            </View>
                      </View>

                      </View>

                      <View style={styles.map}>
                          {/* <Text> This is where the map goes</Text> */}
                          {/* <View style={styles.containerx}> */}
                            {/* <MapView  /> */}
                            <MapView
                              style={styles.mapx}
                              // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                              // region={{
                              //   latitude: 37.78825,
                              //   longitude: -122.4324,
                              //   latitudeDelta: 0.015,
                              //   longitudeDelta: 0.0121,
                              // }}
                              scrollEnabled={false} // Disable map panning
                              zoomEnabled={false}   // Disable map zooming
                               initialRegion={{
                                    latitude: (marker1Coordinate.latitude + marker2Coordinate.latitude) / 2,
                                    longitude: (marker1Coordinate.longitude + marker2Coordinate.longitude) / 2,
                                    latitudeDelta: Math.abs(marker1Coordinate.latitude - marker2Coordinate.latitude) + 0.04,
                                    longitudeDelta: Math.abs(marker1Coordinate.longitude - marker2Coordinate.longitude) + 0.04,
                                  }}
                              // minZoomLevel={10} // Set the minimum zoom level
                              // maxZoomLevel={12} // Set the maximum zoom level
                            >
                              <Marker
                                coordinate={{
                                  latitude: marker1Coordinate.latitude,
                                  longitude: marker1Coordinate.longitude,
                                }}
                                title="Point A:" 
                                description={activity.pointA}
                                 pinColor="blue"
                              />

                              <Marker
                                coordinate={{
                                  latitude: marker2Coordinate.latitude,
                                  longitude: marker2Coordinate.longitude,
                                }}
                                title="Point B:"
                                description={activity.pointB}
                              />

                              <Polyline
                                coordinates={walkingPath ? walkingPath : pathCoordinates}
                                strokeWidth={3} // Adjust the line width as needed
                                strokeColor="red" // Adjust the line color as needed
                              />
                            </MapView>


                          {/* </View> */}
                      </View>
                    </View>
                ))}
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  cardTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  box:{
    backgroundColor: '#D1D1D1',
    height: 10,
    width: 10,
    borderRadius: 999,
  },
  cardHeadingTitleContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    color: 'red',
  },
  cardHeadingUserImage:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    maxWidth: 60,
    // backgroundColor: 'green',
  },
  cardHeadingTitle:{
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
    paddingLeft: 4,
    // backgroundColor: 'purple',
  },
  options:{
    display: 'flex',
    justifyContent: 'center',
    minWidth: 20,
    maxWidth: 20,
    // backgroundColor: 'pink',
  },
  cardHeadingContent: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    height: 70
  },
  customMarker: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    backgroundColor: 'blue',
  },
  mapx: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  map: {
    display: 'flex',
    backgroundColor: 'transparent',
    height: 200
  },
    button: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
    buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
    safeArea: {
    flex: 1,
    backgroundColor: '#E3E0F0',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    // backgroundColor: '#007bff',
  },
  navigationItem: {},
  navigationMiddle: {},
  navigationText: {
    color: '#4250CF',
    fontWeight: 'bold',
  },
  middle: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
    width: '100%',
  },
  middleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  menuText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuTextOption: {
    color: 'blue',
    fontWeight: 'bold',
  },
  containerx: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,

  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

