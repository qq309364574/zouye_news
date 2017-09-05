import React, { Component } from 'react';
import {Row,Col,Tabs,Card} from 'antd'
import axios from 'axios'
let TabsPane = Tabs.TabPane
class UserCenter extends Component {
    state = { 
        collect:[],
        comment:[]
     }
     componentDidMount(){
         let userid = localStorage.getItem("userId")
         let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userid}`
         axios.get(url)
            .then(response=>{
                let collect = response.data
                this.setState({collect})
            })
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userid}`
        axios.get(url)
            .then(response=>{
                let comment = response.data
                this.setState({comment})
            })
     }
    render() {
        let {collect,comment} = this.state
        let collectList = !collect
            ?<h2>你还没有收藏</h2>
            :collect.map((item,index)=>(
                <Card key={index} title={item.uniquekey} extra={<a href={`/#/news_detail/${item.uniquekey}`}>查看</a>}>
                    <p>{item.Title}</p>
                </Card>
            ))
        let commentList = !comment
        ?<h2>你还没有评论</h2>
        :comment.map((item,index)=>(
            <Card key={index} title={`于${item.datetime}评论${item.uniquekey}`} extra={<a href={`/#/news_detail/${item.uniquekey}`}>查看</a>}>
                <p>{item.Comments}</p>
            </Card>
        ))
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs className="ant-tabs-line">
                        <TabsPane key={1} tab='我的收藏列表'>
                            {collectList}
                        </TabsPane>
                        <TabsPane key={2} tab='我的评论列表'>
                            {commentList}
                        </TabsPane>
                        <TabsPane key={3} tab='我的头像设置'></TabsPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }
}

export default UserCenter;