import { createParam } from 'solito'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View  } from 'app/design/view'
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Image, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

export function Button(props) {

    const [isPressed, setIsPressed] = useState(false);
  
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const buttonStyle = {
        backgroundColor: isPressed ? 'blue' : 'red',
        padding: 10,
        borderRadius: 5,
        cursor: 'pointer'
    };

  return (
    <TouchableWithoutFeedback
        onPress={() => console.log('Button clicked!')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
    >
        <View style={buttonStyle}>
            <Text>{props.children}</Text>
        </View>
    </TouchableWithoutFeedback>
  )

  
}
