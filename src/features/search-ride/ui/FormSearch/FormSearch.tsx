import { Event } from 'effector'
import { useStore } from 'effector-react'
import { datetime } from '@/shared/lib/datetime'
import { Input } from '@/shared/ui/Input'
import { MainButton } from '@/shared/lib/tg-web-app'
import { SliderSwitch } from '@/shared/ui/SliderSwitch/SliderSwitch'
import { DriverIcon } from '@/shared/ui/Icons/DriverIcon'
import { PassengerIcon } from '@/shared/ui/Icons/PassengerIcon'
import { CalendarIcon } from '@/shared/ui/Icons/CalendarIcon'
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon'
import { NumberPassengers } from '../NumberPassengers'
import { SelectDests } from '../SelectDests/SelectDests'
import styles from './FormSearch.module.css'
import { $readySearchRide, dateModel, findRides, typeRideModel, submitSearchForm } from '../../model'
import clsx from 'clsx'

interface FormSearchProps {
    className?: string
}

export function FormSearch({ className }: FormSearchProps) {
    return (
        <div className={clsx(styles.FormSearch, className)}>
            <RideType />
            <SelectDests />
            <NumberPassengers className={styles.FormSearch__NumberPassenger} />
            <DateFilter />
            <SubmitBtn />
        </div>
    )
}

function SubmitBtn() {
    const ready = useStore($readySearchRide)
    const pendingSearch = useStore(findRides.pending)

    return (
        ready ?
            <MainButton fetching={pendingSearch} onClick={submitSearchForm} text="Поиск" />
            :
            <MainButton color="#8e8e93" text="Необходимо выбрать маршрут" />
    )
}

function RideType() {
    return (
        <SliderSwitch
            title="Кто вы?"
            options={[
                { label: <div style={{ display: 'flex', 'alignItems': 'center' }}><PassengerIcon style={{ marginRight: '6px' }} theme={null} />Пассажир</div>, value: "passenger" },
                { label: <div style={{ display: 'flex', 'alignItems': 'center' }}><DriverIcon style={{ marginRight: '6px' }} theme={null} />Водитель</div>, value: "driver" }
            ]}
            className={styles.FormSearch__RideType}
            onSwitch={typeRideModel.events.change as Event<string>}
        />
    )
}

function DateFilter() {
    const date = useStore(dateModel.$store)
    return (
        <Input
            className={styles.FormSearch__Date}
            onChange={(value) => dateModel.events.change(new Date(value).getTime())}
            value={datetime.dateLocal(new Date(date))}
            before={<CalendarIcon theme="--tg-theme-link-color" />}
            after={<ArrowIcon size={14} />}
            type="date"
        />
    )
}