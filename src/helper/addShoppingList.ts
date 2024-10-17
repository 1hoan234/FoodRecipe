import { getData, storeData } from "./storageHelper";

const addShoppingList = async (_id: string) => {
    const item = await getData('shoppingList');
    if (item) {
        const check = item.find((i: string) => i === _id);
        if (check) {
            return;
        }
        item.push(_id);
        await storeData('shoppingList', item);
    } else {
        await storeData('shoppingList', [_id]);
    }
};

export default addShoppingList;