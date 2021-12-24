import { FormControl, makeStyles, OutlinedInputProps, TextField } from '@material-ui/core';
import React, { ChangeEventHandler, CSSProperties } from 'react';

const useInputStyles = makeStyles(theme => ({
  formControl: {
    "& fieldset": {
      borderRadius: 20,
    },
  }
}))

interface InputProps {
  title: string,
  id: string,
  value: string,
  placeholder?: string,
  onChange: ChangeEventHandler,
  type?: string,
  InputProps?: OutlinedInputProps,
  style?: CSSProperties,
  formControlStyle?: CSSProperties,
}

const Input: React.FC<InputProps> = ({
  title,
  id,
  value,
  placeholder = "",
  onChange,
  type = "text",
  InputProps,
  style = {},
  formControlStyle = {}
}) => {
  const styles = useInputStyles();

  return (
    <FormControl style={formControlStyle} className={styles.formControl}>
      <TextField
        style={style}
        id={id}
        label={title}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        variant="outlined"
        color="secondary"
        InputProps={InputProps}
      />
    </FormControl>
  )
}

export default Input;