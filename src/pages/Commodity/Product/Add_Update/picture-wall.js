import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../../../api'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
    constructor(props){
        super(props);
        let fileList = [];
        if(this.props.isUpdate){
            fileList = this.props.images.map((img,index) => {
                return {
                    uid:'-'+index,
                    percent: 50,
                    name: img,
                    status: 'done',
                    url: '/api1//upload/'+img,//查看地址
                  }
            })
        }
        this.state = {
            previewVisible: false,//是否预览
            previewImage: '',//预览的图片
            previewTitle: '',//与预览名
            fileList,
        
        };
    }
  

//   getFileList = () => {
      
//   }

// 得到整理数据，传递给form 父级
    imgsDataToFather = () => {
        const imgsData = this.state.fileList.map(file=>file.name);
        this.props.getImgDataToForm(imgsData);
    }

  deleteImg =async (name) => {
      const result = await reqDeleteImg(name);

      if (name === ''||result.status ===0) {
          message.success('删除图片成功');
        //   删除成功j将现有的图片列表返回给forn
        this.imgsDataToFather();
      }else{
          message.error('图片删除失败')
      }
  }
  handleCancel = () => this.setState({ previewVisible: false });



  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList,file }) =>{
      console.log('change',fileList)
      console.log('change-file',file)

    //   上传成功
      if (file.status === 'done') {
          message.success('上传成功',1);
        // 重新设置名字和url
        const newfile = fileList[fileList.length-1];
        newfile.name = file.response.data.name;
        newfile.url = '/api1/upload/'+newfile.name;

        
      }
      if (file.status === "removed") {
        this.deleteImg(file.name);
      }
    //   更新数据
      this.setState({ fileList })

      // 数据更新。上传数据给父级
      this.imgsDataToFather();
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          accept ='image/*' //接受上传的文件类型
          name	='image' //发到后台的文件参数名
          action="/api1/manage/img/upload" //上传的地址
          listType="picture-card"   //上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card  展示出来的样式
          fileList={fileList}   //图片列表
          onPreview={this.handlePreview} //点击预览的回调
          onChange={this.handleChange}  //状态改变的回调 上传中、完成、失败都会调用这个函数。
        >
            {/*//超过8个文件就不出现上传按钮  */}
          {fileList.length >= 8 ? null : uploadButton} 
        </Upload>

        {/* 预览组件 */}
        <Modal
          visible={previewVisible}  //是否预览
          title={previewTitle}  //预览图名
          footer={null} //
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}