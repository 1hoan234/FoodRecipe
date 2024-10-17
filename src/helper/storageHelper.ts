import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Saved ${key}: ${jsonValue}`);
    } catch (error) {
      console.error('Error saving data:', error);
    }
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading data:', error);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Removed ${key}`);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Cleared all storage');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
const keyExists = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
      return false;
    }
  };

  function deleteData(key: string, value: any): void {
    // Lấy dữ liệu từ local storage
    const data = localStorage.getItem(key);

    // Kiểm tra nếu dữ liệu tồn tại
    if (data) {
        // Chuyển đổi chuỗi JSON thành mảng
        let array = JSON.parse(data);

        // Kiểm tra nếu dữ liệu là mảng
        if (Array.isArray(array)) {
            // Lọc bỏ phần tử có giá trị bằng value
            array = array.filter((item) => item !== value);

            // Lưu lại mảng đã chỉnh sửa vào local storage
            localStorage.setItem(key, JSON.stringify(array));
        } else {
            console.warn(`Dữ liệu lưu trong key "${key}" không phải là mảng.`);
        }
    } else {
        console.warn(`Không tìm thấy dữ liệu trong key "${key}".`);
    }
}

export { storeData, getData, removeData, clearAll, keyExists,deleteData };