import firestoreInstance from '@/services/FirestoreInitializer';

export type log = {
    id: string,
    description: string,
    time: number
}

export default class LogRepository {

    async getLogs() {
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
}