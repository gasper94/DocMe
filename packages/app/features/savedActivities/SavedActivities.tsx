import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';


// State Management
import { useSelector} from 'react-redux'
import {RootState} from "../../../store/store";

export function SavedActivities() {

    const activity = useSelector((state: RootState) => state.activities.activity);

  return (
    <View className="flex-1 items-center justify-center bg-blue-200">
        <Text>{JSON.stringify(activity)}</Text>
        <Text>Saved Activities</Text>
        <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}
