import { useEvent } from '@/shared/lib/effector/useEvent'
import { usePanel } from '@/shared/ui/StackPanel'
import { findRides, FormSearch } from '@/features/search-ride'
import { HistorySearch } from '@/features/search-ride/ui/HistorySearch'
import styles from './SearchRidesPanel.module.css'
import clsx from 'clsx'

interface SearchRidesPanelProps {
    className?: string
}

export function SearchRidesPanel({ className }: SearchRidesPanelProps) {
    const panel = usePanel()
    //when rides are loaded then switch to rides list panel (page)
    useEvent(findRides.doneData, () => {
        panel.add('found-rides')
    })

    return (
        <div className={clsx(styles.SearchRidePanel, className, 'container')}>
            <FormSearch />
            <HistorySearch />
        </div>
    )
}