import { getData, storeData } from "./storageHelper";

interface MealPlan {
    day: Date;
    lunch: string[];
    dinner: string[];
}

const repeatMealPlanner = async (recipe: string, day: string, type: string) : Promise<string> => {
    try {
        const data = await getData('nextWeekPlan');
        let mealPlanner : MealPlan[] = data.plan ? [...data.plan] : [];
        const baseDate = new Date(day);
        const nextWeek = new Date(baseDate);
        nextWeek.setDate(nextWeek.getDate() + 7);

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(nextWeek);
            currentDate.setDate(nextWeek.getDate() - nextWeek.getDay() + i);
            let mealDay = mealPlanner[i];
            if (mealDay) {
                if (i === nextWeek.getDay() && type === 'lunch') {
                    mealDay.lunch.push(recipe);
                } else if (i === nextWeek.getDay() && type === 'dinner') {
                    mealDay.dinner.push(recipe);
                }
                mealPlanner[i] = mealDay;
            }
            else {
                const newPlan: MealPlan = {
                    day: currentDate,
                    lunch: [],
                    dinner: [],
                };
                if (i === nextWeek.getDay() && type === 'lunch') {
                    newPlan.lunch.push(recipe);
                } else if (i === nextWeek.getDay() && type === 'dinner') {
                    newPlan.dinner.push(recipe);
                }
                mealPlanner[i] = newPlan;
            }
        }
        await storeData('nextWeekPlan', {
            plan: mealPlanner,
        });
        return 'Suceessfully repeated recipe next week!';
    }
    catch (err:any) {
        return err.message;
    }
};

export default repeatMealPlanner;