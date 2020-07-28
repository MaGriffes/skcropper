import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import ImgCropper from './components/img_cropper';

const App = () => {
  const [base64Url,setBase64Url] = useState('')
  function handleSlice(url){
    setBase64Url(url);
  }
  return (
    <div>
      <ImgCropper 
      onSlice={handleSlice}
      width={472}
      height={285}
      />
    </div>
  )
}

//要实现局部热更新，必须要添加此句
if (module.hot) {module.hot.accept()}

ReactDOM.render(<App />, document.getElementById('root'));