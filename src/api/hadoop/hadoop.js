import request from '@/utils/request'

export function makedata (data) {
    console.log(data)
    return request({
        url: `/api/spark/generateData`,
        method: 'post',
        data: data
    })
}
export function lisidata (data) {
    console.log(data)
    return request({
        url: `/api/spark/getLogData`,
        method: 'get',
        data: data
    })
}

export function getItemData (data) {
    console.log(data)
    return request({
        url: `/api/spark/getLogDataDetail`,
        method: 'get',
        params: data
    })
}
