"use client";
import {ReactElement} from 'react';
import {log} from '@/api/LogRepository';
import style from './historyTable.module.scss';
import {TrackerRow} from '@/components/TrackerTable/TrackerRow';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {HistoryRow} from '@/components/HistoryTable/HistoryRow';

type Props = {
    logs: log[];
    onUpdateLog: (id: string, data: Partial<log>) => void;
    onDeleteLog: (id: string) => void;
}

const columns: { name: string, width: number }[] = [
    {
        name: "Date",
        width: 150
    },
    {
        name: "Time logged",
        width: 150
    },
    {
        name: "Description",
        width: 400
    },
    {
        name: "Actions",
        width: 100
    }
];
export default function HistoryTable({logs, onUpdateLog, onDeleteLog}: Props): ReactElement {
    return (
        <div className={style.logsContainer}>
            <table className={style.logsTable}>
                <thead className={style.headerRow}>
                <tr>
                    {columns.map((column, index) => <td key={index}>
                        <div style={{minWidth: `${column.width}px`}}>{column.name}</div>
                    </td>)}
                </tr>
                </thead>
                <tbody>
                {logs.map(log => <HistoryRow key={log.id}
                                             log={log}
                                             onUpdateLog={onUpdateLog}
                                             onDeleteLog={onDeleteLog}
                />)}
                </tbody>
            </table>
        </div>);
}