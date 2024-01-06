import firestoreInstance from '@/services/FirestoreInitializer';
import {DocumentReference} from 'firebase/firestore';

export type log = {
    id: string,
    description: string,
    time: number
}

export default class LogRepository {

    async getLogs(): Promise<log[] | []> {
        let formattedLogs: log[] = [];
        const logs = await firestoreInstance.get("log")

        if (logs === undefined) {
            throw new Error("Unable to process request.")
        }

         logs.forEach((doc) => {
            formattedLogs.push( {
                id: doc.id,
                description: doc.description,
                time: doc.time
            })
        });
        return formattedLogs;
    }

    async addLog(data: Partial<log>): Promise<DocumentReference | {}> {
        const id = await firestoreInstance.add("log", data)
        return id
    }

    async updateLog(id: string, data: Partial<log>): Promise<boolean> {
        const res = await firestoreInstance.update("log", id, data)
        return res
    }

    async deleteLog(id: string): Promise<boolean> {
        const res = await firestoreInstance.delete("log", id)
        return res
    }


}