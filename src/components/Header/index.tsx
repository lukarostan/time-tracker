import {ReactElement} from 'react';
import style from './header.module.scss';
import Image from 'next/image';
import HeaderNavigation from '@/components/HeaderNavigationItem';
import Link from 'next/link';

const navigationItems = [
    {
        id: 1,
        title: "Trackers",
        imageName: "clock",
        alt: "trackers",
        link: '/trackers'
    },
    {
        id: 2,
        title: "History",
        imageName: "history",
        alt: "history",
        link: '/history'
    },
    {
        id: 3,
        title: "Logout",
        imageName: "logout",
        alt: "logout",
        link: '/'
    }];
export default function Header(): ReactElement {

    return (
        <header className={style.pageHeader}>
            <Link href={"/"} style={{textDecoration: 'none'}}>
                <div className={style.logoWrapper}>
                    <Image width="162" height="44" alt="company logo" src="logo.svg"/>
                    <p>Tracking tool</p>
                </div>
            </Link>
            <div className={style.navigationWrapper}>
                {navigationItems.map(item => <HeaderNavigation key={item.id} props={item}/>)}
            </div>
        </header>
    );
}