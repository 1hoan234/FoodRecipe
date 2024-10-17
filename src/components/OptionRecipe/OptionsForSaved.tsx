import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import { getData, storeData } from '../../helper/storageHelper';
import addShoppingList from '../../helper/addShoppingList';

type Props = {
    _id : string;
    close: () => void;
    updateData: (_id: string) => void; 
    showNotice: () => void;
};

const OptionForSaved: React.FC<Props> = ({ close, _id, updateData, showNotice }) => {

    const deleteItem = async () => {
        const data = await getData('saved');
        const newData = data.filter((value: string) => value !== _id);
        await storeData('saved', newData);
        updateData(_id);
        close();
    };

    const handleAddShoopingList = async () => {
        await addShoppingList(_id);
        close();
        showNotice();
    };

    return (
        <View style={styles.option2}>
            <View>
                <TouchableOpacity style={[styles.btnOptionSend]} onPress={handleAddShoopingList}>
                    <Text style={styles.textBtnOption}>Add to </Text>
                    <FontAwesomeIcon icon={faCartShopping} size={18} color="#65676b"/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnOptionDelete, { marginVertical: 4 }]} onPress={deleteItem}>
                    <Text style={styles.textBtnOption}>Remove</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.btnCancel} onPress={close}>
                    <FontAwesomeIcon icon={faXmark} size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OptionForSaved;
