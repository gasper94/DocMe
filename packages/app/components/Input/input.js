import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import COLORS from "../../design/const";
import ExclamationCircle from "../../../assets/Icons/exclamation/exclamation";

const Input = ({
    label,
    value,
    iconName,
    error, 
    password,
    onFocus = () => {},
    ...props
}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [pointA, setPointA] = useState(value);

    const handleChangeText = (newPointA) => {
        setPointA(newPointA);
    };

    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, { borderColor: error ? COLORS.red : isFocused ? COLORS.darkblue : COLORS.light }]}>
                <ExclamationCircle style={{ fontSize: 22, marginRight: 10, marginLeft: 10 }} />
                <TextInput
                    placeholderTextColor={error ? "red" : COLORS.grey}
                    style={{ height: '100%', color: COLORS.darkblue, flex: 1 }}
                    autoCorrect={false}
                    placeholder={props.placeholder}
                    onChangeText={handleChangeText}
                    value={pointA ? `${pointA}` : null}
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
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>{error}</Text>
            )}
        </View>
    );
};

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
        borderWidth: 0.5,
        alignItems: 'center',
    },
});

export default Input;
