import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import UserAvatar from './components/UserAvatar';
import UserInfo from './components/UserInfo';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useFetchUser} from './hooks';

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

const updateUserAvatar = async (uid, photoURL) => {
  await firestore().collection('users').doc(uid).update({photoURL: photoURL});
};

export default function UserProfileScreen() {
  const {user, userData} = useFetchUser();
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
      <View style={styles.container}>
        <UserAvatar
          onUploadAvatar={handleAvatarUpload}
          source={userData?.photoURL}
          loading={imageIsUploading}
        />
        <UserInfo displayName={userData?.displayName} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    margin: 12,
    flexDirection: 'row',
    flex: 1,
  },
  box1: {
    width: 75,
    height: 75,
    // Uncomment the following style to see flex effects
    //flex: 1,
    backgroundColor: 'steelblue',
  },
  box2: {
    width: 75,
    height: 75,
    // Uncomment the following style to see flex effects
    //flex: 2,
    backgroundColor: 'pink',
  },
  box3: {
    width: 75,
    height: 75,
    // Uncomment the following style to see flex effects
    //flex: 3,
    backgroundColor: 'orange',
  },
});
