/**TODO: rewrite and split the logic into several modules**/
// Это пизд*ц как я намудрил...
import clsx from 'clsx'
import React, { forwardRef, ReactElement, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styles from './StackPanel.module.css'
import { PanelCtx, PanelProps, StackPanelProps } from './types'


const ctxPanel = React.createContext<PanelCtx>({
    prev() {
        console.error('Provider for StackPanel not found')
    },
    add(key: string) {
        console.error('Provider for StackPanel not found')
    }
})

export function usePanel() {
    return useContext(ctxPanel)
}

type ReactElementPanel = ReactElement<PanelProps>

const hapticFeedback = Telegram.WebApp.HapticFeedback

class StackPanelManager implements PanelCtx {
    private timeoutAnim = 350
    //storing data about a stack of panels (for rendering)
    private stackPanel: Array<{ panelId: string, scroll: number }> = []
    //dictionary of available panel
    private panelMap: Record<string, ReactElementPanel>

    //this is used for rendering
    private nextPanel: string = ''
    private prevPanel: string = ''

    constructor(children: StackPanelProps['children']) {
        //create the dictionary of panel from children
        this.panelMap = children.reduce((map, elm) => {
            map[elm.props.id] = elm
            return map
        }, {} as typeof this.panelMap)
        //add a first element from the list of children to the top of the stack
        this.stackPanel.push({ panelId: children[0].props.id, scroll: 0 })
    }
    //i used arrow functions to bind context
    prev = () => {
        if (this.stackPanel.length > 1) {
            this.prevPanel = (this.stackPanel.pop() as { panelId: string, scroll: number }).panelId
            this.updateRender()
            setTimeout(() => {
                this.prevPanel = ''
                this.updateRender()
            }, this.timeoutAnim)
            return
        }
        console.warn('we try to call the prev panel, but the stack contains one element')
    }
    add = (key: string) => {
        this.nextPanel = key
        this.stackPanel.push({ panelId: key, scroll: 0 })
        this.updateRender()
        setTimeout(() => {
            this.nextPanel = ''
            hapticFeedback.impactOccurred("soft")
            this.updateRender()
        }, this.timeoutAnim)
    }
    private getPrev() {
        return this.stackPanel[this.stackPanel.length - 2]
    }
    private getPrevElm(): ReactElementPanel {
        return this.panelMap[this.getPrev().panelId]
    }
    private getActive() {
        return this.stackPanel[this.stackPanel.length - 1]
    }
    private getActiveElm() {
        return this.panelMap[this.getActive().panelId]
    }
    private updateRender() {

    }
    render() {
        //better if i use something like state machine
        if (this.nextPanel) {
            return (
                <>
                    <div
                        className={clsx(styles.Panel, styles.Panel__next_prev)}
                        ref={el => {
                            if (!el) return
                            //save the current panel scroll to set it when the panel returns
                            this.getPrev().scroll = el.scrollTop || 0
                        }}
                    >
                        {this.getPrevElm()}
                    </div>
                    <div
                        className={clsx(styles.Panel, styles.Panel__next_next)}
                    >
                        {this.getActiveElm()}
                    </div>
                </>
            )
        } else if (this.prevPanel) {
            return (
                <>
                    <div
                        className={clsx(styles.Panel, styles.Panel__prev_next)}
                        ref={el => el?.scrollTo(0, this.getActive().scroll)}
                    >
                        {this.getActiveElm()}
                    </div>
                    <div
                        className={clsx(styles.Panel, styles.Panel__prev_prev)}
                    >
                        {this.panelMap[this.prevPanel]}
                    </div>
                </>
            )
        }
        return (
            <div
                className={styles.Panel}
                ref={el => {
                    el?.scrollTo(0, this.getActive().scroll)
                }}
            >
                {this.getActiveElm()}
            </div>
        )
    }
    useRender() {
        const [, setUpdate] = useState(0)
        useEffect(() => {
            this.updateRender = () => setUpdate(n => n + 1)
        }, [])
    }
}

export function StackPanel({ className, children }: StackPanelProps) {
    const state = useMemo(() => new StackPanelManager(children), [])
    //subscribe to render update
    state.useRender()
    return (
        <ctxPanel.Provider value={state}>
            <div className={styles.StackPanel}>
                {
                    state.render()
                }
            </div>
        </ctxPanel.Provider>
    )
}

export function Panel({ id, children, className }: PanelProps) {
    return <>{children}</>
}