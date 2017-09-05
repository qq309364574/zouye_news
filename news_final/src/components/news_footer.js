import React, { Component } from 'react';
import {Row,Col} from 'antd'
class NewsFooter extends Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22} style={{textAlign:'center',padding:'20px'}}>
                        邹野制作
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </footer>
        );
    }
}

export default NewsFooter;