import clsx from 'clsx'
import { IUser } from '@/shared/api.types'
import { Avatar } from '@/shared/ui/Avatar'
import styles from './UserCell.module.css'

interface UserCellProps extends IUser {
    className?: string
}

export function UserCell({ className, name, avatar, phone, tgNick }: UserCellProps) {
    return (
        <div className={clsx(styles.UserCell, className)}>
            <Avatar className={styles.UserCell__Avatar} size='m' name={name} photo={avatar} />
            <div className={styles.UserCell__Info}>
                <div className={styles.UserCell__Name}>{name}</div>
                <div className={styles.UserCell__Contact}>
                    <span>{phone}</span>
                    <span>@{tgNick}</span>
                </div>
            </div>
        </div>
    )
}