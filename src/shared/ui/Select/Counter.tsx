import { Input } from "../Input";
import { Counter as CounterBody } from '../Counter'
import styles from './Select.module.css'
import { ReactNode } from "react";
import { ArrowIcon } from "../Icons/ArrowIcon";

interface CounterProps {
    className?: string
    count?: number
    minMax?: [number, number]
    before?: ReactNode
    onChange?: (value: number) => void
    title: ReactNode
}

//TODO: Add titles for decl
export function Counter({
    className = '',
    minMax = [-Infinity, Infinity],
    count = 1,
    before,
    onChange,
    title,
}: CounterProps) {
    return (
        <CounterBody title={title} onChange={onChange} count={count} minMax={minMax} >
            <Input
                className={`${styles.Select__Counter} ${className}`}
                disabled={true}
                before={before}
                after={<ArrowIcon size={14} />}
                style={{ display: 'none' }}
            />
        </CounterBody>
    )
}  