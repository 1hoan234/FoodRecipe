import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './src/screens/Intro/Intro';
import Home from './src/screens/Home/Home';
import Recipe from './src/screens/Recipe/Recipe';
import Search from './src/screens/Search/Search';
import Category from './src/screens/Category/Category';
import MealPlanner from './src/screens/MealPlanner/MealPlanner';
import Setting from './src/screens/Setting/Setting';
import Language from './src/screens/Setting/Language';
import MSystem from './src/screens/Setting/MSystem';
import Display from './src/screens/Setting/Display';
import AboutUs from './src/screens/Setting/AboutUs';
import Saved from './src/screens/Saved/Saved';

export type RootStackParamList = {
    Intro: undefined;
    Home: { user: any; prevAddress: any };
    Recipe: { _id: string };
    Search: undefined;
    Category: { category: string };
    MealPlanner: undefined;
    Setting: { language: string };
    Language: { language: string };
    MSystem: undefined;
    Display: undefined;
    AboutUs: undefined;
    Saved: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#32363b" />
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false}}/>
                <Stack.Screen name ="Language" component={Language} options={{headerShown: false}}/>
                <Stack.Screen name ="MSystem" component={MSystem} options={{headerShown: false}}/>
                <Stack.Screen name ="Display" component={Display} options={{headerShown: false}}/>
                <Stack.Screen name ="AboutUs" component={AboutUs} options={{headerShown: false}}/>
                <Stack.Screen name ="Saved" component={Saved} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
