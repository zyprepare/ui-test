import React from 'react'
import Upload from '../src'

/**
 * @title 照片墙上传
 * @desc 展示一组照片内容
 */
export const Photo = () => {
  return (
    <>
      <h1>Photo</h1>
      <div className="upload-photo__wrap">
        <Upload
          type="photo"
          uploadAction="http://www.mocky.io/v2/5dc3b4413000007600347501"
          onChange={(file, fileList, response) => {
            console.log('upload callback', file, fileList, response)
          }}
          onRemove={(file, fileList, index) => {
            console.log('remove callback', file, fileList, index)
            return new Promise((resolve, reject) => resolve(true))
          }}
          defaultFileList={[
            {
              name: 'a.png',
              fileType: 'img', // 文件类型，可取值img, zip, word, pdf, ppt, excel, other
              uploadState: 'success', // 上传状态，可取值success, error
              url: 'https://i8.mifile.cn/a1/pms_1531116957.78852376.jpg',
            },
            {
              name: 'b.png',
              fileType: 'img',
              uploadState: 'error',
              url: 'https://i1.mifile.cn/f/i/2018/mix3/specs_black.png',
            },
          ]}
          data={{ id: 'uid', channel: 'youpin' }}
          name={'files[]'}
        />
      </div>
    </>
  )
}
