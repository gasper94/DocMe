import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const hardcodedMessage = 'This is a hardcoded message for the triggered notification.';

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
    }
  };

  const triggerNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Triggered Notification',
          body: hardcodedMessage,
          sound: true,
          vibrate: [100, 200, 100],
        },
        trigger: null, // Trigger immediately
      });

      Alert.alert('Notification triggered successfully');
    } catch (error) {
      console.error('Error triggering notification:', error);
    }
  };

  return (
    <View>
      <Text>Notification Status: {notificationStatus}</Text>
      <Button title="Trigger Notification" onPress={triggerNotification} />
    </View>
  );
};

export default AlertToggle;
