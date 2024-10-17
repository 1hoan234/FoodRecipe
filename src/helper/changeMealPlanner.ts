import { getData, storeData } from "./storageHelper";

const removeRecipe= async (_id: string, type: 'lunch' | 'dinner', index: number): Promise<void> => {
    try {
        // Fetch the current weekly plan
        const data = await getData('weeklyPlan');
        if (!data || !data.plan) throw new Error("Weekly plan not found");

        const plan = [...data.plan];
        const mealPlanner = plan[index];

        if (!mealPlanner) throw new Error(`No meal planner found at index ${index}`);

        if (type === 'lunch') {
            mealPlanner.lunch = mealPlanner.lunch.filter((item: any) => item._id !== _id);
        } else if (type === 'dinner') {
            mealPlanner.dinner = mealPlanner.dinner.filter((item: any) => item._id !== _id);
        } else {
            throw new Error(`Invalid type: ${type}`);
        }

        plan[index] = mealPlanner;
        await storeData('weeklyPlan', {
            ...data,
            plan,
        });

        console.log(`Recipe with _id: ${_id} successfully deleted from ${type} at index ${index}`);
    } catch (error:any) {
        console.error("Error deleting recipe:", error.message);
    }
};


export default removeRecipe;