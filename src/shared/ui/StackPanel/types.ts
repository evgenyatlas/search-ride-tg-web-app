import { ReactElement, ReactNode } from "react"

export interface PanelCtx {
    prev: () => void
    add: (name: string) => void
}

export interface PanelProps {
    id: string
    className?: string
    children: ReactNode
}

export interface StackPanelProps {
    className?: string
    children: ReactElement<PanelProps>[]
}