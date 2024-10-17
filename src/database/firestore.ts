import {getFirestore} from "firebase/firestore";
import app from "../configs/firebaseConfig";

const db = getFirestore(app);

export default db;