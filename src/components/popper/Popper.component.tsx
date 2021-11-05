import { Placement } from '@popperjs/core';
import clsx from 'clsx';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { usePopper } from 'react-popper';
import Hide from '../../molecules/Hide.mole';
import Portal from '../portal/Portal.component';
import './popper.style.scss';

interface Props {
    anchorEl: HTMLElement | null,
    className?: string,
    children: ReactNode,
    placement?: Placement,
    open?: boolean,
    hover?: boolean,
    onClickAway?: ()=>void
}

const Popper = React.forwardRef(function({ onClickAway=()=>{},anchorEl, className, children, placement, open, hover }: Props, ref: any): ReactElement | null {

    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    const [state, setState] = useState(false);
    const openShadow = open === undefined ? hover === true ? state : open : open;
    const { styles } = usePopper(anchorEl, popper, {
        placement: placement,
        // strategy: 
    });




    useEffect(() => {
        if (anchorEl && hover) {
            anchorEl.addEventListener('mouseover', handleMouseOver)
            anchorEl.addEventListener('mouseleave', handleMouseLeave)
        }

        return ()=>{
            if (anchorEl) {
                anchorEl.removeEventListener('mouseover', handleMouseOver)
                anchorEl.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    });


    const handleMouseOver = () => {
        setState(true);
    }

    const handleMouseLeave = () => {
        setState(false);
    }




    const handleRef = (r: HTMLDivElement) => {
        setPopper(r);
        if (ref && 'current' in ref) {
            ref.current = ref;
        }
    }

    return (
        <Portal>
            <Hide open={openShadow}>
                <ClickAwayListener onClickAway={onClickAway}>
                    <div style={{ ...styles.popper }} ref={handleRef} className={className}>
                        {children}
                    </div>
                </ClickAwayListener>
            </Hide>
        </Portal>
    )
})

export default Popper;
