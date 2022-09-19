import request from '@/utils/request'

export function execfreeKey (id) {
    return request({
        url: `/api/shell/execFreeKey`,
        method: 'get',
        params: {
          hadoopId: id
        }
    })
}

export function execShell () {
    return request({
      url: `/api/shell/t`,
      method: 'get'
    })
  }

export function execHdfs (params) {
    return request({
      url: `/api/shell/execHdfs`,
      method: 'get',
      params
    })
  }

  export function execJps (params) {
    return request({
      url: `/api/shell/execJps`,
      method: 'get',
      params
    })
  }
