import SparkMD5 from 'spark-md5'
import notification from 'ant-design-vue/es/notification'
import { getUploadToken, checkFile, checkChunk, uploadChunk, uploadDoneMerge } from './api/file'

export function uplodaFile (options, path = '') {
    // eslint-disable-next-line no-unused-vars
    const { onSuccess, onError, file, onProgress } = options
    const filename = file.name
    getUploadToken()
        .then((res) => {
            const token = res.data
            sliceFile(file).then(({ md5, chunkList }) => {
                file.chunkNum = chunkList.length
                file.successChunk = 0
                onProgress({ percent: 0 })
                checkFile(md5, token).then((res) => {
                    if (res.data.type === '1') {
                        for (let loop = 0; loop < chunkList.length; loop++) {
                            uploadOneChunk(md5, chunkList[loop], token).then((res) => {
                                if (res.status === '1') {
                                    file.successChunk++
                                    onProgress({ percent: (file.successChunk * 100) / file.chunkNum })
                                    if (file.successChunk / file.chunkNum === 1) {
                                        uploadDoneMerge(md5, file.chunkNum, md5 + filename, path, token).then((res) => {
                                            onSuccess(`${process.env.VUE_APP_API_FILE_PREVIEW_URL}${res.data}`)
                                        })
                                    }
                                }
                            })
                        }
                    } else if (res.data.type === '2') {
                        onProgress({ percent: 100 })
                        onSuccess(`${process.env.VUE_APP_API_FILE_PREVIEW_URL}${res.data.url}`)
                    }
                })
            })
        })
        .catch((err) => {
            console.log(err)
            notification.error({
                message: `上传文件失败`,
                description: err.msg || '请求出现错误，请稍后再试'
            })
        })
}
/**
 * 计算md5，实现断点续传及秒传
 * @param file
 */
function sliceFile (file) {
    return new Promise((resolve) => {
        const chunkSize = 5 * 1024 * 1024 // 每片的大小，这里是5M
        let currentChunk = 0
        const fileSpark = new SparkMD5.ArrayBuffer()
        const chunkList = []
        const chunks = Math.ceil(file.size / chunkSize) // 总片数
        const fileReader = new FileReader()
        let fileMd5 = ''
        const blobSlice = File.prototype.slice
        fileReader.onload = (e) => {
            const chunkSpark = new SparkMD5.ArrayBuffer()
            chunkSpark.append(e.target.result)
            fileSpark.append(e.target.result)
            chunkList[currentChunk] = { chunk: chunkList[currentChunk], chunkMd5: chunkSpark.end(), chunkIndex: currentChunk }
            if (currentChunk < chunks - 1) {
                currentChunk++
                loadNext(currentChunk, chunkSize, file, blobSlice, fileReader, chunkList)
            } else {
                fileMd5 = fileSpark.end()
                resolve({ md5: fileMd5, chunkList })
            }
        }
        loadNext(currentChunk, chunkSize, file, blobSlice, fileReader, chunkList)
    })
}

function uploadOneChunk (fileMd5, chunk, sign) {
    return new Promise((resolve) => {
        checkChunk(fileMd5, chunk, sign).then((res) => {
            if (!res.data) {
                uploadChunk(fileMd5, chunk, sign).then((res) => {
                    resolve(res)
                })
            } else {
                resolve(res)
            }
        })
    })
}

function loadNext (currentChunk, chunkSize, file, blobSlice, fileReader, chunkList) {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    const chunkFile = blobSlice.call(file, start, end)
    fileReader.readAsArrayBuffer(chunkFile)
    chunkList.push(chunkFile)
}
