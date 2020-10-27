import React, { Fragment } from 'react';
import Info from '../../assets/icons/Info';
import EntryItem from './EntryItem';
import bitmap from '../../assets/images/contesy_centeral/bitmap-2.png';
import Ball from '../../assets/icons/Ball';
import Basket from '../../assets/icons/Basket';
import BasketBall from '../../assets/icons/BasketBall';
import Hockey from '../../assets/icons/Hockey';

const ContestCentralGridiTem = ({ sport, title, time, entries, totalEntries, prize, fee }) => {
    const icon = () => {
        switch (sport.toLowerCase()) {
            case 'mlb':
                return <BasketBall />
            case 'nba':
                return <Basket />
            case 'nfl':
                return <Ball />
            default:
                return <Hockey />
        }
    }
    return (
        <Fragment>
            <div className='__row'>
                {icon()}
                <div className='__ml-1 __mr-1'>
                    <div className='__heading-6'>{sport}</div>
                    <div className='__small'>{time}</div>
                </div>
                <Info />
            </div>
            <div className='__primary-text __row __heading-6'>{title}</div>
            <EntryItem entries={entries} totalEntries={totalEntries} />
            <div>{prize} <div className='__small'>PRIZES</div></div>
            {fee ?
                <div className='__row __heading-6'>{fee} <img src={bitmap} alt='' /></div>
                : <div className='__row __heading-6'>Free Entry <span class="__chevron __right"></span></div>
            }
        </Fragment>
    )
}

export default ContestCentralGridiTem;