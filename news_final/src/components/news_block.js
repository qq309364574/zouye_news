import React, { Component,PropTypes } from 'react';
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'
class NewsBlock extends Component {
    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }
    state = { 
        newsBlock:null
     }
    componentDidMount(){
        let {type,count} = this.props
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                let newsBlock = response.data.map(({title,uniquekey})=>({title,uniquekey}))
                this.setState({newsBlock})
            })
    }
    render() {
        let {newsBlock} = this.state
        let {type} = this.props
        let NewsBlock = newsBlock
            ?newsBlock.map((item,index)=>(
                <li key={index}>
                    <Link to={`/news_detail/${item.uniquekey}/${type}`}>{item.title}</Link>
                </li>
            ))
            :<h2>没有新闻</h2>
        return (
            <Card className='topNewsList'>
                <ul>
                    {NewsBlock}
                </ul>
            </Card>
        );
    }
}

export default NewsBlock;