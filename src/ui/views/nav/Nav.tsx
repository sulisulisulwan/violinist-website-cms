import * as React from 'react'
import { tabListItemIF } from 'suli-violin-website-types/src'
import { GlobalAppStateManagement } from '../../../Cms'
const { useContext } = React


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

  const { windowWidth } = useContext(GlobalAppStateManagement)
  const navBarIsHamburger = windowWidth < 570
  
  return (
    <nav style={{ width: '100%'}}>
      {
        navBarIsHamburger ? 
        <HamburgerNavVar
          tabsList={tabsList} 
          currentTab={currentTab} 
          handleClickTab={handleClickTab}
        />
        :
        <LargeNavBar 
          tabsList={tabsList} 
          currentTab={currentTab} 
          handleClickTab={handleClickTab}
        />
      }
    </nav>    
  )
}

const HamburgerNavVar = ({ tabsList, currentTab, handleClickTab }: any) => {

  const [ hamburgerIsOpen, setHamburgerIsOpen ] = React.useState(false)

  const [ hoverIndex, setHoverIndex ] = React.useState(null)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }}>
      <div id="menuToggle"
        onClick={(e: any) => {

          if (e.target.classList[0] === 'li-tab') {
            handleClickTab(e.target.dataset.tabname.toLowerCase())
          }
          setHamburgerIsOpen(!hamburgerIsOpen)
        }}
      >
        <div 
          className='hamburger'
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {
            [1, 2, 3].map((child) => {
              return <span key={`hamburger-span-${child}`} style={{
                display: 'block',
                width: 33,
                height: 4,
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 20,
                position: 'relative',
                borderRadius: 3,
                zIndex: 1,
                transformOrigin: 
                  child === 1 ? '0% 0%' : 
                  child === 3 ? '0% 100%' : 
                  '4px 0px',
                // background: hamburgerIsOpen ? '#232323' : '#cdcdcd',
                background: '#232323',
                transform: hamburgerIsOpen ? (
                  child === 1 ? 'rotate(45deg) translate(-3px, -2px)' :
                  child === 2 ? 'rotate(0deg) scale(0.2, 0.2)' : 
                  'rotate(-45deg) translate(0, -1px)'
                ) 
                : '',
                // : 
                transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease',
                opacity: hamburgerIsOpen ? (child === 2 ? 0 : 1) : 1,
              }}></span>
            })
          }
        </div>
        <ul 
          id="menu"
          style={{
            position: 'absolute',
            width: 300,
            margin: '-100px 0 0 -50px',
            padding: 50,
            paddingTop: 125,
            background: '#ededed',
            listStyleType: 'none',
            WebkitFontSmoothing: 'antialiased',
            zIndex: 0,
            /* to stop flickering of text in safari */
            transformOrigin: '0% 0%',
            transform: hamburgerIsOpen ? 'none' : 'translate(-100%, 0)',
            transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0)'
          } as React.CSSProperties}
        >
          { 
            tabsList.map((tab: tabListItemIF, i: number) => 
              <li 
                onMouseOver={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`li-tab tab-${tab.metaName}`}
                key={tab.metaName + i}
                data-tabname={tab.name}
                style={{
                  backgroundColor: hoverIndex === i ? 'lightgray' : 'rgb(237, 237, 237)',
                  padding: '10px 0',
                  marginLeft: 50,
                  fontSize: 22,
                  cursor: 'pointer'
                }}
              >{tab.name}</li>
            )
          }
        </ul>
      </div>
      <div style={{
        textTransform: 'uppercase',
        fontSize: 25,
        marginTop: 20,
        paddingRight: 30,
        paddingBottom: 5
      }}>
        {currentTab}
      </div>

    </div>
  )
}

const LargeNavBar = ({ tabsList, currentTab, handleClickTab }: any) => {
  return (
    <ul 
      style={{
        listStyleType: 'none',
        display: 'flex',
        margin: 0
      }}>
        { 
          tabsList.map((tab: tabListItemIF, i: number) => 
            <li 
              key={tab.metaName + i}
              onClick={ () => handleClickTab(tab.metaName) } 
              style={computeNavLinkStyle(currentTab, tab.metaName)}
            >{tab.name}</li>
          )
        }
      </ul>
  )
}

export default Nav