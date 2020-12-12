import React from 'react';
import './ListItem.scss';
import CheckIcon from '../icons/CheckIcon';

const ListItem = props => (
    <div className={`__list-item __flex __flex-start ${props.className}`}>
        <div className='__star'>
            <CheckIcon alt='' className='__check' />
        </div>
        <div>
            {props.children}
        </div>
    </div>
)

export default ListItem;