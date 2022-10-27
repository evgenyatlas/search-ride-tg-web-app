import { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { clamp } from '@/shared/lib/math/clamp'
import { Button } from '../Button'
import { MinusIcon } from '../Icons/MinusIcon'
import { PlusIcon } from '../Icons/PlusIcon'
import { Modal } from '../Modal'
import styles from './Counter.module.css'

interface CounterProps {
    title?: ReactNode
    className?: string
    iconBefore?: ReactNode
    count: number
    onChange?: (n: number) => void
    minMax?: [number, number]
    children?: ReactNode
}

const hapticFeedback = Telegram.WebApp.HapticFeedback

export function Counter({
    className,
    count = 1,
    iconBefore,
    onChange,
    minMax = [-Infinity, Infinity],
    children,
    title = ''
}: CounterProps) {
    const [visible, setVisible] = useState(false)
    const [counter, setCount] = useState(count)
    //bind state to props
    useEffect(() => {
        setCount(count)
    }, [count])

    const changeCount = (n: number) => {
        n = clamp(n, minMax)
        setCount(n)
        onChange && onChange(n)
        hapticFeedback.impactOccurred('soft')
    }

    return (
        <>
            {
                children
                    ?
                    <div onClick={() => setVisible(true)}>
                        {children}
                    </div>
                    :
                    <div
                        className={`${styles.Counter}${className ? ' ' + className : ''}`}
                        onClick={() => setVisible(true)}
                    >
                        {iconBefore}
                        <span className={styles.Counter__Text}>{count}</span>
                    </div>
            }
            <CounterModal
                visible={visible}
                onClose={() => setVisible(false)}
                minMax={minMax}
                count={counter}
                title={title}
                onChangeCount={changeCount}
            />
        </>
    )
}

interface CounterModalProps extends Required<Pick<CounterProps, 'minMax' | 'count' | 'title'>> {
    visible: boolean
    onClose: (visible: boolean) => void
    onChangeCount: (value: number) => void
}

function CounterModal({ visible, onClose, minMax, count, onChangeCount, title }: CounterModalProps) {
    return (
        <Modal visible={visible} header={title} onClose={() => onClose(false)}>
            <div className={styles.CounterModal__Body}>
                <Button appearance="transparent" className={styles.CounterModal__Left} onClick={() => onChangeCount(count - 1)}>
                    <MinusIcon size='m' theme={minMax[0] <= (count - 1) ? "--tg-theme-text-color" : "--tg-theme-hint-color"} />
                </Button>
                <span className={styles.CounterModal__Text}>{count}</span>
                <Button appearance="transparent" className={styles.CounterModal__Right} onClick={() => onChangeCount(count + 1)}>
                    <PlusIcon size="m" theme={minMax[1] >= (count + 1) ? "--tg-theme-text-color" : "--tg-theme-hint-color"} />
                </Button>
            </div>
        </Modal>
    )
}