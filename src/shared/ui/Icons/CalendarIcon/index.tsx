import React from 'react'
import { Icon, IconProps, IconTemplateProps } from '../Icon/Icon'

export function CalendarIcon({ className, ...props }: IconTemplateProps) {
    return (
        <Icon
            className={className}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 18">
                    <path d="M4.72222 10.8C4.45463 10.8 4.23017 10.7136 4.04883 10.5408C3.86813 10.3686 3.77778 10.155 3.77778 9.9C3.77778 9.645 3.86813 9.4311 4.04883 9.2583C4.23017 9.0861 4.45463 9 4.72222 9C4.98981 9 5.21428 9.0861 5.39561 9.2583C5.57631 9.4311 5.66667 9.645 5.66667 9.9C5.66667 10.155 5.57631 10.3686 5.39561 10.5408C5.21428 10.7136 4.98981 10.8 4.72222 10.8ZM8.5 10.8C8.23241 10.8 8.00826 10.7136 7.82756 10.5408C7.64622 10.3686 7.55556 10.155 7.55556 9.9C7.55556 9.645 7.64622 9.4311 7.82756 9.2583C8.00826 9.0861 8.23241 9 8.5 9C8.76759 9 8.99206 9.0861 9.17339 9.2583C9.35409 9.4311 9.44444 9.645 9.44444 9.9C9.44444 10.155 9.35409 10.3686 9.17339 10.5408C8.99206 10.7136 8.76759 10.8 8.5 10.8ZM12.2778 10.8C12.0102 10.8 11.786 10.7136 11.6053 10.5408C11.424 10.3686 11.3333 10.155 11.3333 9.9C11.3333 9.645 11.424 9.4311 11.6053 9.2583C11.786 9.0861 12.0102 9 12.2778 9C12.5454 9 12.7695 9.0861 12.9502 9.2583C13.1316 9.4311 13.2222 9.645 13.2222 9.9C13.2222 10.155 13.1316 10.3686 12.9502 10.5408C12.7695 10.7136 12.5454 10.8 12.2778 10.8ZM1.88889 18C1.36944 18 0.924611 17.8239 0.554389 17.4717C0.184796 17.1189 0 16.695 0 16.2V3.6C0 3.105 0.184796 2.6814 0.554389 2.3292C0.924611 1.9764 1.36944 1.8 1.88889 1.8H2.83333V0.8775C2.83333 0.6225 2.92369 0.4125 3.10439 0.2475C3.28572 0.0825001 3.51019 0 3.77778 0C4.04537 0 4.26983 0.0860999 4.45117 0.2583C4.63187 0.4311 4.72222 0.645 4.72222 0.9V1.8H12.2778V0.8775C12.2778 0.6225 12.3684 0.4125 12.5498 0.2475C12.7305 0.0825001 12.9546 0 13.2222 0C13.4898 0 13.714 0.0860999 13.8947 0.2583C14.076 0.4311 14.1667 0.645 14.1667 0.9V1.8H15.1111C15.6306 1.8 16.0754 1.9764 16.4456 2.3292C16.8152 2.6814 17 3.105 17 3.6V16.2C17 16.695 16.8152 17.1189 16.4456 17.4717C16.0754 17.8239 15.6306 18 15.1111 18H1.88889ZM1.88889 16.2H15.1111V7.2H1.88889V16.2Z" />
                </svg>
            }
            {...props}
        />
    )
}