import React, { useState } from 'react';
import generateMealPlan from './test'; // Import the API function
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

function Test() {
    const [userData, setUserData] = useState({
        livingArea: 'Asian',
        familySize: 4,
        cookingTime: 30,
        diet: 'Vegan, Keto',
    });
    const [menu, setMenu] = useState(null);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const response = await generateMealPlan(userData);
        setMenu(response);
    };

    return (
        <View>
            <Text>Weekly Meal Planner</Text>
            <View>
                {/* <TextInput
                    type="text"
                    placeholder="Living Area"
                    value={userData.livingArea}
                    onChange={(e) => setUserData({ ...userData, livingArea: e.target.value })}
                />
                <TextInput
                    type="number"
                    placeholder="Family Size"
                    value={userData.familySize}
                    onChange={(e) => setUserData({ ...userData, familySize: parseInt(e.target.value) })}
                />
                <TextInput
                    type="number"
                    placeholder="Cooking Time (minutes)"
                    value={userData.cookingTime}
                    onChange={(e) => setUserData({ ...userData, cookingTime: parseInt(e.target.value) })}
                />
                <TextInput
                    type="text"
                    placeholder="Diet Preferences"
                    value={userData.diet}
                    onChange={(e) => setUserData({ ...userData, diet: e.target.value })}
                /> */}
                <TouchableOpacity onPress={handleSubmit}>
                    <Text>Generate Menu</Text>
                </TouchableOpacity>
            </View>

            {menu && (
                <View>
                    <Text>Your Weekly Menu</Text>
                    <View>{menu}</View>
                </View>
            )}
        </View>
    );
}

export default Test;
