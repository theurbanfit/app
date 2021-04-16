import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import {ContainerView} from '../../components/ContainerView';
import {
  IconButton,
  Headline,
  Text,
  Divider,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {background, divider, white} from '../../components/colors';
import {ReadMoreText} from '../../components/ReadMoreText';

const ConfirmationDialog = ({onConfirm, onDismiss, visible}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button uppercase={false} onPress={onDismiss}>
            Close
          </Button>
          <Button
            uppercase={false}
            style={{marginLeft: 12}}
            mode="contained"
            onPress={onConfirm}>
            Add to schedule
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

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
  const [dialogOpen, toggleDialogView] = useState(false);

  const handleConfirmation = () => {
    toggleDialogView(false);
    alert('Booked');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
      <View style={styles.surface}>
        <Button
          style={styles.bookMeButton}
          mode="contained"
          uppercase={false}
          onPress={() => toggleDialogView(true)}>
          Add to schedule
        </Button>
      </View>

      <ConfirmationDialog
        visible={dialogOpen}
        onConfirm={handleConfirmation}
        onDismiss={() => toggleDialogView(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
  },
  scrollView: {
    flex: 1.9,
  },
  surface: {
    flex: 0.1,
    borderTopColor: divider,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  bookMeButton: {
    alignSelf: 'stretch',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
});
