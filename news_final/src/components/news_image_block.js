import React, { Component,PropTypes } from 'react';
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
class NewsImageBlock extends Component {
    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
        imageWidth:PropTypes.string.isRequired,
        cardWidth:PropTypes.string.isRequired,
        cardTitle:PropTypes.string.isRequired
    }
    state = { 
        result:null
     }
     componentDidMount(){
         let {type,count} = this.props
         let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
         axios.get(url)
            .then(response=>{
                let result = response.data.map(({title,thumbnail_pic_s,author_name,uniquekey})=>({title,thumbnail_pic_s,author_name,uniquekey}))
                this.setState({result})
            })
     }
    render() {
        let {imageWidth,cardWidth,cardTitle,type} = this.props
        let {result} = this.state
        let TitleStyle = {
            overflow:"hidden",
            textOverflow:"ellipsis",
            whiteSpace:"nowrap",
            width:imageWidth
        }
        const imageStyle = {
            width: imageWidth,
            height: "90px",
            display: 'block'
          }
        let imageBlock = result
            ?(
                result.map((item,index)=>(
                    <div key={index} className='imageblock'>
                        <Link to={`/news_detail/${item.uniquekey}/${type}`}>
                            <div>
                                <img src={item.thumbnail_pic_s} style={imageStyle}/>  
                            </div>
                            <div className="custom-card">
                                <h3 style={TitleStyle}>{item.title}</h3>
                                <p>{item.author_name}</p>
                            </div>  
                        </Link>
                    </div>
                ))
            )
            :<h2>没有新闻</h2>
        return (
            <Card title={cardTitle} style={{width:cardWidth}} className='topNewsList'>
                {imageBlock}
            </Card>
        );
    }
}

export default NewsImageBlock;