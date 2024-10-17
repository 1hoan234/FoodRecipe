import {collection, query, where, getDocs } from "firebase/firestore";
import db from "../database/firestore";
import { getData, storeData } from "./storageHelper";
import getWeek from "./getCurrentWeek";

async function getDishes() {
    const familyInfo = await getData('userInfor');
    const q = query(collection(db, "recipes"), where("category", "array-contains", familyInfo.area));

    const querySnapshot = await getDocs(q);
    let dishes : any = [];
    querySnapshot.forEach((doc) => {
        dishes.push({ _id: doc.id, ...doc.data() });
    });
    if (familyInfo.time === "Under 30 minutes") {
        dishes = dishes.filter((dish: any) => dish.time_cook.split(' ')[0] <= 30 && dish.time_cook.split(' ')[1] === 'min');
    }
    else if (familyInfo.time === "Under 1 hour") {
        dishes = dishes.filter((dish: any) => (dish.time_cook.split(' ')[0] <= 1 && dish.time_cook.split(' ')[1] === 'h') || (dish.time_cook.split(' ')[0] <= 30 && dish.time_cook.split(' ')[1] === 'min'));
    }
    else if (familyInfo.time === "Over 1 hour") {
        dishes = dishes.filter((dish: any) => dish.time_cook.split(' ')[0] >= 1 && dish.time_cook.split(' ')[1] === 'h');
    }

    const categorizedDishes: any = {
        LowCarb: [],
        Keto: [],
        Vegan: [],
    };

    // Filter dishes by dietary preferences
    dishes.forEach((dish: any) => {
        if (familyInfo.diets.includes('Vegan') && dish.is_vegetarian) {
            categorizedDishes.Vegan.push({ ...dish, label: 'Vegan' });
        }
        if (familyInfo.diets.includes('Keto') && isKeto(dish)) {
            categorizedDishes.Keto.push({ ...dish, label: 'Keto' });
        }
        if (familyInfo.diets.includes('Low carb') && isLowCarb(dish)) {
            categorizedDishes.LowCarb.push({ ...dish, label: 'Low carb' });
        }
    });

    return {
        dishes,
        categoriedDishes: categorizedDishes,
        diets: {
            diets: familyInfo.diets,
            others: familyInfo.numberPeople - familyInfo.quantity.reduce((total: number, q: number) => total + q, 0),
        },
    };
}

const isKeto = (dish: any) => {
    const cal = Number(dish.nutritions[0].Cal);
    return (
        Number(dish.nutritions[1].Fat.split(' ')[0]) <= 0.8 * cal &&
        Number(dish.nutritions[2].Protein.split(' ')[0]) <= 0.2 * cal &&
        Number(dish.nutritions[3].Carb.split(' ')[0]) <= 0.1 * cal
    );
};

const isLowCarb = (dish: any) => Number(dish.nutritions[3].Carb.split(' ')[0]) <= 70;

function createWeeklyPlan(categorizedDishes: any, totalDishes: any, diets: any) {
    const weeklyPlan = [];
    const usedDishes = new Set<string>();
    const { diets: dietTypes, others } = diets;
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let dayPlan: any = {
            day: currentDate,
            lunch: [],
            dinner: [],
        };

        // Assign dishes for dietary preferences
        const assignDishes = (meal: string) => {
            dietTypes.forEach((diet: any) => {
                if (diet !== '') {
                    const dietDishes = categorizedDishes[diet] || totalDishes;
                    const dish = getRandomDishFromList(dietDishes, usedDishes);
                    if (dish) {
                        dayPlan[meal].push({
                            _id: dish._id,
                            label: dish.label || diet,
                        });
                    }
                }
            });

            // Add dishes for remaining family members
            for (let i = 0; i < others; i++) {
                const dish = getRandomDishFromList(totalDishes, usedDishes);
                if (dish) {
                    dayPlan[meal].push({
                        _id: dish._id,
                        label: 'General',
                    });
                }
            }
        };

        assignDishes('lunch');
        assignDishes('dinner');

        weeklyPlan.push(dayPlan);
    }

    return weeklyPlan;
}


const getRandomDishFromList = (list: any[], usedSet: Set<string>) => {
    const availableDishes = list.filter((dish) => !usedSet.has(dish._id));
    if (availableDishes.length === 0) return null; // No dishes left to choose
    const randomDish = availableDishes[Math.floor(Math.random() * availableDishes.length)];
    usedSet.add(randomDish._id);
    return randomDish;
};

const createMealPlanner = async (): Promise<void> => {
    try {
        const dishes = await getDishes();

        const weeklyPlan = createWeeklyPlan(dishes.categoriedDishes, dishes.dishes, dishes.diets);
        const data = {
            plan: weeklyPlan,
        };

        await storeData('weeklyPlan', data);
    } catch (error) {
        console.error('Error generating weekly plan:', error);
    }
};

export default createMealPlanner;
