import {ReactElement} from 'react';
import style from './header.module.scss';
import Image from 'next/image';
import HeaderNavigation from '@/components/HeaderNavigationItem';

const navigationItems = [
    {
        id: 1,
        title: "Trackers",
        imageName: "clock",
        alt: "trackers",
        isActive: false
    },
    {
        id: 2,
        title: "History",
        imageName: "history",
        alt: "history",
        isActive: false
    },
    {
        id: 3,
        title: "Logout",
        imageName: "logout",
        alt: "logout",
        isActive: false
    }];
export default function Header(): ReactElement {

    return (
        <header className={style.pageHeader}>
            <div className={style.logoWrapper}>
                <Image width="162" height="44" alt="company logo" src="logo.svg"/>
                <p>Tracking tool</p>
            </div>
            <div className={style.navigationWrapper}>
                {navigationItems.map(item => <HeaderNavigation key={item.id} title={item.title} imageName={item.imageName} alt={item.alt} isActive={item.isActive}/>)}
            </div>
        </header>
    );
}