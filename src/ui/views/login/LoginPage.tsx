import * as React from 'react'
const { useState } = React

interface loginPagePropsIF {
  onSubmitHandler: React.Dispatch<React.SetStateAction<any>>
}

const LoginPage = ({ onSubmitHandler }: loginPagePropsIF) => {

  const [ loginCreds, setLoginCreds ] = useState({
    username: '',
    password: ''
  })

  return (
    <div style={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      fontFamily: 'arial',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 20
        }}>
          <div>
            <span style={{ color: 'gray' }}>SULIMANTEKALLI</span>
            <span style={{ color: '#2E5A88' }}>VIOLIN</span>.com
          </div>
          <div style={{
            paddingTop: 5
          }}>
            CMS
          </div>
        </div>
        <div style={{
          border: '1px solid black',
          width: 300,
          height: 300,
          textAlign: 'center'
        }}>
          <div style={{ padding: 20 }}>Login</div>
          <form 
            onSubmit={ onSubmitHandler }
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}  
          >
            <div style={{ marginBottom: 20 }}>
              <label style={{ padding: 20 }}>
                Username:
                <input style={{ marginLeft: 5 }} onChange={(e) => { setLoginCreds((pS: any) => ({ ...pS, username: e.target.value }))}}/>
              </label>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ padding: 20 }}>
                Password:
                <input style={{ marginLeft: 5 }} onChange={(e) => { setLoginCreds((pS: any) => ({ ...pS, password: e.target.value }))}}/>
              </label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <input style={{ width: 100 }} type="submit"/>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage