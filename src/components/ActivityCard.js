import * as React from 'react';
import {Title, Text, Divider, Colors} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

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
        <View style={styles.marginTop}>
          <Text
            ellipsizeMode="middle"
            numberOfLines={1}
            style={[
              styles.small,
              styles.marginBottom,
              styles.color,
              {width: '92%'},
            ]}>
            {fullAddress}
          </Text>
          <View style={styles.inline}>
            {tags.map((text, index) => (
              <Text key={text} style={[styles.small, styles.color]}>
                {index !== 0 && ', '}
                {text}
              </Text>
            ))}
          </View>
        </View>
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
  inline: {
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
  },
  color: {
    color: Colors.textSecondary,
  },
  small: {
    fontSize: 11,
  },
  marginTop: {
    marginTop: 8,
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
