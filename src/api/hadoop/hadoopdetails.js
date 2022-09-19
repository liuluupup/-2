import request from '@/utils/request'

export function getdetailList (param) {
    return request({
        url: `/api/hadoopDetails/list`,
        method: 'get',
        params: param
    })
}

export function addnode (data) {
    return request({
        url: `/api/hadoopDetails/commit`,
        method: 'post',
        data: data
    })
}

export function delnode (id) {
    return request({
        url: `/api/hadoopDetails/delete/${id}`,
        method: 'delete'

    })
}
