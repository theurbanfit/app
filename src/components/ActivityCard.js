import * as React from 'react';
import {Title, Text, Divider} from 'react-native-paper';
import {View, StyleSheet, Image} from 'react-native';
import {textSecondary} from './colors';

export const ActivityCard = ({
  imageSrc,
  title,
  startTime,
  endTime,
  fullAddress,
  tags = [],
}) => (
  <>
    <View style={styles.container}>
      <View>
        <Title>{title}</Title>
        <Text style={[styles.marginBottom, styles.color]}>
          {startTime} - {endTime}
        </Text>
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
  </>
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
