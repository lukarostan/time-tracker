import { DocumentReference } from 'firebase/firestore';
import moment from 'moment';

import { getFromLocalStorage, saveToLocalStorage } from '@/infrastructure/LocalStorage';
import firestoreInstance from '@/services/FirestoreInitializer';

export type log = {
  id: number;
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
    // const logs = await firestoreInstance.get("log");
    const existingLogs = localStorage.getItem('logs');
    if (existingLogs) {
      const parsedLogs = JSON.parse(existingLogs);

      return this.formatLogs(parsedLogs);
    }

    if (existingLogs === undefined) {
      throw new Error('Unable to process request.');
    }

    return [];
  }

  async getLogsOfToday(): Promise<log[] | []> {
    const startOfDay = parseInt(moment().startOf('day').format('X'), 10);
    const endOfDay = parseInt(moment().endOf('day').format('X'), 10);

    console.log(startOfDay);
    console.log(endOfDay);

    const logs = getFromLocalStorage('logs');

    const todaysLogs = logs.filter((log) => {
      return log.date > startOfDay && log.date < endOfDay;
    });

    return this.formatLogs(todaysLogs);
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

  async addLog(data: log): Promise<DocumentReference | {}> {
    const existingLogs = getFromLocalStorage('logs');
    if (existingLogs.length > 0) {
      const maxId = Math.max(...existingLogs.map((o) => o.id));
      data.id = maxId + 1;

      const newData = [...existingLogs, data];
      saveToLocalStorage('logs', newData);
      return data.id ? data.id : '';
    }

    data.id = 1; //set default id to 1 if previous logs don't exist
    saveToLocalStorage('logs', [data]);
    return data.id ? data.id : '';
  }

  async updateLog(id: number, data: Partial<log>): Promise<boolean> {
    const res = await firestoreInstance.update('log', id, data);
    return res;
  }

  async deleteLog(id: number): log[] {
    const existingLogs = getFromLocalStorage('logs');

    const updatedLogs = existingLogs.filter((log) => log.id !== id);

    saveToLocalStorage('logs', updatedLogs);
    return updatedLogs;
  }
}
