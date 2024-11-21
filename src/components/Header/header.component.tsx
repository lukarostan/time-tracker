import {ReactElement} from 'react';
import style from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {HeaderNavigationItem} from '@/components/HeaderNavigationItem';

const navigationItems = [
    {
        id: 1,
        title: "Trackers",
        imageName: "clock",
        alt: "Trackers",
        link: '/trackers'
    },
    {
        id: 2,
        title: "History",
        imageName: "history",
        alt: "History",
        link: '/history'
    },
    {
        id: 3,
        title: "Logout",
        imageName: "logout",
        alt: "Logout",
        link: '/'
    }];

export function Header(): ReactElement {

    return (
        <header className={style.pageHeader}>
            <Link href={"/"} style={{textDecoration: 'none'}}>
                <div className={style.logoWrapper}>
                    <Image width="162" height="44" alt="company logo" src="logo.svg"/>
                </div>
            </Link>
            <div className={style.navigationWrapper}>
                {navigationItems.map(item => <HeaderNavigationItem key={item.id} props={item}/>)}
            </div>
        </header>
    );
}