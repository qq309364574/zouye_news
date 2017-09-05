import React, { Component } from 'react';
import {Row,Col,BackTop} from 'antd'
import axios from 'axios'
import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'
class NewsDetail extends Component {
    state = { 
        news:{}
     }
     componentWillReceiveProps(newProps){
        this.getnews(newProps)
     }
     componentDidMount(){
        this.getnews(this.props)
    }
    getnews = (props) => {
        let {uniquekey} = props.params
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                let news = response.data
                this.setState({news})
                document.title = news.title
            })
        
    }
    render() {
        let {pagecontent} = this.state.news
        let {type,uniquekey} = this.props.params
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className='container'>
                        <div dangerouslySetInnerHTML={{__html: pagecontent}}></div>
                        <NewsComments uniquekey={uniquekey}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type={type} cardTitle='相关新闻'
                            count={40} cardWidth='100%'
                            imageWidth='150px'></NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        );
    }
}

export default NewsDetail;