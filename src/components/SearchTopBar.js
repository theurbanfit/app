import React, {useState, useEffect, createRef, useRef, forwardRef} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContainerView} from './ContainerView';

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

  return (
    <>
      <TouchableOpacity onPress={() => showModal()}>
        <Searchbar
          style={[styles.search, styles.noShadow]}
          inputStyle={{}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </TouchableOpacity>
      <SearchModal
        onChangeSearch={onChangeSearch}
        allowedDistricts={allowedDistricts}
        visible={visible}
        activeDistricts={activeDistricts}
        onHideModal={hideModal}
        onAllowedDistrictsSet={onAllowedDistrictsSet}
      />
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    borderBottomWidth: 1,
    borderBottomColor: divider,
  },
  container: {
    flex: 1,
  },
  noShadow: {
    borderBottomColor: divider,
    borderBottomWidth: 1,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0, // elevation = 4
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
      <Modal visible={visible} onDismiss={onHideModal}>
        <SafeAreaView style={[modalStyles.container]}>
          <View styles={[modalStyles.scrollView]}>
            <Searchbar
              ref={ref => ref?.focus()}
              style={modalStyles.noShadow}
              onIconPress={() => onHideModal()}
              icon="arrow-left"
              placeholder="Search"
              onChangeText={onChangeSearch}
            />
            <ContainerView style={modalStyles.marginFilters}>
              <Subheading>Select areas close to you</Subheading>
              {activeDistricts?.map(({name, districtId}) => (
                <View key={districtId} style={modalStyles.inline}>
                  <Text>{name}</Text>
                  <Switch
                    isOn={allowedDistricts?.some(
                      itemId => districtId === itemId,
                    )}
                    onValueChange={() => handleSwitchValueChange(districtId)}
                  />
                </View>
              ))}
            </ContainerView>
          </View>
          <View styles={[modalStyles.surface]}>
            <Dialog.Actions>
              <Button uppercase={false} onPress={onHideModal}>
                Cancel
              </Button>
              <Button
                onPress={handleFilterAppliance}
                uppercase={false}
                style={modalStyles.buttonMargin}
                mode="contained">
                Apply filters
              </Button>
            </Dialog.Actions>
          </View>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

const modalStyles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: white,
  },
  scrollView: {
    flex: 1.9,
  },
  surface: {
    alignSelf: 'flex-end',
    flex: 0.1,
  },
  modalBackground: {},
  noShadow: {
    borderBottomColor: divider,
    borderBottomWidth: 1,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0, // elevation = 4
    shadowOffset: {
      width: 0,
      height: 0,
    },
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

  buttonMargin: {marginLeft: 12},
});
