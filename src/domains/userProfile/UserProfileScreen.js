import React, {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import UserAvatar from './components/UserAvatar';
import UserInfo from './components/UserInfo';
import {AuthContext} from '../auth/AuthProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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

const updateUserAvatar = async (currentUser, photoURL) => {
  await currentUser.updateProfile({
    photoURL:
      'https://images.unsplash.com/photo-1618111415321-b406d66958de?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  });
  await currentUser.reload();
};

export default function UserProfileScreen() {
  const {user} = useContext(AuthContext);
  const [imageIsUploading, setLoading] = useState(false);
  const handleAvatarUpload = () => {
    const imagePickerOptions = {
      noData: true,
    };

    launchImageLibrary(imagePickerOptions, async imagePickerResponse => {
      const {didCancel, error, fileName, uri} = imagePickerResponse;
      setLoading(true);
      if (didCancel) {
      } else if (error) {
        setLoading(false);
        alert('An error occurred while uploading your profile photo');
      } else {
        try {
          const imageUrl = await uploadImage(uri, fileName, 'profilePhotos');
          await updateUserAvatar(user, imageUrl);
          Alert.alert('Success', 'Upload successful');
          setLoading(false);
        } catch (e) {
          console.log(e);
          alert('An error occurred while uploading your profile photo');
          setLoading(false);
        }
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <UserAvatar
          onUploadAvatar={handleAvatarUpload}
          source={user.photoURL}
          loading={imageIsUploading}
        />
        <UserInfo displayName={user.displayName} />
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
