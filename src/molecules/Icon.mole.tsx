import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { IconsId } from '../assets/fonts/font-icon/icons';


interface Props {
    icon: IconsId,
    className?: string,
    style?: React.CSSProperties
}

function Icon({icon,className,style}: Props): ReactElement {
    return <i style={style} className={`D(b)::b icon-${icon} ${clsx(className)}`}></i>
}

export default Icon;
