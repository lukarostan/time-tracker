'use client';

import style from './historyTable.module.scss';
import { ReactElement } from 'react';

import { HistoryRow } from '@/components/HistoryTable/HistoryRow/historyRow.component';
import { log } from '@/infrastructure/LogRepository';

type Props = {
  logs: log[];
  onUpdateLog: (id: string, data: Partial<log>) => void;
  onDeleteLog: (id: string) => void;
};

const columns: { name: string; width: number }[] = [
  {
    name: 'Date',
    width: 150,
  },
  {
    name: 'Time logged',
    width: 150,
  },
  {
    name: 'Description',
    width: 400,
  },
  {
    name: 'Actions',
    width: 100,
  },
];
export function HistoryTable({ logs, onUpdateLog, onDeleteLog }: Props): ReactElement {
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
            <HistoryRow key={log.id} log={log} onUpdateLog={onUpdateLog} onDeleteLog={onDeleteLog} />
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
