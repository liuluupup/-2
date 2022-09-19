import request from '@/utils/request'

  export function searchUser (param) {
      return request({
          url: `/api/user/search`,
          method: 'post',
          data: param
      })
  }
  export function updateStatus (param) {
    return request({
        url: `/api/user/updateStatus`,
        method: 'post',
        data: param
    })
}
