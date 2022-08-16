import React, {Fragment,useState} from 'react';
import { createWorker,PSM } from "tesseract.js";
import {TextToSpece} from '../../Helper/ValidationHelper'
import {withRouter} from "react-router";

const Index=()=> {

  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);

  const worker = createWorker({
    logger: (m) => {
      console.log(m);
    },
  });

  const convertImageToText = async () => {
    const isLoading = document.querySelector('.isLoading');
    isLoading.classList.remove('d-none')
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
    isLoading.classList.add('d-none')
  }

  const handleImageChange = (e)=> {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  const Voice = (e)=>{
    TextToSpece(ocr)
  }


  return (
    <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header pb-0">
                            <h4 className="animated fadeInUp text-center">Convert Image to Text</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                              <p>Choose an Image</p>
                              <input onChange={handleImageChange} className="form-control animated fadeInUp" type="file" accept="image/*"/>
                            </div>
                            <div className='row'>
                              <div className="display-flex">
                                <img src={imageData} width={"500px"} alt=""/>
                                <h3 className='d-none redColor isLoading'>
                                  <span className='redColor'>loading....</span>
                                  </h3>
                                <p className='generateTxt'>{ocr}</p>
                              </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4  m-auto p-2">
                                    <button onClick={convertImageToText} className="btn btn-primary  animated fadeInUp w-100">Convert Image-To-TEXT</button>
                                    <button onClick={Voice} className="btn btn-success  animated fadeInUp w-100">Convert Voice</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default withRouter(Index);
