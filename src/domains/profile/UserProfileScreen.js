import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {Divider} from 'react-native-paper';
import UserAvatar from '../../components/UserAvatar';
import UserInfo from '../../components/UserInfo';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUser} from './asyncHooks';
import {ContainerView} from '../../components/ContainerView';
import {UserSchedule} from '../../components/UserSchedule';
import {uploadImageOnFirestorage, updateUserProfilePhoto} from './services';
import {AuthContext} from '../auth/AuthProvider';

export default function UserProfileScreen() {
  const {auth} = useContext(AuthContext);
  const {userData} = useUser();

  const [imageIsUploading, setLoading] = useState(false);

  console.log(userData);
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
            console.log(e);
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
    <SafeAreaView>
      <ContainerView style={styles.flexRow}>
        <UserAvatar
          onUploadAvatar={handleAvatarUpload}
          source={userData?.photoURL}
          loading={imageIsUploading}
        />
        <UserInfo displayName={userData?.displayName} />
      </ContainerView>
      <Divider />
      <ContainerView>
        <UserSchedule scheduledClasses={userData?.schedule} />
      </ContainerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    flexDirection: 'row',
  },
});
