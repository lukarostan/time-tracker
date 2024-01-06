import {ReactElement} from 'react';
import style from './headerNavigationItem.module.scss';
import Image from 'next/image';

type Props = {
    title: string,
    imageName: string,
    alt: string,
    isActive: boolean
}

export default function HeaderNavigationItem({title, imageName, alt, isActive}: Props): ReactElement {

    return (
        <div className={style.headerNavigationItem}>
            <Image width="24" height="24" alt={alt} src={`${imageName}.svg`}/>
            <p className={style.title}>{title}</p>
        </div>
    );
}