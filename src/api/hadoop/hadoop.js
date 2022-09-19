import request from '@/utils/request'

export function getList (param) {
    return request({
        url: `/api/hadoop/list`,
        method: 'get',
        params: param
    })
}

export function addhdfs (data) {
    return request({
        url: `/api/hadoop/commit`,
        method: 'post',
        data: data
    })
}

export function delhdfs (id) {
    return request({
        url: `/api/hadoop/delete/${id}`,
        method: 'delete'
    })
}
