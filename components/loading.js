import { View, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react';
import { darkStyles, styles } from '../theme';

const { width, height } = Dimensions.get('window');

export default function Loading({lightMode}) {

  const background = lightMode ? styles.background : darkStyles.background;

  return (
      <View style={{width,height, background}}>
        <ActivityIndicator 
          size="large"
          style={{marginTop: height*0.35}}
          color={lightMode ? styles.title.color : darkStyles.title.color}
        />
      </View>
  )
}
