import request from '@/utils/request'

export function getUploadToken () {
    return request({
        url: `/api/ak/sign`,
        method: 'get'
    })
}

export function checkFile (md5, sign) {
    return request({
        url: `${process.env.VUE_APP_API_FILE_UPLOAD_URL}/api/check-file/check/${md5}`,
        method: 'get',
        headers: {
            sign
        }
    })
}

export function checkChunk (fileMd5, chunk, sign) {
    return request({
        url: `${process.env.VUE_APP_API_FILE_UPLOAD_URL}/api/check-file/check-upload/${fileMd5}/${chunk.chunkIndex}`,
        method: 'get',
        headers: {
            sign
        }
    })
}
export function uploadChunk (fileMd5, chunk, sign) {
    const formData = new FormData()
    formData.append('file', chunk.chunk)
    return request({
        url: `${process.env.VUE_APP_API_FILE_UPLOAD_URL}/api/check-file/upload/${chunk.chunkIndex}/${fileMd5}`,
        method: 'post',
        headers: {
            sign,
            'Content-Type': 'multipart/form-data;charset=UTF-8'
        },
        data: formData
    })
}

export function uploadDoneMerge (fileMd5, chunkNum, fileName, path, sign) {
    return request({
        url: `${process.env.VUE_APP_API_FILE_UPLOAD_URL}/api/check-file/merge`,
        method: 'post',
        headers: {
            sign
        },
        data: {
            checkNum: chunkNum,
            fileMD5: fileMd5,
            fileName,
            type: false,
            path

        }
    })
}
