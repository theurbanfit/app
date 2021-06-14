import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import UserAvatar from '../../components/UserAvatar';
import UserInfo from '../../components/UserInfo';
import {launchImageLibrary} from 'react-native-image-picker';
import {ContainerView} from '../../components/ContainerView';
import {UserSchedule} from '../../components/UserSchedule';
import {uploadImageOnFirestorage, updateUserProfilePhoto} from './services';
import {AuthContext} from '../auth/AuthProvider';
import {ProfileContext} from './ProfileProvider';
import {useTheme} from 'react-native-paper';
import {FormButton} from '../../components/FormButton';
import {useNavigation} from '@react-navigation/native';
// import UserSubscriptions from './UserSubscriptionsScreen';

export default function UserProfileScreen() {
  const navigation = useNavigation();

  const {styles} = useStyles();
  const {auth} = useContext(AuthContext);
  const {profile} = useContext(ProfileContext);

  const [imageIsUploading, setLoading] = useState(false);

  const handleAvatarUpload = () => {
    const imagePickerOptions = {
      noData: true,
      quality: 0.3,
    };

    launchImageLibrary(
      imagePickerOptions,
      async ({didCancel, error, fileName, uri}) => {
        if (didCancel) {
          setLoading(false);
        } else if (error) {
          setLoading(false);
          Alert.alert(
            'Error',
            'An error occurred while uploading your profile photo',
          );
        } else {
          try {
            setLoading(true);
            const imageUrl = await uploadImageOnFirestorage(
              uri,
              fileName,
              'profilePhotos',
            );
            await updateUserProfilePhoto(auth?.uid, imageUrl);
            setLoading(false);
            Alert.alert('Success', 'Upload successful');
          } catch (e) {
            console.error(e);
            Alert.alert(
              'Error',
              'An error occurred while uploading your profile photo',
            );
            setLoading(false);
          }
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ContainerView style={styles.flexRow}>
        <UserAvatar
          onUploadAvatar={handleAvatarUpload}
          source={profile?.photoURL}
          loading={imageIsUploading}
        />
        <UserInfo
          displayName={profile?.displayName}
          total={profile?.totalCheckIns}
        />
      </ContainerView>
      {/*<UserSubscriptions />*/}
      <UserSchedule scheduledClasses={profile?.schedule} />
    </SafeAreaView>
  );
}
const useStyles = () => {
  const {colors} = useTheme();

  return {
    theme: {colors},
    styles: StyleSheet.create({
      flex: {
        flex: 1,
        backgroundColor: colors.background,
      },
      flexRow: {
        flexDirection: 'row',
      },
    }),
  };
};
