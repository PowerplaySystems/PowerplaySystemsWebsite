import React, { Fragment } from 'react';
import Ball from '../../assets/icons/Ball';
import Basket from '../../assets/icons/Basket';
import Hockey from '../../assets/icons/Hockey';
import ContestCentralGridiTem from './ContestCentralGridiTem';

const Sports = props => {
    return (
        <div className='__contest-central-games __sports'>
            <div className='__row __badges __row-center __mb-2'>
                <div className='__badge __primary-text'><Ball />NFL</div>
                <div className='__badge'><Basket />NBA</div>
                <div className='__badge'><Hockey />NHL</div>
                <div className='__badge'>Show All</div>
            </div>
            <div className='__heading-6 __most-popular __ml-1'>Most Popular</div>
            <div className='__contest-central-grid'>
                <div>Sport</div>
                <div>Contest</div>
                <div>Entries</div>
                <div>Total Prizes</div>
                <div></div>

                <ContestCentralGridiTem
                    title='Chase The Ace'
                    sport='MLB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={58589}
                    totalEntries={200000}
                    prize='$800'
                    fee='$1000'
                />
                <ContestCentralGridiTem
                    title='PowerLine'
                    sport='MLB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={15395} 
                    totalEntries={19161}
                    prize='$1K in Bonus Cash'
                />
                <ContestCentralGridiTem
                    title='21’s'
                    sport='NBA'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={1497} 
                    totalEntries={150000}
                    prize='$3000'
                    fee='$10000'
                />
                <ContestCentralGridiTem
                    title='Chase The Ace'
                    sport='MLB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={27433} 
                    totalEntries={71856}
                    prize='$3K in Bonus Cash'
                />
                <ContestCentralGridiTem
                    title='Power DFS'
                    sport='NFL'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={32975} 
                    totalEntries={250000}
                    prize='$3,000'
                />
                <ContestCentralGridiTem
                    title='Power Draft'
                    sport='NBA'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={18699}
                    totalEntries={247904}
                    prize='$10,000'
                />
                <ContestCentralGridiTem
                    title='PowerLine'
                    sport='NFL'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={21183}
                    totalEntries={59523}
                    prize='$300,000'
                />
            </div>
        </div>
    )
}

export default Sports;