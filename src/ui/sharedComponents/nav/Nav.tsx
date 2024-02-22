import * as React from 'react'
import { tabListItemIF } from 'suli-violin-website-types/src'

const computeNavLinkStyle = (currentTab: string, thisTab: string) => ({
  padding: '5px',
  border: 'solid black 1px',
  backgroundColor: currentTab === thisTab ? 'gainsboro' : 'azure',
  cursor: 'pointer'
})

interface navPropsIF {
  currentTab: string
  handleClickTab: React.Dispatch<React.SetStateAction<string>>
  tabsList: tabListItemIF[]
}

const Nav = ({ currentTab, handleClickTab, tabsList }: navPropsIF) => {
  
  return (
    <nav>
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        margin: 0
      }}>
        { 
          tabsList.map((tab: tabListItemIF, i) => 
            <li 
              key={tab.metaName + i}
              onClick={ () => handleClickTab(tab.metaName) } 
              style={computeNavLinkStyle(currentTab, tab.metaName)}
            >{tab.name}</li>
          )
        }
      </ul>
    </nav>    
  )
}

export default Nav