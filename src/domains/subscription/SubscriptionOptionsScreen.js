import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Subheading,
  Headline,
} from 'react-native-paper';
import {ContainerView} from '../../components/ContainerView';
import {FormButton} from '../../components/FormButton';

export default function SubscriptionOptionsScreen() {
  const {styles} = useStyles();
  const [activeCard, setActiveCard] = useState(1);
  return (
    <SafeAreaView style={styles.container}>
      <ContainerView style={styles.flexRow}>
        <Card
          style={[
            styles.card,
            activeCard === 0 ? styles.activeCard : styles.inactiveCard,
          ]}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => setActiveCard(0)}>
            <Card.Content style={{margin: 0, padding: 0}}>
              <Headline
                style={[
                  styles.center,
                  activeCard !== 0 && styles.inactiveText,
                ]}>
                S
              </Headline>
              <Subheading
                style={[
                  styles.center,
                  styles.subheader,
                  activeCard !== 0 && styles.inactiveText,
                ]}>
                20€{' '}
                <Subheading
                  style={[
                    styles.center,
                    activeCard !== 0 && styles.inactiveText,
                    styles.monthParagraph,
                  ]}>
                  per month
                </Subheading>
              </Subheading>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card
          style={[
            styles.card,
            activeCard === 1 ? styles.activeCard : styles.inactiveCard,
          ]}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => setActiveCard(1)}>
            <Card.Content>
              <Headline
                style={[
                  styles.center,
                  activeCard !== 1 && styles.inactiveText,
                ]}>
                M
              </Headline>
              <Subheading
                style={[
                  styles.center,
                  styles.subheader,
                  activeCard !== 1 && styles.inactiveText,
                ]}>
                59€{' '}
                <Subheading
                  style={[
                    styles.center,
                    activeCard !== 1 && styles.inactiveText,
                    styles.monthParagraph,
                  ]}>
                  per month
                </Subheading>
              </Subheading>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card
          style={[
            styles.card,
            activeCard === 2 ? styles.activeCard : styles.inactiveCard,
          ]}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => setActiveCard(2)}>
            <Card.Content>
              <Headline
                style={[
                  styles.center,
                  activeCard !== 2 && styles.inactiveText,
                ]}>
                L
              </Headline>
              <Subheading
                style={[
                  styles.center,
                  styles.subheader,
                  activeCard !== 2 && styles.inactiveText,
                ]}>
                89€{' '}
                <Subheading
                  style={[
                    styles.center,
                    activeCard !== 2 && styles.inactiveText,
                    styles.monthParagraph,
                  ]}>
                  per month
                </Subheading>
              </Subheading>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      </ContainerView>
      <View style={[styles.bottom]}>
        <Card style={styles.cardForDetails}>
          <ScrollView style={[styles.cardForDetailsContent, styles.scrollView]}>
            <Card.Content>
              {activeCard === 0 && (
                <>
                  <Title style={styles.center}>Details for Small package</Title>
                  <Paragraph style={styles.center}>Hello world</Paragraph>
                </>
              )}
              {activeCard === 1 && (
                <>
                  <Title style={styles.center}>
                    Details for Medium package
                  </Title>
                  <Paragraph style={styles.center}>Hello world</Paragraph>
                </>
              )}

              {activeCard === 2 && (
                <>
                  <Title style={styles.center}>Details for Large package</Title>
                  <Paragraph style={styles.center}>Hello world</Paragraph>
                </>
              )}
            </Card.Content>
          </ScrollView>
          <View style={styles.surface}>
            <FormButton title="Next" modeValue="contained" onPress={() => {}} />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const {colors} = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        flex: 1,
      },
      flexRow: {
        marginTop: 4,
        flexDirection: 'column',
        alignContent: 'space-between',
      },
      bottom: {
        marginTop: 12,
        flex: 1,
      },
      scrollView: {
        flex: 1.6,
      },
      surface: {
        flex: 0.25,
        borderTopColor: colors.divider,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      center: {
        textAlign: 'center',
      },
      subheader: {
        fontWeight: 'bold',
        marginBottom: 0,
      },
      monthParagraph: {
        lineHeight: 14,
        marginTop: 0,
      },
      card: {
        margin: 6,
        borderRadius: 28,
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: {
          width: 0.005,
          height: 0.005,
        },
      },
      cardContent: {
        paddingTop: 8,
        paddingBottom: 12,
      },
      inactiveCard: {
        backgroundColor: colors.secondary,
      },
      activeCard: {
        backgroundColor: colors.primary,
      },
      inactiveText: {
        color: colors.white,
      },
      cardForDetails: {
        height: '100%',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        backgroundColor: colors.background100,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      cardForDetailsContent: {
        marginTop: 22,
      },
    }),
  };
};
