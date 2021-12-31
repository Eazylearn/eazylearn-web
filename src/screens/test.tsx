import { MenuItem, Select, Button } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { addAlert } from '../reducers/alert';


interface ConnectedTestProps {

}

interface TestStateProps {

}

interface TestDispatchProps {
  addAlert: typeof addAlert,
}

interface TestProps extends ConnectedTestProps, TestDispatchProps, TestStateProps {}

const Test: React.FC<TestProps> = ({
  addAlert,
}) => {

  const [type, setType] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");

  const handleAddAlert = () => {
    addAlert(type, message);
  }

  const handleSetType = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value !== "success" && value !== "error")
      return;

    setType(value);
  }

  const handleChangeMessage = (e: ChangeEvent) => {
    setMessage((e.target as HTMLInputElement).value);
  }

  const handleUpload: FormEventHandler = (e: FormEvent) => {
    // sth sth
  }

  return (
    <div>
      <Select
        title="Semester"
        id="semester"
        value={type}
        onChange={handleSetType}
        variant="outlined"
      >
        <MenuItem value="success">Success</MenuItem>
        <MenuItem value="error">Error</MenuItem>
      </Select>
      <Input
        style={{ width: 150 }}
        title="message"
        id="message"
        value={message}
        onChange={handleChangeMessage}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddAlert}
      >
        Add!
      </Button>
      <Button variant="contained" color="secondary" component="label">
        Upload
        <input
          type="file"
          onInput={handleUpload}
          hidden
        />
      </Button>
    </div>
  )
}

const ConnectedTest: React.FC<ConnectedTestProps> = connect(null, { addAlert })(Test);

export default ConnectedTest;