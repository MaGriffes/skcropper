# 欢迎使用 imgCropper

---

整合图片裁剪,可手动裁剪也可根据坐标点位裁剪图片指定区域

##使用方法
1 下载安装包
npm install --save skcropper
yarn add --save skcropper
  
  
 2 安装依赖
npm | yarn

## 案例

        <ImgCropper
        onSlice={handleSlice}
        cropperStyle={{width: 472,height:285}}
        src="https://i.loli.net/2020/07/27/3K6Vz41axEuAWRC.png",
        detectList = [{
            objBottom: "154"
            objLeft: "358"
            objRight: "459"
            objTop: "21"
        }]

      />

![cmd-markdown-logo](https://i.loli.net/2020/07/27/3K6Vz41axEuAWRC.png)

---

### 7.参事说明

| 参数         |  类型  |                                                 说明 | 必填 |
| :----------- | :----: | ---------------------------------------------------: | ---- |
| onSlice      |  func  |                                 裁剪后的 url(base64) | 是   |
| width        | number |                                             容器宽度 | 是   |
| width        | number |                                             容器宽度 | 是   |
| imgW         | number |                                             图片宽度 | 是   |
| imgH         | number |                                             图片宽度 | 是   |
| borderW      | number |                                             边线宽度 | 否   |
| selectInd    | number |                                             默认框选 | 否   |
| isHand       |  bool  |                           切换（点击坐标或手动裁剪）    | 否   |
| selectColor  | string |                                             选中颜色 | 否   |
| defaultColor | string |                                             默认颜色 | 否   |
| detectList   | array  | [{objTop, objBottom, objLeft, objRight}]坐标字段必有  | 否   |
