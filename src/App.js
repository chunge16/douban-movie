import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'

import InTheaters from './home/InTheaters'
import Top250 from './home/Top250'
import BoxSubjects from './home/BoxSubjects'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'inTheaters',
      hidden: false,
      fullScreen: true
    }
  }

  renderContent (pageText) {
    let content = null
    if (pageText === 'inTheaters') {
      content = <InTheaters/>
    } else if (pageText === 'top250'){
      content = <Top250/>
    } else if (pageText === 'search') {
      content = <BoxSubjects/>
    }
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100%'}}>
        {content}
      </div>
    )
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="正在热映"
            key="InTheaters"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url("/assets/theaters.svg") center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url("assets/theatersActive.svg") center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'inTheaters'}
            onPress={() => {
              this.setState({
                selectedTab: 'inTheaters',
              });
            }}
          >
            {this.renderContent('inTheaters')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url("/assets/rank.svg") center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url("/assets/rankActive.svg") center center /  21px 21px no-repeat' }}
              />
            }
            title="Top250"
            key="top250"
            selected={this.state.selectedTab === 'top250'}
            onPress={() => {
              this.setState({
                selectedTab: 'top250',
              });
            }}
          >
            {this.renderContent('top250')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url("/assets/box.svg") center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url("/assets/boxActive.svg") center center /  21px 21px no-repeat' }}
              />
            }
            title="北美票房榜"
            key="search"
            selected={this.state.selectedTab === 'search'}
            onPress={() => {
              this.setState({
                selectedTab: 'search',
              });
            }}
          >
            {this.renderContent('search')}
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default App
