import {useState} from "react"
import {Text, View, StyleSheet, SafeAreaView} from "react-native"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// COLORS
import COLORS from "../design/const";

// assets
import ExclamationCircle from "../../assets/Icons/exclamation/exclamation";

const GOOGLE_API_KEY = process.env.GOOGLE_API;


const DisplayItem = ({error, label}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [location, setLocation] = useState();


    const handleLocationPress = (location) => {
        console.log("Location:", location.description);
        setLocation(location.description);
    }

    return(
        <View>
            
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={handleLocationPress}
                query={{
                key: GOOGLE_API_KEY,
                language: 'en',
                }}
                onFail={error => console.log('ERROR:', error)}
                minLength={2}
                fetchDetails={true}
            styles={{
                textInputContainer: {
                    backgroundColor: COLORS.gray,
                },
                textInput: {
                //   height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                    backgroundColor: COLORS.light
                },
                predefinedPlacesDescription: {
                    color: 'red',
                    backgroundColor: 'red'
                //   height: 100,
                },
                poweredContainer:{
                    backgroundColor: 'red',
                }
            }}
            // styles={{
            //     predefinedPlacesDescription: {
            //         backgroundColor: 'brown',
            //     },
            //     poweredContainer:{
            //         display: 'none',
            //         backgroundColor: 'red',
            //     },
            //     listView:{
            //         backgroundColor: 'blue'
            //     },
            //     container: {
            //         // marginTop: 32,
            //         // paddingTop: 5,
            //         backgroundColor: 'purple',
                    
            //     },
            //     description: {
                    
            //         backgroundColor: 'orange'
            //     },
            //     textInputContainer: {
            //         backgroundColor: 'pink'
            //     },
            //     powered:{
            //         backgroundColor: 'gray'
            //     },
            //     row:{
                    
            //         backgroundColor: 'yellow'
            //     }
            // }}
            />
            <View>
                <Text>Location: {location}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerx: {
      zIndex: 10,
      overflow: 'visible',
      height: 50,
      flexGrow: 0,
      flexShrink: 0
    },
//   container: {
//     backgroundColor: COLORS.white,
//     flex: 1,
//   },
//   label: {
//     marginVertical: 5,
//     fontSize: 14,
//     color: COLORS.grey,
//   },
//   inputContainer: {
//     backgroundColor: COLORS.light,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//   },
//   textEdit: {
//     height: 40, 
//     borderColor: 'grey', 
//     backgroundColor: 'white',
//     borderWidth: 1
//   },
});

export {DisplayItem};

