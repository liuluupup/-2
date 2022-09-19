import request from '@/utils/request'

export function searchExamine (param) {
    return request({
        url: `/admin/comment/search`,
        method: 'post',
        data: param
    })
}

export function setTop (id) {
    return request({
        url: `/admin/comment/setTop/${id}`,
        method: 'post'
    })
}

export function del (id) {
    return request({
        url: `/admin/comment/delete/${id}`,
        method: 'get'
    })
}

export function updateStatus (param) {
    return request({
        url: `/api/user/updateStatus`,
        method: 'post',
        data: param
    })
}
