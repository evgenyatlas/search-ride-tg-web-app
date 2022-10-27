import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { Separator } from '../Separator'
import styles from './Cells.module.css'

interface CellsProps {
    className?: string
    children: ReactNode
    sizeCell?: "s" | "m" | "l"
}

export function Cells({ className, children }: CellsProps) {
    const countChildren = React.Children.count(children)
    return (
        <div className={clsx(styles.Cells, className)}>
            {React.Children.map(
                children,
                (e, i) =>
                    <>{e}{countChildren - 1 > i ? <Separator /> : null}</>
            )}
        </div>
    )
}

Cells.Cell = function Cell({ children }: { children: ReactNode }) {
    return (
        <div className={styles.Cells__Item}>
            {children}
        </div>
    )
}

