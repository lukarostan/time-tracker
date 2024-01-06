import {ReactElement} from 'react';
import style from './headerNavigationItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

type Props = {
    props: {
        title: string,
        imageName: string,
        alt: string,
        link: string
    }
}

export default function HeaderNavigationItem({props}: Props): ReactElement {
    const pathname = usePathname()

    return (
        <div className={clsx(style.headerNavigationItem, pathname !== '/' && pathname === props.link ? style.active : '')}>
            <Image width="24" height="24" alt={props.alt} src={`${props.imageName}.svg`}/>
            <Link href={props.link} className={style.title} style={{textDecoration: 'none'}}>{props.title}</Link>
        </div>
    );
}