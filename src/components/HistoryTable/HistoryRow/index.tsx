"use client";
import { useEffect, useState} from 'react';
import useTimer from 'easytimer-react-hook';
import Image from 'next/image';
import {log} from '@/api/LogRepository';
import style from './historyRow.module.scss';
import moment from 'moment';
import {InputText} from 'primereact/inputtext';
import {InstancesContext} from '@/components/ActiveTrackers';

type Props = {
    log: log;
    onUpdateLog: (id: string, data: Partial<log>) => void;
    onDeleteLog: (id: string) => void;
}

export function HistoryRow({log, onUpdateLog, onDeleteLog}: Props) {
    const [editMode, setEditMode] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(log.description);

    const onEditClick = (): void => {
        setEditMode(true);
    };

    const onEditCancel = ():void => {
        setEditMode(false)
    }

    const onEditSubmit = ():void => {
        onUpdateLog(log.id, {
            description: descriptionEdit,
            time: 2,
            date: log.date
        });
        setEditMode(false);
    }

    const formattedDate = moment.unix(log.date).format('DD.MM.YYYY')

    const formattedTime = moment.utc(log.time * 1000).format('HH:mm:ss');

    return (<tr className={style.trackerRow}>
            <td className={style.date}>{formattedDate}</td>
            <td className={style.time}>{formattedTime}</td>

            {editMode ?
                <td>
                    <div className={style.editContainer}>
                        <InputText value={descriptionEdit} onInput={(e) => setDescriptionEdit(e.target.value)}/>
                        <div className={style.editControl} onClick={onEditSubmit}>✔️</div>
                        <div className={style.editControl} onClick={onEditCancel}>✖️</div>️
                    </div>
                </td>
                :
                <td>
                    <div className={style.description}>
                        {log.description}
                    </div>
                </td>
            }

            <td className={style.actions}>
                <Image src="edit.svg" alt="edit timer" onClick={onEditClick} height={24} width={24}/>
                <Image src="delete.svg" alt="delete timer" onClick={() => onDeleteLog(log.id)} height={24} width={24}/>
            </td>

        </tr>
    );
}