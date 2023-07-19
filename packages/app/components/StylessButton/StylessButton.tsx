import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Image, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

export function StylessButton({handleOnPress, children}) {

    const [isPressed, setIsPressed] = useState(false);
  
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const buttonStyle = {
        // backgroundColor: isPressed ? 'blue' : 'red',
        margin: 20,
        borderRadius: 5,
        textColor: 'blue',
        cursor: 'pointer'
    };

    // const buttonContent = {
    //     // backgroundColor: isPressed ? 'blue' : 'red',
    //     padding: 10,
    //     borderRadius: 5,
    //     color: 'blue',
    //     cursor: 'pointer'
    // };

  return (
    <TouchableWithoutFeedback
        onPress={handleOnPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
    >
        <View style={buttonStyle}>
            <Text style={styles.buttonContent}>{children}</Text>
        </View>
    </TouchableWithoutFeedback>
  )

  
}


const styles = StyleSheet.create({
    buttonContent: {
        color: '#3677E0',
        fontFamily: 'Inter',
        fontSize: 18,
        fontStyle: 'normal',
        lineHeight: 28,
    }
});