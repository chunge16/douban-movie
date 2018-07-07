import React, { Component } from 'react'

import IconStar from './star.svg'
import IconStarActive from './star-active.svg'
import IconStarHalf from './star-active-half.svg'
import './top250item.css'

export default class TopItem extends Component{
  renderStars (star = 0) {
    let content = []
    star = parseFloat(star)
    let stars = star / 10
    switch (stars){
      case 1:
        content = [IconStarActive, IconStar, IconStar, IconStar, IconStar]
        break
      case 2:
        content = [IconStarActive, IconStarActive, IconStar, IconStar, IconStar]
        break
      case 3:
        content = [IconStarActive, IconStarActive, IconStar, IconStar, IconStar]
        break
      case 4:
        content = [IconStarActive, IconStarActive, IconStar, IconStar, IconStar]
        break
      case 4.5:
        content = [IconStarActive, IconStarActive, IconStarActive, IconStarActive, IconStarHalf]
        break
      case 5:
        content = [IconStarActive, IconStarActive, IconStarActive, IconStarActive, IconStarActive]
        break
      default:
        content = []
        break
    }
    return (
      content.length
        ? <div className='starWrap'>{content.map((item, index) => <img className='star' src={item} key={index}/>)}</div>
        : <span>暂无评分</span>
    )
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
    } = this.props.topItem
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
      <a className='top250ItemWrap' href={alt} target='_blank'>
        <img src={images.medium}></img>
        <div className='main'>
          <span className='name'>{`${title} (${year})`}</span>
          <div className='ratingWrap'>
            {this.renderStars(rating.stars)}
            <span className='rating'>{rating.average}分</span>
          </div>
          <div className='collectCount'>{collect_count}收藏</div>
          <div>类型：<span className='genres'>{genres}</span></div>
          <div>导演：<span className='directors'>{director}</span></div>
          <div>主演：<span className='casts'>{cat}</span></div>
        </div>
      </a>
    )
  }
}
