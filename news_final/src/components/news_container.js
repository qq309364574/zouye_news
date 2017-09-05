import React, { Component } from 'react';
import {Row,Col,Carousel,Tabs} from 'antd'
import logo1 from '../images/carousel_1.jpg'
import logo2 from '../images/carousel_2.jpg'
import logo3 from '../images/carousel_3.jpg'
import logo4 from '../images/carousel_4.jpg'
import NewsBlock from './news_block'
import NewsImageBlock from './news_image_block'
import NewsProduct from './news_product'
const TabPane = Tabs.TabPane;
class NewsContainer extends Component {
    state = {  }
    render() {
        return (
            <Row className='container'>
                <Col span={1}></Col>
                <Col span={22}>
                    <div className='leftContainer' style={{width:'35%'}}>
                        <Carousel autoplay >
                            <div><img src={logo1} /></div>
                            <div><img src={logo2} /></div>
                            <div><img src={logo3} /></div>
                            <div><img src={logo4} /></div>
                        </Carousel>
                        <NewsImageBlock type='guoji' cardTitle='国际新闻'
                        count={6} cardWidth='400px'
                        imageWidth='112px'></NewsImageBlock>
                    </div>
                    <Tabs className='tabs_news' style={{width:'35%'}}>
                        <TabPane tab="头条新闻" key="1">
                            <NewsBlock type='top' count={21}/>
                        </TabPane>
                        <TabPane tab="国际新闻" key="2">
                            <NewsBlock type='guoji' count={21}/>
                        </TabPane>
                    </Tabs>
                    <Tabs  style={{width:'30%'}}>
                        <TabPane key='1' tab="React News产品">
                            <NewsProduct></NewsProduct>
                        </TabPane>
                    </Tabs>
                    <div  style={{width:'100%'}}>
                        <NewsImageBlock type='yule' cardTitle='娱乐新闻'
                            count={8} cardWidth='100%'
                            imageWidth='132px'></NewsImageBlock>
                        <NewsImageBlock type='guonei' cardTitle='国内新闻'
                            count={16} cardWidth='100%'
                            imageWidth='132px'></NewsImageBlock>
                    </div>
                </Col>
                <Col span={1}></Col>
            </Row>
        );
    }
}

export default NewsContainer;