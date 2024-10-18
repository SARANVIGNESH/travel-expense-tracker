import AsyncStorage from "@react-native-async-storage/async-storage";

 const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
        
    }
    } catch (error) {
      // Error retrieving data
    }
  };

  export default {
    storeData,
    retrieveData
  }