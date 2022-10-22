import clsx from "clsx";
import React, { MutableRefObject, ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./button-ripple.style.scss";

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  opacity?: string;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ButtonRipple = React.forwardRef(
  (
    {
      disabled,
      onMouseDown,
      children,
      style,
      color = "rgba(255,255,255,.5)",
      className,
      onClick,
      opacity,
    }: Props,
    ref: any
  ): ReactElement => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const rippleRef = useRef<HTMLSpanElement | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      onMouseDown && onMouseDown(event);

      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;

      if (buttonRef.current) {
        if (rippleRef.current) {
          rippleRef.current.remove();
        }

        const element = document.createElement("span");
        const rippleWidth = buttonRef.current.clientWidth / 10;
        // const height = buttonRef.current.clientHeight;

        element.classList.add("ripple");
        element.style.top = `${top - rippleWidth / 2}px`;
        element.style.left = `${left - rippleWidth / 2}px`;
        element.style.backgroundColor = color;
        element.style.width = `${rippleWidth}px`;
        element.style.height = `${rippleWidth}px`;

        if (opacity) {
          element.style.opacity = opacity;
        }

        buttonRef.current.appendChild(element);

        rippleRef.current = element;
      }
    };

    useEffect(() => {
      document.addEventListener("mouseup", () => {
        if (rippleRef.current) {
          rippleRef.current.style.opacity = "0";
        }
      });

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    });

    const handleMouseUp = () => {
      if (rippleRef.current) {
        rippleRef.current.style.opacity = "0";
      }
    };

    const handleRef = (btnRef: HTMLButtonElement) => {
      buttonRef.current = btnRef;
      if (ref && "current" in ref) {
        ref.current = btnRef;
      }
    };

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        ref={handleRef}
        style={style}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        className={clsx("btn-ripple", className)}
      >
        {children}
      </button>
    );
  }
);

export default ButtonRipple;
