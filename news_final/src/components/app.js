import React, { Component } from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import '../componentCss/pc.css'
class App extends Component {
    state = {  }
    render() {
        return (
            <div>
                <NewsHeader></NewsHeader>
                {this.props.children}
                <NewsFooter></NewsFooter>
            </div>
        );
    }
}

export default App;