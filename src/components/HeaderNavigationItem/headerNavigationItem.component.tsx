import style from './headerNavigationItem.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

type Props = {
  props: {
    title: string;
    imageName: string;
    alt: string;
    link: string;
  };
};

export function HeaderNavigationItem({ props }: Props): ReactElement {
  const pathname = usePathname();

  return (
    <Link
      href={props.link}
      className={clsx(style.headerNavigationItem, pathname !== '/' && pathname === props.link ? style.active : '')}>
      <Image
        className={style.icon}
        width="24"
        height="24"
        title={props.alt}
        alt={props.alt}
        src={`${props.imageName}.svg`}
      />
      <span className={style.title} style={{ textDecoration: 'none' }}>
        {props.title}
      </span>
    </Link>
  );
}
