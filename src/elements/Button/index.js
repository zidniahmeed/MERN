import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';

export default function Button(props) {
    const className = [props.className]
    if (props.isPrimary) className.push("btn-primary")
    if (props.isLarge) className.push("btn-lg")
    if (props.isSmall) className.push("btn-sm")
    if (props.isBlock) className.push("btn-block")
    if (props.hasShadow) className.push("btn-shadow")

    const onClick = () => {
        if (props.onClick) props.onClick()
    }
    if (props.isDisabled || props.isLoading) {
        if (props.isDisabled) className.push("disabled")
        return (
            <span className={className.join(" ")} style={props.style}>
                {
                    props.isLoading ? <>
                        <span className='spinner-border spinner-border-sm mx-5'>
                            <span className='sr-only'>Loading....</span>    
                        </span>
                    </> 
                    : props.children
                }
            </span>
        )
    }
    if (props.type === 'Link') {
        if (props.isExternal) {
            return (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                    href={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    target={props.target === '_blank' ? '_blank' : undefined}
                    ref={props.target === '_blank' ? "noopener noreferrer" : undefined}
                >
                    {props.children}
                </a>
            )
        } else {
            <Link
                to={props.href}
                className={className.join(" ")}
                style={props.style}
                onClick={onClick}
            >
                {props.children}
            </Link>
        }
    }

    return (
        <button
            className={className.join(" ")}
            style={props.style}
            onClick={onClick}
        >
            {props.children}
        </button>
    )
}
Button.propTypes = {
    type: propTypes.oneOf(["Button", "Link"]),
    onClick: propTypes.func,
    target: propTypes.string,
    href: propTypes.string,
    className: propTypes.string,
    isPrimary: propTypes.bool,
    isDisabled: propTypes.bool,
    isLoading: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    isBlock: propTypes.bool,
    hasShadow: propTypes.bool,
}
