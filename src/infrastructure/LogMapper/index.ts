import {log} from '@/api/LogRepository';
import {DocumentData} from '@firebase/firestore';

    export function mapLogFromResponse(id: string, data: DocumentData): log {
        return {
            id: id,
            description: data?.description,
            time: data?.time
        }
    }