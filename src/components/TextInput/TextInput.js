import styles from './TextInput.module.scss'

const TextInput = ({type, placeholder, id, value, classes, handleChange }) => {

  return (
    <div className={classes ? classes : styles.container}>
      <input 
        type={type} 
        placeholder={placeholder} 
        id={id} 
        value={value} 
        className={styles.input}
        onChange={(e)=>handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextInput
