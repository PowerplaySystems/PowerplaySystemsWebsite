import React, { Fragment, useEffect, useState } from 'react';
import Info from '../../assets/icons/Info';
import EntryItem from './EntryItem';
import bitmap from '../../assets/images/contesy_centeral/bitmap-2.png';
import Ball from '../../assets/icons/Ball';
import Basket from '../../assets/icons/Basket';
import BasketBall from '../../assets/icons/BasketBall';
import Hockey from '../../assets/icons/Hockey';
import Casino from '../../assets/icons/Casino';
import PlayingCards from '../../assets/icons/PlayingCards';
import './ContestCentralGridiTem.scss'

const ContestCentralGridiTem = ({ sport, title, time, entries, totalEntries, prize, fee }) => {
    const [isMobileMode, setIsMobileMode] = useState(false);
    const responsiveHandler = screenSize => {
        screenSize.matches ? setIsMobileMode(true) : setIsMobileMode(false);
    }
    useEffect(() => {
        const screenSize = window.matchMedia("(max-width: 1150px)");
        responsiveHandler(screenSize);
        screenSize.addListener(responsiveHandler);
        return () => {
            screenSize.removeListener(responsiveHandler);
        }
    }, [])
    const icon = () => {
        switch (sport.toLowerCase()) {
            case 'mlb':
                return <BasketBall />
            case 'nba':
                return <Basket />
            case 'nfl':
                return <Ball />
            case 'nhl':
                return <Hockey />
            case 'tdb':
                return <Casino />
            default:
                return <PlayingCards />
        }
    }
    return !isMobileMode ? (
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
    ) : (
            <div className='__contest-central-card __m-1'>
                <div className='__row'>
                    <div className='__row __mr-a'>
                        <div className='__icon __primary'>{icon()}</div>
                        <div className='__mr-a'>
                            <div className='__heading-6'>{sport}</div>
                            <div className='__primary-text __row __heading-6'>{title}</div>
                        </div>
                    </div>
                    <div className='__small __time'>{time.replace('|', '')} <Info /></div>
                </div>
                <div className='__row __mt-1 __sb'>
                    <EntryItem entries={entries} totalEntries={totalEntries} />
                    <div>
                        <div className='__small'>PRIZES</div>
                        <div className='__heading-6'>{prize}</div>
                    </div>
                </div>
                {fee ?
                    <button>{fee} <img src={bitmap} alt='' /></button> :
                    <button>Free Entry <span class="__chevron __right"></span></button>}
            </div>
        )
}

export default ContestCentralGridiTem;