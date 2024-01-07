import style from './addForm.module.scss';
import {InputText} from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import {InputMask} from 'primereact/inputmask';
import {Button} from 'primereact/button';
import controlsStyle from '../../components/ActiveTrackers/activeTrackers.module.scss';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

type Props = {
    onAddSubmit: (time: number, description: string) => void
    onAddCancel: () => void
}

const getSecondsFromInputMask = (input: string): number => {
    const result = input.split(':');
    if (result.length < 3) {
        return 0;
    }
    // Note: not expected to be changed because of constant input
    return parseInt(result[2], 10) + parseInt(result[1], 10) * 60 + parseInt(result[0], 10) * 3600;
};

export function AddForm({onAddSubmit, onAddCancel}: Props) {
    const [description, setDescription] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        return () => {
            setDescription('');
            setTime('');
        };
    }, []);

    const submit = () => {
        if (description.length === 0) {
            return;
        }
        onAddSubmit(getSecondsFromInputMask(time), description);
    };

    return (<div className={style.addForm}>
        <InputMask placeholder="Time (max: 23:59:59)" mask="99:99:99"
                   onChange={(e) => setTime(e.target.value as unknown as string)} slotChar={'HH:MM:SS'}/>
        <InputText style={{minWidth: '400px'}} placeholder="Description (required)"
                   onChange={(e) => setDescription(e.target.value)}/>
        <div className={clsx(controlsStyle.controlsWrapper, style.controlsWrapper)}>
            <Button iconPos="left" className={controlsStyle.primary} onClick={() => submit()}>
                <span>Confirm</span>
            </Button>
            <Button iconPos="left" className={controlsStyle.secondary} onClick={onAddCancel}>
                <span>Cancel</span>
            </Button>
        </div>
    </div>);
}