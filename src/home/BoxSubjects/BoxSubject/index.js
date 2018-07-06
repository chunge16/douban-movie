import React, { Component } from 'react'
import './boxSubject.css'

import IconStar from './star.svg'
import IconStarActive from './star-active.svg'
import IconStarHalf from './star-active-half.svg'

export default class BoxSubject extends Component{
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
        content = [IconStarActive, IconStarActive, IconStarActive, IconStarActive, IconStar]
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
        : <span>评论不足</span>
    )
  }

  toThousands(num) {
    num = (num || 0).toString()
    let result = ''
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result
      num = num.slice(0, num.length - 3)
    }
    if (num) { result = num + result }
    return result
  }

  render () {
    let {
      images,
      title,
      rating,
      directors,
      genres,
      casts,
      alt
    } = this.props.boxSubject.subject

    let { box, rank } = this.props.boxSubject
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
      <a className='boxSubjectWrap' href={alt} target='_blank'>
        <div className='rank'>{`No.${rank}`}</div>
        <img src={images.medium}/>
        <div className='main'>
          <span className='name'>{`${title}`}</span>
          <div>北美总票房：<span className='box'>{`$${this.toThousands(box)}`}</span></div>
          <div className='ratingWrap'>
            {this.renderStars(rating.stars)}
            {!!rating.average && <span className='rating'>{rating.average}分</span>}
          </div>
          <div>类型：<span className='genres'>{genres}</span></div>
          <div>导演：<span className='directors'>{director}</span></div>
          <div>主演：<span className='casts'>{cat}</span></div>
        </div>
      </a>
    )
  }


}
