import React, { memo, useEffect } from 'react'
import debounce from 'debounce'
import { useOnClick } from '../useOnClick'
import styles from './BackButton.module.css'

interface BackButtonProps {
    onClick?: () => void
}

//telegram api for native button
const backButtonAPI = Telegram.WebApp.BackButton

//i used the debounce decorator to make the TG component not blink
const hide = debounce(backButtonAPI.hide, 350)
const show = debounce(backButtonAPI.show, 400)

/** This object controls the back button, which can be displayed in the header of the Web App in the Telegram interface. */
export const BackButton = memo(function BackButton({ onClick }: BackButtonProps) {
    //logic for onClick
    useEffect(() => {
        show()
        return () => {
            hide()
        }
    }, [])

    useOnClick({ componentTG: backButtonAPI, onClick })

    return (
        null
    )
})