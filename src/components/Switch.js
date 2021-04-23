import * as React from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';

export const Switch = ({onValueChange, isOn}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(isOn);

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <PaperSwitch
      value={isSwitchOn}
      onValueChange={() => {
        toggleSwitch();
        onValueChange && onValueChange();
      }}
    />
  );
};
