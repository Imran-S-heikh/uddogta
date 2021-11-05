import clsx from 'clsx';
import React, { MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import Hide from '../../molecules/Hide.mole';
import './drop-down.style.scss';
import ButtonRipple from '../buttons/ButtonRipple.component';
import Popper from '../popper/Popper.component';
import prior from '../../utils/prior.util';
import Icon from '../../molecules/Icon.mole';
import ClickAwayListener from 'react-click-away-listener';


interface Props {
    label?: string,
    options: (string | number)[],
    style?: React.CSSProperties,
    startIcon?: any,
    btnStyle?: React.CSSProperties,
    onChange?: (v:any) => void,
    defaultValue?: string,
    className?: string,
    btnClass?: string
}

function DropDown({ btnClass,className,label, options, style, startIcon, btnStyle, onChange, defaultValue }: Props): ReactElement {

    const [anchorEl, setAnchorEL] = useState<HTMLButtonElement | null>(null);
    const [active, setActive] = useState(prior(defaultValue, options[0]));
    const popperRef = useRef<HTMLDivElement | null>(null);
    // const currentElRef = useRef<HTMLButtonElement | null>(null);
    // const optionsContainerRef = useRef<HTMLDivElement | null>(null);


    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (anchorEl) {
            setAnchorEL(null)
        } else {
            setAnchorEL(event.currentTarget);
        }
    }

    const handleItemClick = (selected: string | number) => {
        setAnchorEL(null);
        setActive(selected);
        onChange && onChange(selected as any)
    }

    const handleCurrentItemRef = (ref: HTMLButtonElement | null, item: string | number) => {
        if (active === item && ref) {
            setTimeout(() => {
                ref.scrollIntoView({
                    behavior: 'smooth',
                    block: "center"
                });
            }, 50);
        }
    }


    return (
        <ClickAwayListener onClickAway={() => setAnchorEL(null)}>
            <div className={clsx("dropdown W(100%) Fx(1) D(f) Fxd(c) Gap(1rem)",className)} style={style}>
                <Hide open={Boolean(label)}>
                    <p className="Fz(1.6rem) C(#96abbb) Miw(maxc)">{label}</p>
                </Hide>

                <ButtonRipple onClick={handleOpen} className={clsx('H(4rem) Bd(border) Bdrs(4rem) Px(2rem)  Fz(16px) W(100%) D(f) Ai(c) Jc(sb)',btnClass)} >
                    <p className="Fz(1.4rem) C(#20083a) Ta(start) Miw(maxc)">{active}</p>
                    <Icon icon="expand-more" className="C(#878e93) Mt(-3px)" />
                </ButtonRipple>
                <Popper className="Z(999) Mt(1rem)" ref={popperRef} open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">

                    <div className="Miw(12rem)  Bdrs(1rem) Ov(h) Bgc(#fff) D(f) Fxd(c) Jc(fs)" >
                        {options.map((item, i) =>
                            <ButtonRipple className={clsx('D(f) Ai(c) Px(2rem) H(4rem) hover Bd(n)', active === item && 'Bgc(lightgray) Op(.8)')} key={item} ref={(ref: HTMLButtonElement) => handleCurrentItemRef(ref, item)} onClick={(event: MouseEvent<HTMLButtonElement>) => handleItemClick(item)} >
                                <span className="hv-cw Fz(1.4rem) D(b)">{item}</span>
                            </ButtonRipple>
                        )}
                    </div>
                </Popper>
            </div>
        </ClickAwayListener>
    )
}

export default DropDown
