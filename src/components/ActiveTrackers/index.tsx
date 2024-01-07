import {createContext, ReactElement, useEffect, useState} from 'react';
import LogRepository, {log} from '@/api/LogRepository';
import style from './activeTrackers.module.scss';
import TrackerTable from '@/components/TrackerTable';
import Image from 'next/image';
import moment from 'moment';
import {Button} from 'primereact/button';
import AddForm from '@/components/AddForm';
import Timer from 'easytimer.js';

export const InstancesContext = createContext<contextValue>({} as unknown as contextValue);

type contextValue = {
    set: (instance: {id: string, timer: Timer}) => void;
    cleanupOnPlay: (id: string) => void;
}

export function ActiveTrackers(): ReactElement {
    const [logs, setLogs] = useState<[] | log[]>([]);
    const repository: LogRepository = new LogRepository();
    const [addMode, setAddMode] = useState<boolean>(false);
    // @todo: wip
    const [trackerInstances, setTrackerInstances] = useState<{ id: string, timer: Timer }[]>([])
    const contextValue = {
        set: (instance: {id: string, timer: Timer}) => {
                setTrackerInstances(prevState => [...prevState, instance])
        },
        cleanupOnPlay: (id: string) => cleanupOnPlay(id),
        trackerInstances: trackerInstances
    } as unknown as contextValue


    const getLogs = async () => {
        const logs = await repository.getLogsOfToday();
        setLogs(logs);
    };

    useEffect(() => {
        getLogs();
    }, []);

    const onStartNewTimer = async () => {
        setAddMode(true);
    };

    const onAddCancel = () => {
        setAddMode(false);
    };

    const onAddSubmit = async (time: number, description: string) => {
        const logModel = {
            time,
            description,
            date: parseInt(moment().format('X'), 10)
        };
        await repository.addLog(logModel);
        getLogs()
        setAddMode(false);
    };


    const onUpdateLog = async (id: string, data: Partial<log>, isLiveUpdate: boolean = false) => {
        // Note: on live update skip state update because it kills the interval
        if (!isLiveUpdate) {
            const updatedLogs = logs.map(log => {
                if (log.id === id) {
                    return {
                        id: log.id,
                        time: log.time,
                        description: data.description as string,
                        date: log.date
                    };
                }
                return log;
            });
            setLogs(updatedLogs as unknown as log[]);
        }
        await repository.updateLog(id, data);
    };

    const onDeleteLog = async (id: string) => {
        setLogs(prevState => prevState.filter(log => id !== log.id));
        await repository.deleteLog(id);
    };

    const cleanupOnPlay = (playedId: string) => {
        // todo: feature disabled because of bug
        let instancesToPause = trackerInstances
        instancesToPause = instancesToPause.filter(instance => instance.id !== playedId)
        instancesToPause.forEach(instance => instance.timer.pause())
    }

    const stopAllTimers = () => {
        let instancesToStop = trackerInstances
        instancesToStop.forEach(instance => instance.timer.stop())
    }


    const today = moment().format('DD.MM.YYYY');

    return <InstancesContext.Provider value={contextValue}>
    <div className={style.activeTrackers}>
            <div className={style.currentDate}>
                <Image src="calendar.svg" alt={today} width={25} height={25}/>
                <h2>Today ({today})</h2>
            </div>
            <div className={style.controlsWrapper}>
                <Button iconPos="left" className={style.primary} onClick={() => onStartNewTimer()}>
                    <Image src="timer.svg" alt="start new timer" width={25} height={25}/>
                    <span>Start new timer</span>
                </Button>
                <Button iconPos="left" className={style.secondary} onClick={() => stopAllTimers()}>
                    <Image src="stop.svg" alt="stop all timers" width={25} height={25}/>
                    <span>Stop all</span>
                </Button>
            </div>
            {addMode && <AddForm onAddCancel={onAddCancel} onAddSubmit={onAddSubmit}/>}
        <TrackerTable logs={logs} onUpdateLog={onUpdateLog} onDeleteLog={onDeleteLog}></TrackerTable>
        </div>
    </InstancesContext.Provider>
    ;
}