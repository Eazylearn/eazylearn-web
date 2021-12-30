import { MenuItem, Select, Button } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { addAlert } from '../reducers/alert';


interface ConnectedTestProps {

}

interface TestStateProps {

}

interface TestDispatchProps {
  addAlert: (type: "success" | "error", message: string) => void,
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
    </div>
  )
}

const ConnectedTest: React.FC<ConnectedTestProps> = connect(null, { addAlert })(Test);

export default ConnectedTest;