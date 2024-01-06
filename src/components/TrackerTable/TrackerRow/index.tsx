"use client";
import { useEffect, useState} from 'react';
import useTimer from 'easytimer-react-hook';
import Image from 'next/image';
import {log} from '@/api/LogRepository';
import style from './trackerRow.module.scss';
import moment from 'moment';
import {InputText} from 'primereact/inputtext';
import {InstancesContext} from '@/components/ActiveTrackers';

type Props = {
    log: log;
    onUpdateLog: (id: string, data: Partial<log>) => void;
    onDeleteLog: (id: string) => void;
}

export function TrackerRow({log, onUpdateLog, onDeleteLog}: Props) {
    const [wasInitialTimeChanged, setWasInitialTimeChanged] = useState(false);
    const [timerPlaying, setTimerPlaying] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(log.description);

    const [timer, isTargetAchieved] = useTimer({
        /* Hook configuration */
    });

    // const instances = useContext(InstancesContext)

    useEffect(() => {
        // @todo: wip
        // instances.set({id: log.id, timer: timer})

    }, [])

    timer.addEventListener('started', (event) => {
        setTimerPlaying(true);
        setWasInitialTimeChanged(true);
        // @todo: wip
        // instances.cleanupOnPlay(log.id)
    });

    timer.addEventListener('paused', () => {
        setTimerPlaying(false);
    });

    timer.addEventListener('stopped', () => {
        setTimerPlaying(false);
    });


    const onPlayClick = (): void => {
        timer.start({
            /* EasyTimer start configuration */
            countdown: false,
            startValues: {
                seconds: log.time
            }
        });
    };

    const onPauseClick = (): void => {
        timer.pause();
    };

    const onStopClick = (): void => {
        if (!wasInitialTimeChanged) {
            return;
        }
        // @todo think about logic for this
        timer.pause();
        onUpdateLog(log.id, {
            description: log.description,
            time: timer.getTotalTimeValues().seconds
        });
    };

    const onDeleteClick = (): void => {
        timer.pause();
        onDeleteLog(log.id);
    };

    const onEditClick = (): void => {
        setEditMode(true);
    };

    const onEditCancel = ():void => {
        setEditMode(false)
    }

    const onEditSubmit = ():void => {
        onUpdateLog(log.id, {
            description: descriptionEdit,
            time: timer.getTotalTimeValues().seconds
        });
        setEditMode(false);
    }

    const formatted = moment.utc(log.time * 1000).format('HH:mm:ss');

    return (<tr className={style.trackerRow}>
            <td className={style.time}>{!wasInitialTimeChanged ? formatted : timer.getTimeValues().toString()}</td>

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
                {timerPlaying ?
                    <Image src="pause.svg" alt="pause timer" onClick={onPauseClick} height={24} width={24}/>
                    :
                    <Image src="play.svg" alt="start timer" onClick={onPlayClick} height={24} width={24}/>
                }
                <Image src="stop.svg" alt="stop timer" onClick={onStopClick} height={24}
                       width={24}/>
                <Image src="edit.svg" alt="edit timer" onClick={onEditClick} height={24} width={24}/>
                <Image src="delete.svg" alt="delete timer" onClick={onDeleteClick} height={24} width={24}/>
            </td>

        </tr>
    );
}