import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {IconButton, Image, Title} from 'react-native-paper';

export default function ActivityDetailsScreen({navigation}) {
  return (
    <SafeAreaView>
      <ContainerView>
        <IconButton
          icon="keyboard-backspace"
          size={30}
          style={styles.navButton}
          onPress={() => navigation.navigate('ActivityFeed')}
        />
      </ContainerView>
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
});
