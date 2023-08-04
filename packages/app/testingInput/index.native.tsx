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
        setLocation(location);
    }

    return(
    //     <View style={{marginBottom: 12}}>
    //     <Text style={styles.label}>{label}</Text>
    //     <View style={[styles.inputContainer, { borderColor: error ? COLORS.red:isFocused ? COLORS.darkblue:COLORS.light}]}>
    //         <ExclamationCircle style={{fontSize: 22, marginRight: 10, marginLeft: 10}} />
          
            
    //     </View>
    //     {error && (
    //       <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>{error}</Text>
    //     )}
    //   </View>
        <>
             <View style={{flex: 1,  height: "auto", paddingTop: 4, paddingBottom: 1 }}>
               <GooglePlacesAutocomplete
                  placeholder='Search'
                  onPress={(item) => {
                    console.log("item:", item);
                  }}
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
                      color: '#1faadb',
                    //   height: 100,
                    },
                }}
              />
            </View>
            <Text>{JSON.stringify(location)}</Text>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  textEdit: {
    height: 40, 
    borderColor: 'grey', 
    backgroundColor: 'white',
    borderWidth: 1
  },
});

export {DisplayItem};

