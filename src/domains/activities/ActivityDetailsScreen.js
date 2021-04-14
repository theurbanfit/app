import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {IconButton, Headline, Text, Divider} from 'react-native-paper';
import {white} from '../../components/colors';
import {ReadMoreText} from '../../components/ReadMoreText';

export default function ActivityDetailsScreen({
  navigation,
  route: {
    params: {
      imageSrc,
      title,
      fullAddress,
      date,
      startTime,
      endTime,
      description,
    },
  },
}) {
  return (
    <SafeAreaView>
      <IconButton
        color={white}
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        onPress={() => navigation.navigate('ActivityFeed')}
      />
      <Image
        style={styles.image}
        source={{
          uri: imageSrc,
        }}
      />
      <ContainerView>
        <Headline style={[styles.headlineSize, styles.headlineMargin]}>
          {title}
        </Headline>
        <Text style={styles.text}>{fullAddress}</Text>
        <View style={styles.inline}>
          <Text style={styles.text}>
            {date.calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'ddd',
            })}
            , {date.format('MMM Do')}
          </Text>
          <Text style={styles.text}>
            {startTime} - {endTime}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View>
          <Headline style={styles.headlineMarginSm}>About this course</Headline>
          <ReadMoreText>{description}</ReadMoreText>
        </View>
      </ContainerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navButton: {
    color: white,
    position: 'absolute',
    top: 40,
    zIndex: 2,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
    marginBottom: 16,
  },
  headlineSize: {
    fontWeight: '600',
    fontSize: 30,
  },
  headlineMargin: {
    marginBottom: 16,
  },
  headlineMarginSm: {
    marginBottom: 8,
  },
  text: {
    marginBottom: 6,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
  },
});
