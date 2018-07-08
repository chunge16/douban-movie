import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './infoContainer.css'


export default class InfoContainer extends Component{
  render () {
    let { title='标题', children, className='', onscroll } = this.props

    return (
      <div className={`infoContainer ${className}`} >
        <header className='title'>{title}</header>
        <div className='children' onScroll={onscroll}>{children}</div>
      </div>
    )
  }
}

InfoContainer.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onscroll: PropTypes.func
}
