import style from './history.module.scss';
import clsx from 'clsx';
import moment from 'moment';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { ReactElement, useEffect, useState } from 'react';

import { HistoryTable } from '@/components/HistoryTable';
import LogRepository, { log } from '@/infrastructure/LogRepository';

export function History(): ReactElement {
  const [logs, setLogs] = useState<[] | log[]>([]);
  const [startDateFilter, setStartDateFilter] = useState<Date | null>();
  const [endDateFilter, setEndDateFilter] = useState<Date | null>();
  const [descriptionFilter, setDescriptionFilter] = useState<string>('');
  const repository: LogRepository = new LogRepository();

  const getLogs = async () => {
    const logs = await repository.getLogs();
    setLogs(logs);
  };

  const getFilteredLogs = async (description: string = '', startDate: string = '', endDate: string = '') => {
    const logs = await repository.getFilteredLogs(description, startDate, endDate);
    setLogs(logs);
  };

  //@todo: consolidate duplicates into service
  const onUpdateLog = async (id: string, data: Partial<log>) => {
    const updatedLogs = logs.map((log) => {
      if (log.id === id) {
        return {
          id: log.id,
          time: log.time,
          description: data.description as string,
        };
      }
      return log;
    });
    setLogs(updatedLogs as unknown as log[]);
    await repository.updateLog(id, data);
  };

  const onDeleteLog = async (id: string) => {
    setLogs((prevState) => prevState.filter((log) => id !== log.id));
    await repository.deleteLog(id);
  };

  useEffect(() => {
    const startDate = moment(startDateFilter).format('X');
    const endDate = moment(endDateFilter).format('X');
    setDescriptionFilter('');
    getFilteredLogs('', startDate, endDate);
  }, [startDateFilter, endDateFilter]);

  useEffect(() => {
    setStartDateFilter(null);
    setEndDateFilter(null);
    getFilteredLogs(descriptionFilter);
  }, [descriptionFilter]);

  useEffect(() => {
    if (logs.length === 0) {
      getLogs();
    }
  }, []);

  return (
    <div className={style.history}>
      <div className={style.heading}>
        <h2>Trackers history</h2>
      </div>
      <div className={style.controlsWrapper}>
        <span className={clsx(style.inputContainer, 'p-float-label')}>
          <Calendar
            style={{ width: '100%' }}
            dateFormat="dd.mm.yy."
            inputId="start_date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.value as unknown as Date)}
          />
          <label style={{ transform: 'translateY(-0.25rem)' }} htmlFor="start_date">
            Start Date
          </label>
        </span>
        <span className={clsx(style.inputContainer, 'p-float-label')}>
          <Calendar
            style={{ width: '100%' }}
            dateFormat="dd.mm.yy."
            inputId="end_date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.value as unknown as Date)}
          />
          <label style={{ transform: 'translateY(-0.25rem)' }} htmlFor="end_date">
            End Date
          </label>
        </span>
        <span className={clsx(style.inputContainer, 'p-float-label')}>
          <InputText
            value={descriptionFilter}
            width={'100%'}
            id="description"
            onChange={(e) => setDescriptionFilter(e.target.value)}
          />
          <label style={{ transform: 'translateY(-0.25rem)' }} htmlFor="description">
            Description
          </label>
        </span>
      </div>
      <HistoryTable logs={logs} onDeleteLog={onDeleteLog} onUpdateLog={onUpdateLog} />
    </div>
  );
}
