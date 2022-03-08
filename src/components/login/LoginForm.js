import PasswordInput from "../form/PasswordInput"
import TextInput from "../form/TextInput"

export default function LoginForm(props) {
   const {onLogin} = props
   let username = '',password = ''

   return (
      <form className="login-form">
         <fieldset>
            <legend><label htmlFor="username">Username</label></legend>
            <TextInput onChange={e => username = e.target.value} />
         </fieldset>
         <fieldset>
            <legend><label htmlFor="password">Password</label></legend>
            <PasswordInput onChange={e => password = e.target.value} />
         </fieldset>
         <button type="button" onClick={() => onLogin(username,password)}>Log in</button>
      </form>
   )

}