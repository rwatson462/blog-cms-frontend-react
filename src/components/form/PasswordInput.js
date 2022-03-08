export default function PasswordInput(props) {
   const {placeholder, value, onChange} = props
   return <input type="password" placeholder={placeholder} value={value} onChange={onChange} />
}