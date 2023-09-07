import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AlertToggle = () => {
    const [notificationStatus, setNotificationStatus] = useState(null);

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const requestNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Notification permission not granted');
            setNotificationStatus('Permission Not Granted');
        } else {
            setNotificationStatus('Permission Granted');
            // setNotifications();
        }
    };

    const triggleCall = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Look at that notification',
                body: "I'm so proud of myself!",
                sound: "default",
            },
            trigger: null,
        });
    }


  return (
    <View>
      <Text>Toggle Alert: {notificationStatus}</Text>
      
      <Button title="Show Alert" onPress={triggleCall}/>
    </View>
  );
};

export default AlertToggle;
