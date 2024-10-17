import AsyncStorage from '@react-native-async-storage/async-storage';

// Hàm lấy dữ liệu từ AsyncStorage
export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value); // Nếu có dữ liệu, trả về dạng JSON
        }
        return null; // Nếu không có dữ liệu
    } catch (error) {
        console.error('Error getting data from AsyncStorage', error);
        return null;
    }
};

// Hàm lưu dữ liệu vào AsyncStorage
export const setData = async (key: string, data: any[]) => {
    try {
        const jsonValue = JSON.stringify(data); // Chuyển dữ liệu thành JSON
        await AsyncStorage.setItem(key, jsonValue); // Lưu vào AsyncStorage
        console.log('Data successfully saved to AsyncStorage');
    } catch (error) {
        console.error('Error setting data to AsyncStorage', error);
    }
};

export const deleteData = async (key: string, idToRemove: string): Promise<void> => {
    try {
      // Lấy dữ liệu hiện có từ AsyncStorage
      const jsonValue = await AsyncStorage.getItem(key);
  
      if (jsonValue) {
        // Chuyển đổi dữ liệu từ JSON sang mảng
        const data = JSON.parse(jsonValue);
  
        // Kiểm tra xem dữ liệu có phải là mảng không
        if (Array.isArray(data)) {
          // Lọc dữ liệu, giữ lại những phần tử không có `id` trùng với `idToRemove`
          const filteredData = data.filter((item: { id: string }) => item.id !== idToRemove);
  
          // Cập nhật AsyncStorage với mảng đã lọc
          await AsyncStorage.setItem(key, JSON.stringify(filteredData));
  
          console.log(`Data with id ${idToRemove} successfully removed from ${key}`);
        } else {
          console.warn(`Data for key ${key} is not an array.`);
        }
      } else {
        console.warn(`No data found for key ${key}`);
      }
    } catch (error) {
      console.error('Error deleting data from AsyncStorage', error);
    }
  };
  
