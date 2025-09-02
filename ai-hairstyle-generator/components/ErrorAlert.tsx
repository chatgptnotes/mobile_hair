import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Oops! </Text>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(127, 29, 29, 0.5)', // bg-red-900/50
        borderWidth: 1,
        borderColor: '#7f1d1d', // border-red-700
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    text: {
        color: '#fca5a5', // text-red-300
    },
    boldText: {
        fontWeight: 'bold',
    }
});
