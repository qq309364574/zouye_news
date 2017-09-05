import React, { Component,PropTypes } from 'react';
import {Form,Card,Input,Button,notification,message} from 'antd'
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
        let {uniquekey} = this.props
        let userid = localStorage.getItem("userId")
        if(!userid){
            message.info('请先登陆');
            return
        }
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>(
                message.success('收藏成功') 
            ))
    } 
    handleSubmit = () => {
        let userid = localStorage.getItem("userId")
        let {comment} = this.props.form.getFieldsValue()
        console.log(comment)
        if(!userid){
            message.info('请先登陆');
            return
        }else if(!comment){
            message.info('请输入内容');
            return
        }
        let {uniquekey} = this.props
        
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet=${comment}`
        axios.get(url)
            .then(response=>(
                this.update(),
                this.props.form.resetFields(),
                notification.success({message: '提交成功!'})
            ))
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
                    <Button type='primary' htmlType="submit">提交</Button>&nbsp;
                    <Button type='primary' onClick={this.handleClick}>收藏</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(NewsComments);