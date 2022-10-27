import React, { memo, useEffect, useRef } from 'react'
import { getThemeColor, TG_COLORS_THEME } from '../../theme'
import { useOnClick } from '../useOnClick'
import styles from './MainButton.module.css'

interface MainButtonProps {
    text: string
    color?: string
    textColor?: string
    fetching?: boolean
    onClick?: Function
}

//telegram api for native button
const mainButtonAPI = Telegram.WebApp.MainButton

/**This object controls the main button, which is displayed at the bottom of the Web App in the Telegram interface. */
export const MainButton = memo(
    function MainButton({ text, color = getThemeColor("--tg-theme-button-color"), textColor, onClick, fetching }: MainButtonProps) {

        useEffect(() => {
            mainButtonAPI.show()
            return () => {
                mainButtonAPI.hide()
            }
        }, [])

        useEffect(() => {
            mainButtonAPI.text = text

            if (mainButtonAPI.color !== color)
                mainButtonAPI.color = color || getThemeColor("--tg-theme-button-color")

            if (mainButtonAPI.textColor !== textColor)
                mainButtonAPI.textColor = textColor || getThemeColor("--tg-theme-button-text-color")

            //logic for loading indicator 
            if (fetching)
                mainButtonAPI.showProgress(false)
            else if (mainButtonAPI.isProgressVisible)
                mainButtonAPI.hideProgress()

        }, [text, color, textColor, fetching])

        useOnClick({ componentTG: mainButtonAPI, onClick })

        return (
            null
        )
    }
)