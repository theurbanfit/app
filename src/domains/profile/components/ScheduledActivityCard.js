import React, {useState, useEffect} from 'react';
import {Title, Text, Divider, Menu, IconButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {white} from '../../../components/colors';
import {displayActivityDateAndTime} from '../../../components/utils/datetime';

export const ScheduledActivityCard = ({
  scheduledClassId,
  title,
  fullAddress,
  dateTime,
  onViewCard,
}) => {
  const [menuVisible, setMenuVisibility] = useState(false);

  useEffect(() => {
    return setMenuVisibility(false);
  }, []);
  return (
    <>
      <View key={scheduledClassId} style={[styles.inline, styles.card]}>
        <View>
          <Title>{title}</Title>
          <Text>{displayActivityDateAndTime(dateTime)}</Text>
          <Text>{fullAddress}</Text>
        </View>
        <View>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisibility(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={28}
                onPress={() => setMenuVisibility(true)}
              />
            }>
            <Menu.Item
              onPress={() => {
                onViewCard(scheduledClassId);
                setMenuVisibility(false);
              }}
              title="View class details"
            />
          </Menu>
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: white,
    padding: 16,
    paddingBottom: 20,
  },
});
