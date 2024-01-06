import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    Firestore,
    getDocs,
    getFirestore,
    setDoc
} from "firebase/firestore";
import {mapLogFromResponse} from '@/infrastructure/LogMapper';
import {log} from '@/api/LogRepository';

let instance: FirestoreInitializer | null;
let app;
let db: Firestore;

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

class FirestoreInitializer {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.init();
    }

    init() {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app)
    }

    async get(path: string): Promise<log[] | undefined> {
        try {
            let formattedLogs: log[] = [];
            const response = await getDocs(collection(db, path))

            response.forEach(document => {
                formattedLogs.push(mapLogFromResponse(document.id, document.data()));
            })

            return formattedLogs
        }
        catch (e: unknown) {
            console.error(e)
        }

    }

    async add(path: string, data: Partial<log>): Promise<DocumentReference | {}> {
        try {
            const docRef = await addDoc(collection(db, path), data)

            return docRef
        }
        catch (e: unknown) {
            console.error(e)
            return {};
        }

    }

    async update(path: string, id: string, data: Partial<log>): Promise<boolean> {
        try {
            await setDoc(doc(db, path, id), data)

            return true
        }
        catch (e: unknown) {
            console.error(e)
            return false;
        }

    }

    async delete(path: string, id: string): Promise<boolean> {
        try {
            await deleteDoc(doc(db, path, id))

            return true
        }
        catch (e: unknown) {
            console.error(e)
            return false;
        }

    }
}

const firestoreInstance = Object.freeze(new FirestoreInitializer());
export default firestoreInstance;
