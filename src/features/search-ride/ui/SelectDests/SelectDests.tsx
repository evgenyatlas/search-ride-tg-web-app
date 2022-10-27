import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useState } from 'react'
import { useToggle } from '@/shared/lib/react/useToggle'
import { SearchIcon } from '@/shared/ui/Icons/SearchIcon'
import { SwapIcon } from '@/shared/ui/Icons/SwapIcon'
import { Select } from '@/shared/ui/Select'
import { Destination } from '@/entities/ride'
import { $canSwaped, fromDestModel, swapFromToDest, toDestModel } from '../../model'
import styles from './SelectDests.module.css'

const hapticFeedback = Telegram.WebApp.HapticFeedback

interface SelectDestsProps {
    className?: string
}

export function SelectDests({ className }: SelectDestsProps) {
    //logic for swap (animation etc)
    const canSwaped = useStore($canSwaped)
    const [inverted, toggleInverted] = useToggle()
    const [swaping, setSwaping] = useState(false)
    const swap = () => {
        toggleInverted()
        setSwaping(true)
        setTimeout(() => {
            setSwaping(false)
            hapticFeedback.impactOccurred('rigid')
            swapFromToDest()
        }, 500)
    }
    return (
        <div className={clsx(styles.SelectDests, className, swaping && styles.SelectDests_swaping)}>
            <SelectDest
                model={fromDestModel}
                className={styles.SelectDests__SelectFrom}
                placeholder='Откуда'

            />
            {
                canSwaped
                &&
                <BtnSwap
                    onClick={!swaping ? swap : undefined}
                    inverted={inverted}
                />
            }
            <SelectDest
                model={toDestModel}
                className={styles.SelectDests_SelectTo}
                placeholder='Куда'
            />
        </div>
    )
}

interface SelectDestProps {
    model: typeof fromDestModel
    className?: string
    placeholder: string
}

function SelectDest({ model, className, placeholder }: SelectDestProps) {
    const dest = useStore(model.$store)
    return (
        <Select
            items={dest.offers}
            onSelect={model.events.changeSelected}
            onChangeInput={model.events.changeReqValue}
            before={<SearchIcon size='xs' />}
            selected={dest.selected && <Destination size='s' border={false} className={styles.SelectDests__Selected} {...dest.selected} />}
            renderItems={item => item && <Destination {...item} />}
            className={className ? className : ''}
            placeholder={placeholder}
        />
    )
}

/** Сomponent to swap destination from and to */
function BtnSwap({ inverted, onClick }: { inverted: boolean, onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            style={{
                transform: `rotateZ(${inverted ? '180deg' : '0deg'})`
            }}
            className={styles.BtnSwap}
        >
            <SwapIcon theme="--tg-theme-link-color" />
        </div>
    )
}