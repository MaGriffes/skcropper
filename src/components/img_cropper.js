import React, { useRef, useState,useEffect} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './img_cropper.css';
function SkCropper(props) {
  const { 
    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761537407,390034846&fm=26&gp=0.jpg",
    width = 472, // 容器宽高
    height = 285,
    selectInd = 1, // 默认选中项
    imgW = 750, // 图片宽高
    imgH = 300,
    isHand = true,
    selectColor = 'red',
    defaultColor = 'blue',
    borderW = 2,
    detectList =[],
    onSlice
  } = props;
  const cropperEl = useRef(null);
  const [translateX, setTranslateX] = useState(0); //X偏移量
  const [translateY, setTranslateY] = useState(0); //Y偏移量
  const [activeInd, setActiveInd] = useState(selectInd); //Y偏移量
  /** 
   * 图片加载完毕后执行此函数
   * 1.获取图片偏移量 （object-fit:contain 组件内部使用该方法）
  */
  function disabledCropper() {
    let str = document.querySelector('.cropper-canvas').style.transform;
    let translateX = str.includes('translateX')
      ? str.split('translateX(')[1].split('px)')[0]
      : 0;
    let translateY = str.includes('translateY')
      ? str.split('translateY(')[1].split('px)')[0]
      : 0;
    setTranslateX(translateX);
    setTranslateY(translateY);
  }
  function cropperImg(ind,params){
    setActiveInd(ind);
    const { objRight, objLeft, objTop, objBottom } = params;
    const height = objBottom - objTop;
    const width = objRight - objLeft;
    commonCropper(height, objLeft, objTop, width);
  }
  function crop(){
    const dataURL = cropperEl.current.getCroppedCanvas().toDataURL();
    onSlice(dataURL)
  }
  /**
   * 根据传递的宽高及起始点位在利用 canvas drawImage方法在图片重新绘制一张图片
  */
  function commonCropper(
    height,
    left,
    top,
    width,
  ) {
    let image = new Image();
    image.src = src;
    image.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, left, top, width, height, 0, 0, width, height);
      let ext = image.src
        .substring(image.src.lastIndexOf('.') + 1)
        .toLowerCase();
      let dataURL = canvas.toDataURL('image/' + ext);
      console.log(dataURL,'dataURL')
      onSlice(dataURL)
    };
  }
  return (
      <div className='cropper-container'  style={{
        width,
        height
      }}>
        <Cropper
          ref={cropperEl}
          src={src}
          style={{
            width:'100%',
            height:'100%'
          }}
          disabled
          viewMode={0} //定义cropper的视图模式
          // zoomable={false} //是否允许放大图像
          guides={true} //显示在裁剪框上方的虚线
          background={false} //是否显示背景的马赛克
          toggleDragModeOnDblclick={true}
          autoCrop={false} // 关闭初始化裁剪
          autoCropArea={1}
          zoomTo={1}
          movable={true}
          crop={crop} 
          ready={disabledCropper}
        />
        {
          isHand && detectList.length ? (
            <div className='cropperMarkList'>
              {detectList.map((item, i) => {
                const { objTop, objBottom, objLeft, objRight } = item;
                let wx = (width - translateX * 2) / imgW;
                let hx = (height - translateY * 2) / imgH;
                console.log(wx, hx, translateX, translateY, imgW, imgH);
                let objY = 0;
                let objX = 0;
                let top = 0;
                let left = 0;
                objX = (objRight - objLeft) * wx;
                objY = (objBottom - objTop) * hx;
                top = objTop * hx + translateY * 1;
                left = objLeft * wx + translateX * 1;
                let color = (i+1) === activeInd ? selectColor : defaultColor;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: top,
                      left: left,
                      width: objX,
                      height: objY,
                      border: `${borderW}px solid ${color}`,
                      cursor: 'pointer',
                    }}
                    onClick={() => cropperImg((i+1),item)}
                  />
                );
              })}
            </div>
          ) : null
        }
      </div>
        )
        }

export default SkCropper;