import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://interview.agileengine.com/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export type Auth = {
    auth: boolean
    token: string
}

export const Auth_API = {
    getAuth() {
        return instance
            .post<Auth>('auth', JSON.stringify({ "apiKey": "23567b218376f79d9415" }))
            .then(res => res.data)
    }
}

export type ImageType = {
    id: string
    cropped_picture: string
}

type GetImagesRes = {
    pictures: Array<ImageType>
    page: number
    pageCount: number
    hasMore: boolean
}

export type GetImageRes = {
    id: string
    author: string
    camera: string
    tags: string
    cropped_picture: string
    full_picture: string
}

export const Images_API = {
    getImages(page: number, token: string) {
        return instance
            .get<GetImagesRes>(`images?page=${page}`, {
                headers: {
                    Authorization: token
                }
            })
            .then(res => res.data)
    },
    getImage(id: any, token: string) {
        return instance
        .get<GetImageRes>(`images/${id}`, {
            headers: {
                Authorization: token
            }
        })
        .then(res => res.data)
    }
}