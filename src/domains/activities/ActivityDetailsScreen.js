import React from 'react';
import {View, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {IconButton, Headline, Text, Divider} from 'react-native-paper';
import {background, white} from '../../components/colors';
import {ReadMoreText} from '../../components/ReadMoreText';

export default function ActivityDetailsScreen({
  navigation,
  route: {
    params: {
      imageSrc,
      title,
      fullAddress,
      date,
      timeRange,
      classImportantInfo,
      classDescription,
      howToPrepare,
      howToArrive,
      facilityDescription,
    },
  },
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
            <Text style={styles.text}>{timeRange}</Text>
          </View>

          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>
              About this course
            </Headline>
            <ReadMoreText>{classDescription}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>
              Important information
            </Headline>
            <ReadMoreText>{classImportantInfo}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>How to prepare</Headline>
            <ReadMoreText>{howToPrepare}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>How to arrive</Headline>
            <ReadMoreText>{howToArrive}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>About</Headline>
            <ReadMoreText>{facilityDescription}</ReadMoreText>
          </View>
        </ContainerView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: background},
  navButton: {
    color: white,
    position: 'absolute',
    zIndex: 2,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
    marginBottom: 20,
  },
  headlineSize: {
    fontWeight: '600',
    fontSize: 36,
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
    marginTop: 30,
    marginBottom: 30,
  },
});
