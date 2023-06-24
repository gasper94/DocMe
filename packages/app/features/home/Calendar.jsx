import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import { AntDesign } from '@expo/vector-icons';
// <AntDesign name="right" size={24} color="black" />

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth.getMonth(), 1).getDay();
    const calendarDays = [];

    // Generate days of the week row
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfWeekRow = daysOfWeek.map(day => (
      <View key={day} style={styles.calendarDay}>
        <Text style={styles.calendarDayofTheWeek}>{day}</Text>
      </View>
    ));

    // Generate calendar days
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = new Date().toDateString() === new Date(currentYear, currentMonth.getMonth(), i).toDateString();
      const calendarDayStyle = isCurrentDay ? styles.currentDay : styles.calendarDay;
      calendarDays.push(
        <TouchableOpacity key={i} style={calendarDayStyle} onPress={() => alert(`day: ${i}`)}>
          <Text style={styles.calendarDayNumber}>{i}</Text>
        </TouchableOpacity>
      );
    }

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.unshift(<View key={`blank_${i}`} style={styles.calendarDay} />);
    }

    return [daysOfWeekRow, ...calendarDays];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.headerText}>Previous Month</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.headerText}>Next Month
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        {generateCalendarDays()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    maxWidth: 350,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'orange',
  },
  calendarDay: {
    display: 'flex',
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, 
    borderColor: 'lightgray',
    color: 'red',
  },
  calendarDayofTheWeek: {
    fontSize: 16,
    // color: 'black'
    color: '#ababab'
  },
  calendarDayNumber: {
    fontSize: 16,
    // color: '#ccc'
    color: 'black'
  },
  currentDay: {
    display: 'flex',
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'yellow', // Set the desired color for the current day
  },
});

export default Calendar;
