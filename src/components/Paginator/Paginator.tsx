import React, { FC, useState } from 'react'
import c from './Paginator.module.scss'
import cn from 'classnames'

type OwnProps = {
    pageCount: number
    page: number
    countOfItemsOnPage: number
    loadPictures: (page: number) => void
}

type Props = OwnProps

const Paginator: FC<Props> = props => {
    const {pageCount, page, countOfItemsOnPage, loadPictures} = props
    const pages: Array<number> = new Array()

    for(let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const onSetPage = (page: number) => {
        loadPictures(page)
    }

    const countOfPortions = Math.ceil(pageCount / countOfItemsOnPage)

    const [portion, setPortion] = useState<number>(1)
    
    let leftBorderPositionOfPortion = (portion-1) * props.countOfItemsOnPage+1
    let rightBorderPositionOfPortion = portion * props.countOfItemsOnPage

    return (
        <div>
            <ul className={c.pages}>
            {portion > 1 && <button onClick={() => setPortion(portion-1)}>prev</button>} 
                {
                    pages
                        .filter(p => p >= leftBorderPositionOfPortion && p <= rightBorderPositionOfPortion)
                        .map( (p) => {
                            return <li 
                                        key={p * Math.random()}
                                        onClick={() => onSetPage(p)}
                                        className={ cn({[c.selected]: p === page})}
                                    >
                                        {p}
                                    </li>
                        } )
                }
             {portion < countOfPortions && <button onClick={() => setPortion(portion+1)}>next</button>}
            </ul>
        </div>
    )
}

export default Paginator