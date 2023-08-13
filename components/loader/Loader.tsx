import React from 'react'
import { ActivityIndicator, View,Text } from 'react-native'

function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
  )
}

export default Loader