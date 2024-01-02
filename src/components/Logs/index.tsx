import {ReactElement, useEffect, useState} from 'react';
import LogRepository, {log} from '@/api/LogRepository';

export default function Logs(): ReactElement {
    const [logs, setLogs] = useState<[] | log[]>([]);
    const repository = new LogRepository();

    useEffect(() => {
        const getLogs = async () => {
            const logs = await repository.getLogs();
            setLogs(logs);
        };

        getLogs();

    }, []);

    return <div>
        {logs && logs.map(item => {
            return (<div key={item.id}>
                <p>{item.id}</p>
                <p>{item.description}</p>
                <p>{item.time}</p>
            </div>);
            })
        }
    </div>;
}