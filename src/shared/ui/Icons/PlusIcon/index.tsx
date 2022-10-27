import React from 'react'
import { Icon, IconProps, IconTemplateProps } from '../Icon/Icon'
import styles from './PlusIcon.module.css'


export function PlusIcon({ className, ...props }: IconTemplateProps) {
    return (
        <Icon
            className={className}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" >
                    <path d="M29.6337 13.7273H2.35463C1.09918 13.7273 0.0813599 14.7448 0.0813599 16C0.0813599 17.2552 1.09918 18.2727 2.35463 18.2727H29.6337C30.8891 18.2727 31.9069 17.2552 31.9069 16C31.9069 14.7448 30.8891 13.7273 29.6337 13.7273Z" />
                    <path d="M13.7214 2.36047L13.7214 29.6395C13.7214 30.895 14.739 31.9128 15.9942 31.9128C17.2493 31.9128 18.2669 30.895 18.2669 29.6395V2.36047C18.2669 1.10502 17.2493 0.087206 15.9942 0.087206C14.739 0.087206 13.7214 1.10502 13.7214 2.36047Z" />
                </svg>
            }
            {...props}
        />
    )
}