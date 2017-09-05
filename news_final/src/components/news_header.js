import React, { Component } from 'react';
import {Row,Col,Menu,Icon,Button,Modal,Form,Input,Tabs,message} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo.png'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class NewsHeader extends Component {
    state = { 
        selectedKey:'top',
        username:null,
        showModal:false
     }
     componentDidMount(){
        //  const username = localStorage.getItem('username')
        let {username} = this.state
         if(username){
             this.setState({username})
         }
     }
     clickMenuItem = ({key}) => {
        this.setState({selectedKey:key})
        if(key==='logout'){
            this.setState({showModal:true})
        }
     }
     setModel = (isShow) => {
        this.setState({showModal:isShow})
     }
     handleSubmit = (islog) => {
        const {username,password,r_username,r_password1,r_password2} = this.props.form.getFieldsValue()
        if(islog){
            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`
            axios.get(url)
                .then(response => {
                    let result = response.data
                    if(!result){
                        message.error('登陆失败')
                    }else{
                        message.success('登陆成功')
                        let {UserId,NickUserName} = result
                        this.setState({username:NickUserName})
                        localStorage.setItem('UserId',UserId)
                        localStorage.setItem('NickUserName',NickUserName)
                        this.setState({showModal:false})
                    }
                })
        }else{
            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=login&r_username=${r_username}&r_password1=${r_password1}&r_password2=${r_password2}`
            axios.get(url)
            .then(response => {
                let result = response.data
                if(result){
                    message.success('注册成功')
                    this.setState({showModal:false})
                }else{
                    message.error('注册失败')
                }
            })
        }
        this.props.form.resetFields()
     }
     logOut = () => {
         this.setState({username:null})
     }
    render() {
        const {selectedKey,username} = this.state
        const {getFieldDecorator} = this.props.form
        const userShow = username
            ?(
                <Menu.Item key='login' className='register'>
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    
                    <Link to='/user_center'>
                        <Button type="dashed">个人中心</Button>
                    </Link>&nbsp;&nbsp;
                    
                        <Button onClick={this.logOut}>退出</Button>
                    
                </Menu.Item>
            )
            :(
                <Menu.Item key='logout' className='register'>
                    <Icon type='appstore' />注册/登陆
                </Menu.Item>
            )
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    {/* logo */}
                    <Col span={3}>
                        <Link to='/' className='logo'>
                            <img src={logo}/>
                            <span>ReactNews</span>
                        </Link>
                    </Col>
                    <Col span={19}>
                        <Menu mode='horizontal' selectedKeys={[selectedKey]} onClick={this.clickMenuItem}>
                            <Menu.Item key='top'>
                                <Icon type='appstore' />头条
                            </Menu.Item>
                            <Menu.Item key='shehui'>
                                <Icon type='appstore' />社会
                            </Menu.Item>
                            <Menu.Item key='yule'>
                                <Icon type='appstore' />娱乐
                            </Menu.Item>
                            <Menu.Item key='guoji'>
                                <Icon type='appstore' />国际
                            </Menu.Item>
                            <Menu.Item key='guonei'>
                                <Icon type='appstore' />国内
                            </Menu.Item>
                            <Menu.Item key='keji'>
                                <Icon type='appstore' />科技
                            </Menu.Item>
                            <Menu.Item key='shishang'>
                                <Icon type='appstore' />时尚
                            </Menu.Item>
                            <Menu.Item key='tiyu'>
                                <Icon type='appstore' />体育
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal
                            title="用户中心"
                            visible={this.state.showModal}
                            onOk={this.setModel.bind(this,false)}
                            onCancel={this.setModel.bind(this,false)}
                            okText='取消'
                            >
                            <Tabs type="card" onChange={()=>this.props.form.resetFields()}>
                                <TabPane tab="登陆" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label='用户名'>
                                            {getFieldDecorator("username")(
                                                <Input type='text'></Input>
                                            )}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator("password")(
                                                <Input type='password'></Input>
                                            )}
                                        </FormItem>
                                        <Button type='primary' htmlType="submit">登陆</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label='用户名'>
                                            {getFieldDecorator("r_username")(
                                                <Input type='text'></Input>
                                            )}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator("r_password1")(
                                                <Input type='password'></Input>
                                            )}
                                        </FormItem>
                                        <FormItem label='确认密码'>
                                            {getFieldDecorator("r_password2")(
                                                <Input type='password'></Input>
                                            )}
                                        </FormItem>
                                        <Button type='primary' htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        );
    }
}

export default Form.create()(NewsHeader);