import React, { FC, useState } from 'react'
import c from './Paginator.module.scss'
import cn from 'classnames'
import left_arrow from '../../assets/l.png'
import right_arrow from '../../assets/r.png'

type OwnProps = {
    pageCount: number
    page: number
    countOfItemsOnPage: number
    loadPictures: (page: number) => void
    isFetching: boolean
}

type Props = OwnProps

const Paginator: FC<Props> = props => {
    const {pageCount, page, countOfItemsOnPage, loadPictures, isFetching} = props
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
        <div className={c['paginator-wrap']}>
            <div className={c.paginator}>
                {<ul className={c.pages}>
                {(portion > 1) && <button onClick={() => setPortion(portion-1)}><img src={left_arrow}/></button>}
                    {
                        pages
                            .filter(p => p >= leftBorderPositionOfPortion && p <= rightBorderPositionOfPortion)
                            .map( (p) => {
                                return <li 
                                            key={p}
                                            onClick={() => onSetPage(p)}
                                            className={ cn({[c.selected]: p === page})}
                                        >
                                            {p}
                                        </li>
                            } )
                    }
                {(portion < countOfPortions) && <button onClick={() => setPortion(portion+1)}><img src={right_arrow}/></button>}
                </ul>}
            </div>
        </div>
    )
}

export default Paginator