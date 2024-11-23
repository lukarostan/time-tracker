'use client';

import style from './trackerRow.module.scss';
import useTimer from 'easytimer-react-hook';
import moment from 'moment';
import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';

import { log } from '@/infrastructure/LogRepository';

type Props = {
  log: log;
  onUpdateLog: (id: string, data: Partial<log>, isLiveUpdate?: boolean) => void;
  onDeleteLog: (id: number) => void;
};

export function TrackerRow({ log, onUpdateLog, onDeleteLog }: Props) {
  const [wasInitialTimeChanged, setWasInitialTimeChanged] = useState(false);
  const [timerPlaying, setTimerPlaying] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(log.description);
  const [liveUpdateInterval, setLiveUpdateInterval] = useState<NodeJS.Timeout | null>();

  const [timer] = useTimer({});

  // const instances = useContext(InstancesContext)

  useEffect(() => {
    // todo: feature disabled because of bug
    //instances.set({id: log.id, timer: timer})
  }, []);

  // todo: feature disabled because of bug
  const startLiveUpdates = () => {
    return;
    if (!process.env.NEXT_PUBLIC_ENABLE_FIRESTORE_UPDATE) {
      return;
    }

    if (process.env.NEXT_PUBLIC_FIRESTORE_UPDATE_INTERVAL === undefined) {
      return;
    }

    setLiveUpdateInterval(
      setInterval(
        () => {
          onUpdateLog(
            log.id,
            {
              description: log.description,
              time: timer.getTotalTimeValues().seconds,
              date: log.date,
            },
            true
          );
        },
        parseInt(process.env.NEXT_PUBLIC_FIRESTORE_UPDATE_INTERVAL as unknown as string, 10)
      )
    );
  };

  timer.addEventListener('started', (event) => {
    setTimerPlaying(true);
    setWasInitialTimeChanged(true);
    //instances.cleanupOnPlay(log.id)
    // startLiveUpdates();
  });

  timer.addEventListener('paused', () => {
    setTimerPlaying(false);
    // @ts-ignore
    window.clearInterval(liveUpdateInterval);
  });

  timer.addEventListener('stopped', () => {
    setTimerPlaying(false);
    // @ts-ignore
    window.clearInterval(liveUpdateInterval);
  });

  const onPlayClick = (): void => {
    timer.start({
      /* EasyTimer start configuration */
      countdown: false,
      startValues: {
        seconds: log.time,
      },
    });
  };

  const onPauseClick = (): void => {
    timer.pause();
  };

  const onStopClick = (): void => {
    if (!wasInitialTimeChanged) {
      return;
    }
    timer.pause();
    onUpdateLog(log.id, {
      description: log.description,
      time: timer.getTotalTimeValues().seconds,
      date: log.date,
    });
  };

  const onDeleteClick = (): void => {
    console.log(log.id)
    timer.pause();
    onDeleteLog(log.id);
  };

  const onEditClick = (): void => {
    setEditMode(true);
  };

  const onEditCancel = (): void => {
    setEditMode(false);
  };

  const onEditSubmit = (): void => {
    onUpdateLog(log.id, {
      description: descriptionEdit,
      time: timer.getTotalTimeValues().seconds,
      date: log.date,
    });
    setEditMode(false);
  };

  const formatted = moment.utc(log.time * 1000).format('HH:mm:ss');

  return (
    <tr className={style.trackerRow}>
      <td className={style.time}>{!wasInitialTimeChanged ? formatted : timer.getTimeValues().toString()}</td>

      {editMode ? (
        <td>
          <div className={style.editContainer}>
            <InputText
              value={descriptionEdit}
              onInput={(e) => setDescriptionEdit((e.target as HTMLInputElement).value)}
            />
            <div className={style.editControl} onClick={onEditSubmit}>
              ✔️
            </div>
            <div className={style.editControl} onClick={onEditCancel}>
              ✖️
            </div>
            ️
          </div>
        </td>
      ) : (
        <td>
          <div className={style.description}>{log.description}</div>
        </td>
      )}

      <td className={style.actions}>
        {timerPlaying ? (
          <Image src="pause.svg" alt="pause timer" onClick={onPauseClick} height={24} width={24} />
        ) : (
          <Image src="play.svg" alt="start timer" onClick={onPlayClick} height={24} width={24} />
        )}
        <Image src="stop.svg" alt="stop timer" onClick={onStopClick} height={24} width={24} />
        <Image src="edit.svg" alt="edit timer" onClick={onEditClick} height={24} width={24} />
        <Image src="delete.svg" alt="delete timer" onClick={onDeleteClick} height={24} width={24} />
      </td>
    </tr>
  );
}
