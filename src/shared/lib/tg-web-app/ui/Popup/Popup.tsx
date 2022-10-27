import React from 'react'
import styles from './Popup.module.css'

interface PopupProps {
    className?: string
}
    
export function Popup({className}: PopupProps) {
    return (
        <div className={`${styles.Popup}${className ? ' ' + className : ''}`}>
    
        </div>
    )
}