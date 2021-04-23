import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Dimensions, StyleSheet, View} from 'react-native';
import {
  Searchbar,
  Modal,
  Portal,
  Subheading,
  Text,
  Dialog,
  Button,
} from 'react-native-paper';
import {divider, white} from './colors';
import {Switch} from './Switch';

export const SearchTopBar = ({
  activeDistricts = [],
  allowedDistricts,
  onAllowedDistrictsSet,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onChangeSearch = query => setSearchQuery(query);

  console.log(visible);
  return (
    <>
      <TouchableOpacity onPress={() => showModal()}>
        <View>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <SearchModal
          onChangeSearch={onChangeSearch}
          allowedDistricts={allowedDistricts}
          visible={visible}
          activeDistricts={activeDistricts}
          onHideModal={hideModal}
          onAllowedDistrictsSet={onAllowedDistrictsSet}
        />
      </TouchableOpacity>
    </>
  );
};

let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  search: {
    borderBottomWidth: 1,
    borderBottomColor: divider,
  },
  container: {
    flex: 1,
  },
  modalBackground: {
    backgroundColor: white,
  },
  modalHeight: {
    height: ScreenHeight,
  },
  marginFilters: {
    marginBottom: 16,
    marginTop: 20,
  },
  inline: {
    marginBottom: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const SearchModal = ({
  activeDistricts,
  allowedDistricts,
  onChangeSearch,
  onHideModal,
  onAllowedDistrictsSet,
  visible,
}) => {
  const [districtFilters, setDistrictFilter] = useState([]);
  useEffect(() => {
    setDistrictFilter(allowedDistricts);
  }, [allowedDistricts]);

  const handleSwitchValueChange = districtId =>
    setDistrictFilter(() => {
      const districtIsOn = districtFilters.some(item => item === districtId);

      return districtIsOn
        ? districtFilters.filter(item => item !== districtId)
        : [...districtFilters, districtId];
    });

  const handleFilterAppliance = () => {
    onAllowedDistrictsSet(districtFilters);
    onHideModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onHideModal}
        contentContainerStyle={styles.modalBackground}>
        <View stlye={styles.modalHeight}>
          <Searchbar
            onIconPress={() => onHideModal()}
            icon="arrow-left"
            placeholder="Search"
            onChangeText={onChangeSearch}
          />
        </View>

        <View style={styles.marginFilters}>
          <Subheading>Select areas close to you</Subheading>
          {activeDistricts?.map(({name, districtId}) => (
            <View key={districtId} style={styles.inline}>
              <Text>{name}</Text>
              <Switch
                isOn={allowedDistricts?.some(itemId => districtId === itemId)}
                onValueChange={() => handleSwitchValueChange(districtId)}
              />
            </View>
          ))}
        </View>
        <Dialog.Actions>
          <Button uppercase={false} onPress={onHideModal}>
            Cancel
          </Button>
          <Button
            onPress={handleFilterAppliance}
            uppercase={false}
            style={{marginLeft: 12}}
            mode="contained">
            Apply filters
          </Button>
        </Dialog.Actions>
      </Modal>
    </Portal>
  );
};
