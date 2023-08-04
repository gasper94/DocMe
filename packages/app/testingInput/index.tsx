import {Text} from "react-native"

const GOOGLE_API_KEY = process.env.GOOGLE_API;

const DisplayItem = () => {

    return(
           <Text>Display data Native - {`${GOOGLE_API_KEY}`}</Text>
    )
}

export {DisplayItem};