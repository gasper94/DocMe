import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Image, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

// Assets
// import Microphone from "../../../assets/Icons/mic/Mic";

export function Button(props) {

    const [isPressed, setIsPressed] = useState(false);
  
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isPressed ? 'blue' : 'red',
        minHeight: 100,
        minWidth: 100,
        borderRadius: 999999,
        cursor: 'pointer',
        color: 'white',
    };

  return (
    <TouchableWithoutFeedback
        onPress={() => console.log('Button clicked!')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
    >
        <View style={buttonStyle}>
            {/* <Microphone fill="white" width={32}/> */}
            <Text style={styles.buttonContent}>{props.children}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    buttonContent: {
        color: 'white',
        // fontFamily: 'Inter',
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 28,
    }
});