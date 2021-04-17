import React, {useState} from 'react';
import {Title, Text, Divider, Menu, IconButton} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {white} from '../../../components/colors';
import {displayActivityDate} from '../../../components/utils/datetime';

export const ScheduledActivityCard = ({
  scheduledClassId,
  title,
  fullAddress,
  dateTime,
  onViewCard,
}) => {
  const [menuVisible, setMenuVisibility] = useState(false);

  return (
    <>
      <View key={scheduledClassId} style={[styles.inline, styles.card]}>
        <View>
          <Title>{title}</Title>
          <Text>{displayActivityDate(dateTime)}</Text>
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
            <Menu.Item onPress={onViewCard} title="View class details" />
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
