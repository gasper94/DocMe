import React from 'react';
import {View} from 'react-native';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
// import { A, H1, P, TextLink, TextInput } from 'app/design/typography'


// COLORS
import COLORS from "../../design/const";

// assets
import ExclamationCircle from "../../../assets/Icons/exclamation/exclamation";

const Input = ({
    label,
    iconName,
    error, 
    password,
    onFocus = () => {},
    ...props
}) => {


    const [isFocused, setIsFocused] = useState(false);
    const [pointA, setPointA] = useState('');

    const handleChangeText = (newPointA) => {
        setPointA(newPointA);
    };

    return(
      <View style={{marginBottom: 12}}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputContainer, { borderColor: error ? COLORS.red:isFocused ? COLORS.darkblue:COLORS.light}]}>
            <ExclamationCircle style={{fontSize: 22, marginRight: 10, marginLeft: 10}} />
            <TextInput
                placeholderTextColor={ error ? "red": COLORS.grey}
                style={{height: '100%', color: COLORS.darkblue, flex: 1, outlineStyle: 'none'}}
                autoCorrect={false}
                placeholder="Enter place of origin"
                onChangeText={handleChangeText}
                value={pointA}
                onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                onBlur={() => {
                    setIsFocused(false);
                }}
                {...props}
            />
        </View>
        {error && (
          <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>{error}</Text>
        )}
      </View>
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
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    // marginHorizontal: 15,
    borderWidth: 0.5,
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

export default Input;