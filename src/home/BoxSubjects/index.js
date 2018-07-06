import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'

import BoxSubject from './BoxSubject'
import InfoContainer from '../InfoContainer'
import API from '../../config/API'
import './boxSubject.css'


const Blank = props => {
  return (
    <div className='blank'>{props.text}</div>
  )
}
export default class BoxSubjects extends Component{
  constructor(props){
    super(props)
    this.state = {
      subjects: [],
      title: '',
      date: '',
      loading: true
    }
  }

  componentDidMount () {
    this.getUsBox(resp => {
      if(resp.subjects.length)
      this.setState({
        subjects: resp.subjects,
        title: resp.title,
        date: resp.date,
        loading: false
      })
    })
  }

  getUsBox (callBack) {
    axios.jsonp(API.US_BOX).then(resp => {
      console.log(resp)
      callBack(resp)
    }).catch(err => {
      console.error(err)
    })
  }


  render () {
    let { subjects, title='豆瓣电影北美票房榜', date, loading } = this.state
    let content = null

    if (!subjects.length) {
      content = <Blank text='暂无'/>
    } else {
      content = <div>{subjects.map((subject, index) => <BoxSubject boxSubject={subject} key={index}/>)}</div>
    }
    return (
      <InfoContainer title={`${title}/${date}`}>
        {content}
      </InfoContainer>
    )
  }
}


