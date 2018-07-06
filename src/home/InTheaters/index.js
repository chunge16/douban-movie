import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import { Icon, Toast } from 'antd-mobile'

import Theater from './Theater'
import InfoContainer from '../InfoContainer'
import API from '../../config/API'
import './inTheaters.css'

let timer = 0
export default class InTheaters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theaters: [],
      loadingMore: false,
      start: 0,
      total: 1,
      currentTotal: 0
    }
    this.getHotTheaters = this.getHotTheaters.bind(this)
    this.scrollLoadMore = this.scrollLoadMore.bind(this)
    this.renderLoadMore = this.renderLoadMore.bind(this)
  }

  componentDidMount() {
    this.getHotTheaters(0, 10, (resp) => {
      this.setState((prevState) => {
        return {
          theaters: prevState.theaters.concat(resp.subjects),
          total: resp.total,
          currentTotal: prevState.currentTotal + 10
        }
      })
    })
  }

  getHotTheaters(start = 0, count = 10, callback) {
    axios.jsonp(API.IN_THEATERS, {
      params: {
        start: start,
        count: count
      }
    }).then((response) => {
      console.log(response)
      callback(response)
    }).catch((error) => {
      console.error(error)
    })
  }

  scrollLoadMore(e) {
    let el = e.target
    let {total, currentTotal, loadingMore} = this.state
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      let isToButton = (el.scrollTop + el.clientHeight) === el.scrollHeight
      if (isToButton && !loadingMore && (currentTotal < total)) {
        this.setState({loadingMore: true}, () => {
          try {
            this.getHotTheaters(this.state.start + 1, 10, (resp) => {
              this.setState((prevState) => {
                return {
                  theaters: prevState.theaters.concat(resp.subjects),
                  start: prevState.start + 1,
                  currentTotal: prevState.currentTotal + 10
                }
              })
              this.setState({loadingMore: false})
            })
          } catch (e) {
            Toast.info('请求发生错误')
          }
        })
      }
    }, 100)
  }

  renderLoadMore() {
    let {total, currentTotal, loadingMore} = this.state
    let content = null

    if (currentTotal >= total) {
      content = <div>做人是有底线的</div>
    } else {
      content = loadingMore ? <Icon type='loading'/> : null
    }

    return (
      <div className='baseLine'>
        {content}
      </div>
    )
  }

  render() {
    let {theaters} = this.state
    // return (
    //   <div className='inTheatersWrap' onScroll={this.scrollLoadMore}>
    //     {theaters.map((theater, index) => <Theater theater={theater} key={index}/>)}
    //     {this.renderLoadMore()}
    //   </div>
    // )
    return (
      <InfoContainer title='影院热映' onscroll={this.scrollLoadMore}>
        {theaters.map((theater, index) => <Theater theater={theater} key={index}/>)}
        {this.renderLoadMore()}
      </InfoContainer>
    )
  }
}

