import React from 'react';

const EntryItem = ({ entries, totalEntries }) => {
    const percentage = `${(entries / totalEntries * 100).toFixed()}%`;
    const convertedEntries = entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <div className='__EntryItem'>
            <div><span className='__title'>{convertedEntries(entries)}</span> <span>of {convertedEntries(totalEntries)}</span></div>
            <div className='__row __small __percentage-bar-wrapper'>
                <span className='__text-percentage'>{percentage} Full</span>
                <div className='__percentage-bar'>
                    <div className='__primary' style={{ width: percentage }}></div>
                </div>
            </div>
        </div>
    )
}

export default EntryItem;