import { DocumentReference } from 'firebase/firestore';
import moment from 'moment';

import firestoreInstance from '@/services/FirestoreInitializer';

export type log = {
  id: string;
  description: string;
  time: number;
  date: number;
};

const MAX_UNIX_TIMESTAMP = 2147483647; //@todo: WILL have trouble in year 2038.

export default class LogRepository {
  formatLogs(logs: log[]): log[] | [] {
    let formattedLogs: log[] = [];

    logs.forEach((doc) => {
      formattedLogs.push({
        id: doc.id,
        description: doc.description,
        time: doc.time,
        date: doc.date,
      });
    });
    return formattedLogs;
  }

  async getLogs(): Promise<log[] | []> {
    const logs = await firestoreInstance.get('log');

    if (logs === undefined) {
      throw new Error('Unable to process request.');
    }

    return this.formatLogs(logs);
  }

  async getLogsOfToday(): Promise<log[] | []> {
    const startOfDay = parseInt(moment().startOf('day').format('X'), 10);
    const endOfDay = parseInt(moment().endOf('day').format('X'), 10);

    const logs = await firestoreInstance.getByQuery('log', '', startOfDay, endOfDay);

    if (logs === undefined) {
      throw new Error('Unable to process request.');
    }

    return this.formatLogs(logs);
  }

  async getFilteredLogs(description: string, startDate: string, endDate: string): Promise<log[] | []> {
    let formattedStartDate = 0;
    let formattedEndDate = MAX_UNIX_TIMESTAMP;

    if (startDate !== undefined) {
      formattedStartDate = parseInt(startDate, 10);
    }

    if (endDate !== undefined) {
      formattedEndDate = parseInt(endDate, 10);
    }

    const logs = await firestoreInstance.getByQuery('log', description, formattedStartDate, formattedEndDate);

    if (logs === undefined) {
      throw new Error('Unable to process request.');
    }

    return this.formatLogs(logs);
  }

  async addLog(data: Partial<log>): Promise<DocumentReference | {}> {
    const id = await firestoreInstance.add('log', data);
    return id;
  }

  async updateLog(id: string, data: Partial<log>): Promise<boolean> {
    const res = await firestoreInstance.update('log', id, data);
    return res;
  }

  async deleteLog(id: string): Promise<boolean> {
    const res = await firestoreInstance.delete('log', id);
    return res;
  }
}
