import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from 'react-transition-group'
import useClickOut from '../../lib/react/useClickOut'
import styles from './Modal.module.css'

interface ModalProps {
    className?: string
    header?: ReactNode
    visible: boolean
    onClose?: () => void
    children: ReactNode
}

const hapticFeedback = Telegram.WebApp.HapticFeedback

export function Modal({ className, header, visible, children, onClose = () => undefined }: ModalProps) {
    const ref = useClickOut<HTMLDivElement>(onClose)
    useEffect(() => {
        //create a haptic
        if (visible)
            hapticFeedback.impactOccurred('light')
    }, [visible])
    return (
        <Transition
            timeout={timeout}
            in={visible}
            unmountOnExit
        >
            {
                state => {
                    return <>
                        <div
                            ref={ref}
                            className={clsx(styles.Modal__Body, className, styles[`Modal__Body_${state}`])}>
                            <div className={styles.Modal__Header}>{header}</div>
                            {children}
                        </div>
                        <div className={clsx(styles.Modal__Overlay, styles[`Modal__Overlay_${state}`])} />
                    </>
                }
            }
        </Transition>
    )
}

const timeout = {
    enter: 400,
    exit: 1000
}
