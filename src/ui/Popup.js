import React, { Fragment } from 'react';
import Close from '../icons/close';
import './PopUp.scss'

const Popup = ({ title, children, closeButton, footer, onClose, show, onHide, }) => show ? (
    <Fragment>
        <div className='__blur' onClick={onHide}></div>
        <div className='__Popup'>
            <div className='__popup-header __sb __flex'><span>{title}</span> {closeButton && <Close onClick={onClose} />}</div>
            <div className='__popup-text'>{children}</div>
            <div className='__popup-footer __flex'>{footer}</div>
        </div>
    </Fragment>
) : null;

export default Popup;