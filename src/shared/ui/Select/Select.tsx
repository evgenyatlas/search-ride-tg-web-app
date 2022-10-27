import clsx from 'clsx'
import React, { InputHTMLAttributes, ReactNode, useCallback, useRef, useState } from 'react'
import useClickOut from '../../lib/react/useClickOut'
import { ArrowIcon } from '../Icons/ArrowIcon'
import { Input } from '../Input'
import { BackButton } from '../../lib/tg-web-app'
import { Counter } from './Counter'
import styles from './Select.module.css'

//TODO: add docs
interface SelectProps<T> {
    className?: string
    items: Array<T>
    /** "Render Props" to render items in selection */
    renderItems?: (item: T) => JSX.Element
    /** Сallback to change input (field search) */
    onChangeInput?: (value: string) => void
    onSelect: (item: T | null) => void
    /** The element to be rendered before the input element */
    before?: ReactNode
    /** The element that will be rendered when we selected something */
    selected?: ReactNode
    placeholder?: string
    type?: "date" | "text" | "counter"
}

const hapticFeedback = Telegram.WebApp.HapticFeedback

//TODO: this component has a complex api and confusing implementation, i need to change
export function Select<T>({ className, selected, before, onChangeInput, onSelect, items, placeholder, renderItems }: SelectProps<T>) {
    //logic for show/hide 
    const [opened, setOpened] = useState(false)
    const [offsetTop, setOffsetTop] = useState(0)
    const hide = useCallback(() => {
        setOffsetTop(0)
        setOpened(false)
    }, [setOpened])
    const ref = useClickOut<HTMLDivElement>(hide)
    const open = () => {
        if (opened) return
        //create a haptic feedback
        hapticFeedback.impactOccurred('light')
        setOffsetTop(-(ref.current?.getBoundingClientRect()?.y || 0))
        setOpened(true)
    }

    //input value
    const [valueInput, setValueInput] = useState("")
    const changeValueInput = (value: string) => {
        setValueInput(value)
        onChangeInput && onChangeInput(value)
    }

    const select = useCallback((item: T) => {
        //create a haptic feedback
        if (item) hapticFeedback.impactOccurred("rigid")
        onSelect(item)
        changeValueInput("")
        hide()
    }, [])

    return (
        <div
            ref={ref}
            className={clsx(className, styles.Select, {
                [styles.Select_opened]: opened,
                [styles.Select_selected]: selected
            })}
            style={{
                //if the element is open, we move it to top
                transform: `translate3d(0px, ${offsetTop ? offsetTop + 20 : 0}px, 0px)`
            }}
            onClick={open}
        >
            {opened && <BackButton onClick={hide} />}
            <div
                className={styles.Select__InputContainer}
                // style={opened ? { transform: `scale(${800 / (ref.current?.clientWidth || 1)})`, borderRadius: '0px' } : {}}
                style={opened ? { borderRadius: '0px' } : {}}

            >
                <Input
                    className={styles.Select__Input}
                    value={valueInput}
                    // onClick={ }
                    onChange={changeValueInput}
                    placeholder={placeholder}
                    disabled={!opened}
                    before={selected || before}
                    after={<ArrowIcon size={14} />}
                    onClick={e => selected && onSelect(null)}
                    style={selected ? { display: 'none', borderRadius: '0px' } : {}}
                />
            </div>
            {
                renderItems
                &&
                <div className={styles.Select__Selection}>
                    {
                        opened && items.map((item, i) =>
                            <div key={i} className={styles.Select__ItemSelection} onClick={() => select(item)}>
                                {
                                    renderItems(item)
                                }
                            </div>
                        )
                    }

                </div>
            }

        </div>
    )
}

Select.Counter = Counter