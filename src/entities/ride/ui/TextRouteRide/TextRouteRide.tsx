import { IDestination } from '@/shared/api.types'
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon'
import clsx from 'clsx'
import React from 'react'
import { TextDestination } from '../TextDestination'
import styles from './TextRouteRide.module.css'

interface TextRouteRideProps {
    className?: string
    from: IDestination
    to: IDestination
}

export function TextRouteRide({ className, from, to }: TextRouteRideProps) {
    return (
        <span className={clsx(styles.TextRouteRide, className)}>
            <TextDestination {...from} />
            <ArrowIcon className={styles.TextRouteRide__ArrowRoute} size={9} theme="--tg-theme-text-color" location='right' type="long" />
            <TextDestination {...to} />
        </span>
    )
}

