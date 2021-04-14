import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {IconButton, Headline, Text, Divider} from 'react-native-paper';
import {white} from '../../components/colors';

export default function ActivityDetailsScreen({
  navigation,
  route: {
    params: {imageSrc, title, fullAddress, date, startTime, endTime},
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
        <Headline style={styles.headline}>{title}</Headline>
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
      </ContainerView>

      <Divider style={styles.divider} />
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
  },
  headline: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 30,
  },
  text: {
    marginBottom: 4,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 16,
    marginBottom: 16,
  },
});
