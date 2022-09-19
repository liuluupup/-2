import request from '@/utils/request'

export function searchOrder (param) {
    return request({
        url: `/admin/order/search`,
        method: 'post',
        data: param
    })
}

export function getOrder (id) {
    return request({
        url: `/admin/order/get/${id}`,
        method: 'get'
    })
}
