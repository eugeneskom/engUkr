import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface progBarProps {
  total: number,
  answered: number
}

const ProgressBar = ({ total, answered }: progBarProps) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: answered,
      duration: 500, // Adjust the duration of the animation (in milliseconds) as per your preference
      useNativeDriver: false, // 'true' if you want to use the native driver for performance (only available for certain properties)
    }).start();
  }, [answered, progress]);

  const widthAnimation = progress.interpolate({
    inputRange: [0, total],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.progress, { width: widthAnimation }]} />
      <Text style={styles.progressText}>{`${Math.round((answered / total) * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '60%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    overflow: 'hidden',
    marginBottom: 20
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProgressBar;
