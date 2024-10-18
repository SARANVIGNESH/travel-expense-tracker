

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfile } from "firebase/auth";
import { useSelector } from 'react-redux';
import { color } from 'react-native-tailwindcss';

const EditProfileScreen = () => {
    const {user} = useSelector(state => state.user);

  const [userData, setUserData] = useState({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  });

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setUserData({ ...userData, photoURL: response.assets[0].uri });
      }
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        phoneNumber: userData.phoneNumber,

      });
      Alert.alert("Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error updating profile", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={user.photoURL ? { uri: userData.photoURL } : require('../assets/user.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userData.displayName}
        onChangeText={(text) => setUserData({ ...userData, displayName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        editable={false} // Email should generally not be editable in a profile
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userData.phoneNumebr}
        onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
      />
      {/* <Button title="Save Changes" onPress={handleSave} /> */}
      <TouchableOpacity onPress={handleSave} style={{backgroundColor: color.green500}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
          <Text className='text-center text-white text-lg font-bold '>Save</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  }
});

export default EditProfileScreen;


