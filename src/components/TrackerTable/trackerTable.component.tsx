'use client';

import style from './trackerTable.module.scss';
import { ReactElement } from 'react';

import { TrackerRow } from '@/components/TrackerTable/TrackerRow/trackerRow.component';
import { log } from '@/infrastructure/LogRepository';

type Props = {
  logs: log[];
  onUpdateLog: (id: string, data: Partial<log>, isLiveUpdate?: boolean) => void;
  onDeleteLog: (id: string) => void;
};

const columns: { name: string; width: number }[] = [
  {
    name: 'Time logged',
    width: 220,
  },
  {
    name: 'Description',
    width: 400,
  },
  {
    name: 'Actions',
    width: 150,
  },
];

export function TrackerTable({ logs, onUpdateLog, onDeleteLog }: Props): ReactElement {
  return (
    <div className={style.logsContainer}>
      <table className={style.logsTable}>
        <thead className={style.headerRow}>
          <tr>
            {columns.map((column, index) => (
              <td key={index}>
                <div style={{ minWidth: `${column.width}px` }}>{column.name}</div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <TrackerRow key={log.id} log={log} onUpdateLog={onUpdateLog} onDeleteLog={onDeleteLog} />
          ))}
          {logs.length === 0 && (
            <tr>
              <td>
                <div className={style.emptyState}>
                  <p>No logs available.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
