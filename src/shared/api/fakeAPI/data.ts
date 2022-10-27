import { datetime } from "../../lib/datetime"
import { random } from "../../lib/math/random"
import { IDestination, IRide, IUser } from "../../api.types"

export const LIST_DESTINATION: Array<IDestination> = [
    {
        country: "Россия",
        city: "Владикавказ",
        flag: "🇷🇺"
    },
    {
        country: "Грузия",
        city: "Тбилиси",
        flag: "🇬🇪"
    },
    {
        country: "Казахстан",
        city: "Алматы",
        flag: "🇰🇿"
    },
    {
        country: "Россия",
        city: "Москва",
        flag: "🇷🇺"
    },
    {
        country: "Россия",
        city: "Санкт-Петербург",
        flag: "🇷🇺"
    },
    {
        country: "Россия",
        city: "Черкесск",
        flag: "🇷🇺"
    },
    {
        country: "Грузия",
        city: "Батуми",
        flag: "🇬🇪"
    },
    {
        country: "Турция",
        city: "Стамбул",
        flag: "🇹🇷"
    }
]


export const LIST_USERS: Array<IUser> = [
    {
        name: "Размир",
        avatar: "/img/1-avatar.jpg",
        phone: "+79102812918",
        tgNick: "Razmir22"
    },
    {
        name: "Никита",
        avatar: "/img/2-avatar.jpg",
        phone: "+9955991078",
        tgNick: "NikitaDrev"
    },
    {
        name: "Ella",
        avatar: "/img/3-avatar.jpg",
        phone: "+291019291",
        tgNick: "Elenas"
    },
    {
        name: "Сергей",
        avatar: "/img/4-avatar.jpg",
        phone: "+383092189",
        tgNick: "Sergey"
    },
    {
        name: "Роман",
        avatar: "/img/5-avatar.jpg",
        phone: "+2910222221",
        tgNick: "Romans"
    }
]

export function getRandUser() {
    return LIST_USERS[random(0, LIST_USERS.length - 1)]
}

export function getRandDest() {
    return LIST_DESTINATION[random(0, LIST_DESTINATION.length)]
}