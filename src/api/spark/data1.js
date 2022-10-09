import request from '@/utils/request'

export function makedata (data) {
    return request({
        url: `/api/spark/generateData`,
        method: 'post',
        params: data
    })
}

export function getbrand (data) {
    return request({
        url: `/api/spark/getLogData`,
        method: 'post',
        params: data
    })
}
