export default function TextInput(props) {
   const {placeholder, value, onChange} = props
   return <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
}