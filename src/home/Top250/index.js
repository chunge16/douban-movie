import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import { Icon, Toast } from 'antd-mobile'

import TopItem from './TopItem'
import InfoContainer from '../InfoContainer'
import API from '../../config/API'
import './top250.css'

let timer = 0
export default class Top250 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top250Movies: [],
      loadingMore: false,
      start: 0,
      total: 1,
      currentTotal: 0
    }
    this.getTop250movies = this.getTop250movies.bind(this)
    this.scrollLoadMore = this.scrollLoadMore.bind(this)
    this.renderLoadMore = this.renderLoadMore.bind(this)
  }

  componentDidMount() {
    this.getTop250movies(0, 10, (resp) => {
      this.setState((prevState) => {
        return {
          top250Movies: prevState.top250Movies.concat(resp.subjects),
          total: resp.total,
          currentTotal: prevState.currentTotal + 10
        }
      })
    })
  }

  getTop250movies(start = 0, count = 10, callback) {
    axios.jsonp(API.TOP_250, {
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
            this.getTop250movies(this.state.start + 1, 10, (resp) => {
              this.setState((prevState) => {
                return {
                  top250Movies: prevState.top250Movies.concat(resp.subjects),
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
    let { top250Movies } = this.state

    return (
      <InfoContainer title={`豆瓣 Top250`} onscroll={this.scrollLoadMore}>
        {top250Movies.map((topItem, index) => <TopItem topItem={topItem} key={index}/>)}
        {this.renderLoadMore()}
      </InfoContainer>
    )
  }
}

