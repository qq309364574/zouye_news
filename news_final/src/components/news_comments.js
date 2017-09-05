import React, { Component,PropTypes } from 'react';
import {Form,Card,Input,Buttom,notification,message} from 'antd'
import axios from 'axios'
const FormItem = Form.Item
class NewsComments extends Component {
    static propTypes = {
        uniquekey:PropTypes.string.isRequired
    }
    state = { 
        comments:[]
     }
    componentDidMount(){
        this.update()
    }
    update = () => {
        let {uniquekey} = this.props
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                let comments = response.data
                this.setState({comments})
            })
    }
    handleClick = () => {
        let userid = localStorage.getItem("userId")
        if(!userid){
            message.info('请先登陆');
            return
        }
        let {uniquekey} = this.props
        let {commnet} = this.props.form.getFieldsValue()
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet=${commnet}`
        axios.get(url)
            .then(response=>(
                this.update(),
                this.props.form.resetFields(),
                notification.success({message: '提交成功!'})
            ))
    } 
    handleSubmit = () => {

    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let commentsList = this.state.comments.map((item,index)=>(
            <Card key={index} title={item.UserName} extra={`发布于${item.datetime}`}>
                <p>{item.Comments}</p>
            </Card>
        )) 
        return (
            <div style={{padding:'10px'}}>
                {commentsList}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="您的评论">
                        {
                            getFieldDecorator('comment')(<Input type="textarea"/>)
                        }
                    </FormItem>
                    <Buttom type='primary' htmlType="submit"></Buttom>
                    <Buttom type='primary' onClick={this.handleClick}></Buttom>
                </Form>
            </div>
        );
    }
}

export default Form.create()(NewsComments);