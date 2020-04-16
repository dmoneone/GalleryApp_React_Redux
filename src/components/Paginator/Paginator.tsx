import React, { FC } from 'react'
import c from './Paginator.module.scss'

type OwnProps = {
    pageCount: number
    page: number
    loadPictures: (page: number) => void
}

type Props = OwnProps

const Paginator: FC<Props> = props => {
    const {pageCount, page, loadPictures} = props
    const pages: Array<number> = new Array()

    for(let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const onSetPage = (page: number) => {
        loadPictures(page)
    }

    return (
        <div>
            <ul className={c.pages}>
                {
                    pages.map( (page) => {
                        return <li 
                                    key={page * Math.random()}
                                    onClick={() => onSetPage(page)}
                                >
                                    {page}
                                </li>
                    } )
                }
            </ul>
        </div>
    )
}

export default Paginator