import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Searchbar,
  Modal,
  Portal,
  Subheading,
  Text,
  Dialog,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {Switch} from './Switch';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContainerView} from './ContainerView';
import {MoveToBottom} from './MoveToBottom';

export const SearchTopBar = ({
  activeDistricts = [],
  allowedDistricts,
  searchQuery,
  onAllowedDistrictsSet,
  onSearchQuerySet,
}) => {
  const {
    styles,
    theme: {colors},
  } = useStyles();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <View style={styles.inline}>
        <Searchbar
          selectionColor={colors.secondary}
          style={[styles.search, styles.noShadow]}
          placeholder="Search"
          onChangeText={onSearchQuerySet}
          value={searchQuery}
        />
        <View style={styles.smWidth}>
          <IconButton
            size={28}
            color={colors.secondary}
            icon="tune"
            onPress={showModal}
          />
        </View>
      </View>
      <SearchModal
        searchQuery={searchQuery}
        onChangeSearch={onSearchQuerySet}
        allowedDistricts={allowedDistricts}
        visible={visible}
        activeDistricts={activeDistricts}
        onHideModal={hideModal}
        onAllowedDistrictsSet={onAllowedDistrictsSet}
      />
    </>
  );
};

const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      smWidth: {
        width: '14%',
        backgroundColor: colors.background,
      },
      inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
      },
      search: {
        backgroundColor: colors.background,
        width: '86%',
      },
      container: {
        flex: 1,
      },
      noShadow: {
        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0, // elevation = 4
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
    }),
  };
};

const SearchModal = ({
  activeDistricts,
  allowedDistricts,
  onChangeSearch,
  onHideModal,
  onAllowedDistrictsSet,
  visible,
  searchQuery,
}) => {
  const {colors} = useTheme();
  const modalStyles = useModalStyles();
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
              value={searchQuery}
              selectionColor={colors.secondary}
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
          <MoveToBottom>
            <Dialog.Actions>
              <Button
                uppercase={false}
                onPress={onHideModal}
                labelStyle={modalStyles.darkButton}>
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
          </MoveToBottom>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

const useModalStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    container: {
      height: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.background,
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
      backgroundColor: colors.background,
      borderBottomColor: colors.divider,
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
    buttonMargin: {
      marginLeft: 12,
    },
    darkButton: {
      color: colors.secondary,
    },
  });
};
