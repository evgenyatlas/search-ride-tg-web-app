import clsx from 'clsx'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from './SliderSwitch.module.css'

interface IOption {
    label: ReactNode
    value: string
}

interface SliderSwitchProps {
    className?: string
    options: Array<IOption>
    onSwitch?: (value: string) => void
    defaultValue?: string
    title?: string
}

const hapticFeedback = Telegram.WebApp.HapticFeedback
export function SliderSwitch({ className, onSwitch, options, defaultValue, title }: SliderSwitchProps) {
    const [value, setValue] = useState(defaultValue || options[0].value)

    const select = (v: string) => {
        if (value === v) return
        setValue(v)
        onSwitch && onSwitch(v)
        hapticFeedback.impactOccurred("soft")
    }

    const widthItem = 100 / options.length
    const activeIndex = options.findIndex(option => option.value === value)

    return (
        <div className={clsx(styles.SliderSwitch, className)}>
            {
                title
                &&
                <div className={styles.SliderSwitch__Title}>
                    {title}
                </div>
            }
            <div className={styles.SliderSwitch__Body}>
                <div className={styles.SliderSwitch__Rails}>
                    <Slider activeIndex={activeIndex} width={widthItem} />
                    {
                        options.map(
                            ({ label, value }, i) => {
                                return (<Item
                                    key={value}
                                    active={activeIndex === i}
                                    onClick={() => {
                                        select(value)
                                    }}
                                    label={label}
                                    value={value}
                                    width={widthItem}
                                />)
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

function Slider({ width, activeIndex }: { width: number, activeIndex: number }) {
    return (
        <div
            className={styles.SliderSwitch__Slider}
            style={{
                width: `${width}%`,
                transform: `translateX(${activeIndex * 100}%)`
            }}
        />
    )
}

function Item({ onClick, label, width, active }: IOption & { width: number, onClick: () => void, active: boolean }) {
    return (
        <div
            className={clsx(
                styles.SliderSwitch__Item,
                active && styles.SliderSwitch__Item_active
            )}
            onClick={onClick}
            style={{ width: `${width}%` }}
        >
            {label}
        </div>
    )
}