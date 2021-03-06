import React, {useState, useContext} from 'react';
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
  useTheme,
} from 'react-native-paper';
import {ReadMoreText} from '../../components/ReadMoreText';
import {AuthContext} from '../auth/AuthProvider';
import {
  scheduleStatuses,
  useScheduleStatus,
} from './asyncHooks/useScheduleStatus';
import {addClassToUserSchedule, removeClassFromUserSchedule} from './_services';
import {
  displayActivityDate,
  formatFirestoreDateToMoment,
} from '../../components/utils/datetime';

const ConfirmationDialog = ({
  onConfirm,
  onDismiss,
  title,
  content,
  confirmationText,
  visible,
  actionInProgress,
}) => {
  const {colors} = useTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        {content && (
          <Dialog.Content>
            <Paragraph>{content}</Paragraph>
          </Dialog.Content>
        )}
        <Dialog.Actions>
          <Button
            uppercase={false}
            onPress={onDismiss}
            labelStyle={{color: colors.secondary}}>
            Close
          </Button>
          <Button
            loading={actionInProgress}
            disabled={actionInProgress}
            uppercase={false}
            style={{marginLeft: 12}}
            mode="contained"
            onPress={onConfirm}>
            {confirmationText}
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
      facilityAddress,
      eventDateTimeFormatted,
      eventTimeRange,
      classId,
      classImportantInfo,
      classDescription,
      classPreparationInfo,
      classArrivalInfo,
      facilityDistrictName,
      facilityDescription,
      scheduledClassId,
    },
  },
}) {
  const {
    theme: {colors},
    styles,
  } = useStyles();

  const {auth} = useContext(AuthContext);
  const [confirmationDialogOpen, setConfirmationDialogView] = useState(false);
  const [cancellationDialogOpen, setCancellationDialogView] = useState(false);
  const [confirmationInProgress, setConfirmationLoading] = useState(false);
  const [cancellationInProgress, setCancellationLoading] = useState(false);
  const {scheduledClassStatus} = useScheduleStatus(scheduledClassId);

  const eventDate = formatFirestoreDateToMoment(eventDateTimeFormatted);
  const handleConfirmation = async () => {
    setConfirmationLoading(true);
    await addClassToUserSchedule(auth.uid, {
      imageSrc,
      title,
      facilityAddress,
      eventDateTimeFormatted,
      eventTimeRange,
      classId,
      classImportantInfo,
      classDescription,
      classPreparationInfo,
      classArrivalInfo,
      facilityDescription,
      scheduledClassId,
    });
    setConfirmationDialogView(false);
    setConfirmationLoading(false);
  };

  const handleCancellation = async () => {
    setCancellationLoading(true);
    await removeClassFromUserSchedule(auth.uid, scheduledClassId);
    setCancellationDialogView(false);
    setCancellationLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <IconButton
          color={colors.white}
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
          <View style={styles.inline}>
            <Text style={styles.text}>{facilityAddress}</Text>
            <Text style={styles.text}>{facilityDistrictName}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.text}>{displayActivityDate(eventDate)}</Text>
            <Text style={styles.text}>{eventTimeRange}</Text>
          </View>

          <View>
            <Divider style={styles.firstDivider} />
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
            <ReadMoreText>{classPreparationInfo}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>How to arrive</Headline>
            <ReadMoreText>{classArrivalInfo}</ReadMoreText>
          </View>
          <View>
            <Divider style={styles.divider} />
            <Headline style={styles.headlineMarginSm}>About</Headline>
            <ReadMoreText>{facilityDescription}</ReadMoreText>
          </View>
        </ContainerView>
      </ScrollView>
      <View style={styles.surface}>
        {(() => {
          switch (scheduledClassStatus) {
            case scheduleStatuses.pending:
              return (
                <Button
                  style={styles.bookMeButton}
                  mode="contained"
                  disabled={true}
                  loading={true}
                />
              );
            case scheduleStatuses.scheduled:
              return (
                <Button
                  style={styles.bookMeButton}
                  labelStyle={styles.cancelButton}
                  uppercase={false}
                  onPress={() => setCancellationDialogView(true)}>
                  Cancel reservation
                </Button>
              );
            case scheduleStatuses.notScheduled:
              return (
                <Button
                  style={styles.bookMeButton}
                  mode="contained"
                  uppercase={false}
                  onPress={() => setConfirmationDialogView(true)}>
                  Add to schedule
                </Button>
              );
          }
        })()}
      </View>

      <ConfirmationDialog
        actionInProgress={confirmationInProgress}
        visible={confirmationDialogOpen}
        onConfirm={handleConfirmation}
        onDismiss={() => setConfirmationDialogView(false)}
        title={'Add to schedule?'}
        content={
          "Check partner's cancellation policy to avoid late cancelation or no show-fees."
        }
        confirmationText={'Add class'}
      />
      <ConfirmationDialog
        actionInProgress={cancellationInProgress}
        visible={cancellationDialogOpen}
        onConfirm={handleCancellation}
        onDismiss={() => setCancellationDialogView(false)}
        title={'Remove from schedule?'}
        content={'The class will be removed from your schedule, are you sure?'}
        confirmationText={'Cancel class'}
      />
    </SafeAreaView>
  );
}

const useStyles = () => {
  const theme = useTheme();

  return {
    theme,
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background,
        flex: 1,
      },
      scrollView: {
        flex: 1.9,
      },
      surface: {
        flex: 0.07,
        borderTopColor: theme.colors.divider,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      navButton: {
        color: theme.colors.white,
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
        fontSize: 32,
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
      firstDivider: {
        marginTop: 8,
        marginBottom: 24,
      },
      divider: {
        marginTop: 24,
        marginBottom: 24,
      },
      bookMeButton: {
        alignSelf: 'stretch',
        marginLeft: 12,
        marginRight: 12,
      },
      cancelButton: {
        color: theme.colors.secondary,
      },
    }),
  };
};
