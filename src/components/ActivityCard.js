import * as React from 'react';
import {Title, Text, Divider} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {textSecondary} from './colors';

export const ActivityCard = ({
  imageSrc,
  title,
  timeRange,
  fullAddress,
  tags = [],
  onPress = () => {},
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View>
        <Title>{title}</Title>
        <Text style={[styles.marginBottom, styles.color]}>{timeRange}</Text>
        <Text style={[styles.small, styles.marginBottom, styles.color]}>
          {fullAddress}
        </Text>
        {tags.map(text => (
          <Text key={text} style={[styles.small, styles.color]}>
            {text}
          </Text>
        ))}
      </View>
      <Image
        style={styles.image}
        source={{
          uri: imageSrc,
        }}
      />
    </View>
    <Divider />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
  },
  color: {color: textSecondary},
  small: {
    fontSize: 11,
  },
  marginBottom: {
    marginBottom: 4,
  },
  image: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});
