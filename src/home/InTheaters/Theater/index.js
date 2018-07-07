import React, { Component } from 'react'

import './theater.css'

export default class Theater extends Component{
  constructor(props){
    super(props)
  }

  render () {
    let {
      alt,
      images,
      title,
      year,
      rating,
      collect_count,
      directors,
      genres,
      casts
    } = this.props.theater
    let director = ''
    let cat = ''

    genres = genres.join('/')
    directors.forEach((item) => {
      director += item.name
    })

    casts.forEach((item) => {
      cat += `${item.name} / `
    })

    return (
      <a className='theaterWrap' href={alt} target='_blank'>
        <img src={images.medium}></img>
        <div className='main'>
          <span className='name'>{`${title} (${year})`}</span>
          <div>
            <span className='rating'>{rating.average}分</span>
            <span className='collectCount'>{collect_count}收藏</span>
          </div>
          <div>类型：<span className='genres'>{genres}</span></div>
          <div>导演：<span className='directors'>{director}</span></div>
          <div>主演：<span className='casts'>{cat}</span></div>
        </div>
      </a>
    )
  }
}
