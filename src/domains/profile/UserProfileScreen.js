import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {Divider} from 'react-native-paper';
import UserAvatar from '../../components/UserAvatar';
import UserInfo from '../../components/UserInfo';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useUser, useScheduledClasses} from './asyncHooks';
import {ContainerView} from '../../components/ContainerView';
import {UserSchedule} from '../../components/UserSchedule';

const uploadImage = async (uri, name, firebasePath = '') => {
  const imageRef = storage().ref(`${firebasePath}/${name}`);
  await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch(error => {
    throw error;
  });
  const url = await imageRef.getDownloadURL().catch(error => {
    throw error;
  });
  return url;
};

export default function UserProfileScreen() {
  const {scheduledClasses} = useScheduledClasses();

  const {user, userData} = useUser();

  const [imageIsUploading, setLoading] = useState(false);

  const handleAvatarUpload = () => {
    const imagePickerOptions = {
      noData: true,
      quality: 0.3,
    };

    launchImageLibrary(
      imagePickerOptions,
      async ({didCancel, error, fileName, uri}) => {
        const updateUserAvatar = async (uid, photoURL) => {
          await firestore()
            .collection('users')
            .doc(uid)
            .update({photoURL: photoURL});
        };

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
            const imageUrl = await uploadImage(uri, fileName, 'profilePhotos');
            await updateUserAvatar(user?.uid, imageUrl);
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
        <UserSchedule scheduledClasses={scheduledClasses} />
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
