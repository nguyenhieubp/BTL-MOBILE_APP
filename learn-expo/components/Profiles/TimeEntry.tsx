import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimeRecord {
  id: string;
  type: 'IN' | 'OUT';
  time: string;
}

const TimeEntry: React.FC<{ timeRecord: TimeRecord }> = ({ timeRecord }) => {
  return (
    <View style={styles.recordContainer}>
      <Text style={styles.text}>{timeRecord.type} - {timeRecord.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default TimeEntry;
