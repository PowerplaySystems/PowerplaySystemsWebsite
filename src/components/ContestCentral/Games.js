import React from 'react';
import Ball from '../../assets/icons/Ball';
import Basket from '../../assets/icons/Basket';
import Hockey from '../../assets/icons/Hockey';
import ContestCentralGridiTem from './ContestCentralGridiTem';
import Casino from '../../assets/icons/Casino';
import PlayingCards from '../../assets/icons/PlayingCards';

const Games = props => {
    return (
        <div className='__contest-central-games __games'>
            <div className='__row __badges __row-center __mb-2'>
                <div className='__badge'><Casino />Lottery</div>
                <div className='__badge'><PlayingCards />Card Games</div>
                <div className='__badge'>Show All</div>
            </div>
            <div className='__heading-6 __most-popular __ml-1 __mb-1'>Most Popular</div>
            <div className='__contest-central-grid'>
                <div>Sport</div>
                <div>Contest</div>
                <div>Entries</div>
                <div>Total Prizes</div>
                <div></div>

                <ContestCentralGridiTem
                    title='Chase The Ace'
                    sport='TDB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={58589}
                    totalEntries={200000}
                    prize='$800'
                    fee='$1000'
                />
                <ContestCentralGridiTem
                    title='PowerLine'
                    sport='Card Game'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={15395} 
                    totalEntries={19161}
                    prize='$1K in Bonus Cash'
                />
                <ContestCentralGridiTem
                    title='21’s'
                    sport='TDB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={1497} 
                    totalEntries={150000}
                    prize='$3000'
                    fee='$10000'
                />
                <ContestCentralGridiTem
                    title='Chase The Ace'
                    sport='Card Game'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={27433} 
                    totalEntries={71856}
                    prize='$3K in Bonus Cash'
                />
                <ContestCentralGridiTem
                    title='Power DFS'
                    sport='TDB'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={32975} 
                    totalEntries={250000}
                    prize='$3,000'
                />
                <ContestCentralGridiTem
                    title='Power Draft'
                    sport='Card Game'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={18699}
                    totalEntries={247904}
                    prize='$10,000'
                />
                <ContestCentralGridiTem
                    title='PowerLine'
                    sport='Card Game'
                    time='Oct 24, 2020 | 8:00PM ET'
                    entries={21183}
                    totalEntries={59523}
                    prize='$300,000'
                />
            </div>
        </div>
    )
}

export default Games;