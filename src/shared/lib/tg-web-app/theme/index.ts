import { delay } from "../../async/delay"

export const TG_COLORS_THEME = {
    "--tg-theme-bg-color": {
        light: "#ffffff",
        dark: "#1c1c1d"
    },
    "--tg-theme-text-color": {
        light: "#000000",
        dark: "#ffffff"
    },
    "--tg-theme-hint-color": {
        light: "#8e8e93",
        dark: "#98989e"
    },
    "--tg-theme-link-color": {
        light: "#007aff",
        dark: "#007aff"
    },
    "--tg-theme-button-color": {
        light: "#007aff",
        dark: "#007aff"
    },
    "--tg-theme-button-text-color": {
        light: "#ffffff",
        dark: "#ffffff"
    },
    "--tg-theme-secondary-bg-color": {
        light: "#efeff4",
        dark: "#000000"
    }
}

export type TgColorsTheme = keyof typeof TG_COLORS_THEME
export type Theme = 'light' | 'dark'

export function getThemeColor(color: TgColorsTheme) {
    return Telegram.WebApp.themeParams[changeСSSvarToTG(color)]
}

/** Setting the default color theme if for some reason they were not set from tg */
function setThemeColors(theme: Theme = Telegram.WebApp.colorScheme) {
    const root = document.documentElement
    for (const themeColor in TG_COLORS_THEME) {
        let color = getComputedStyle(root).getPropertyValue(themeColor)
        if (!color) {
            color = TG_COLORS_THEME[themeColor][theme]
            setThemeColor(root, themeColor, color)
        }
    }
}

function setThemeColor(root: HTMLElement, themeColor: string, color: string) {
    root.style.setProperty(themeColor, color)
    Telegram.WebApp.themeParams[changeСSSvarToTG(themeColor)] = color
}

function changeСSSvarToTG(variable: string): string {
    return variable.replace('--tg-theme-', '').replaceAll('-', '_')
}

//(fixes a telegram bug) when a client has the same bg and secondary color
function fixSameColors() {
    const root = document.documentElement
    if (Telegram.WebApp.themeParams['bg_color'] === Telegram.WebApp.themeParams['secondary_bg_color']) {
        setThemeColor(root, '--tg-theme-secondary-bg-color', TG_COLORS_THEME['--tg-theme-bg-color'][Telegram.WebApp.colorScheme])
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    await delay(10)
    fixSameColors()
})

setThemeColors()