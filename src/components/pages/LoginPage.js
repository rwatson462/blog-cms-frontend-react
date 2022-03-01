import React from 'react'
import { doLogin } from '../../functions/Authentication'

export default class LoginPage extends React.Component {
   state = {
      username: '',
      password: '',
      showFailedMessage: false
   }

   handleChange = event => {
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   doLogin = () => {
      const _this = this
      doLogin(_this.state.username, _this.state.password, function(success) {
         if(success) {
            _this.setState({'showFailedMessage': false})
            _this.props.doLogin(true)
         } else {
            _this.setState({'showFailedMessage': true})
         }
      })
   }

   render(props) {
      const {username,password,showFailedMessage} = this.state

      return (
         <main>
            <section>
               <h2>Log in</h2>
            </section>

            <form>
               { showFailedMessage && <p className="text-danger">Login failed, motherfucker</p> }
               <fieldset>
                  <legend><label htmlFor="username">Username</label></legend>
                  <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
               </fieldset>
               <fieldset>
                  <legend><label htmlFor="password">Password</label></legend>
                  <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
               </fieldset>
               <button type="button" onClick={this.doLogin}>Log in</button>
            </form>
         </main>
      )
   }
}
