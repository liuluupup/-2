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

export function getPinpai (data) {
    console.log(data)
    return request({
        url: `/api/result/getBrandPercent?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getXitong (data) {
    console.log(data)
    return request({
        url: `/api/result/getSystemPercent?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getXiangsu (data) {
    console.log(data)
    return request({
        url: `/api/result/getCameraTop5?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getChongdian (data) {
    console.log(data)
    return request({
        url: `/api/result/getPowerTop10?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getDianchi (data) {
    console.log(data)
    return request({
        url: `/api/result/getBatteryTop10?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getPinglun (data) {
    console.log(data)
    return request({
        url: `/api/result/getCommentTop10?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getZhongliang (data) {
    console.log(data)
    return request({
        url: `/api/result/getWeightTop10?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getShangshi (data) {
    console.log(data)
    return request({
        url: `/api/result/getLaunchTop10?taskId=1`,
        method: 'get',
        params: data
    })
}

export function getShuaxin (data) {
    console.log(data)
    return request({
        url: `/api/result/getRateTop5?taskId=1`,
        method: 'get',
        params: data
    })
}
