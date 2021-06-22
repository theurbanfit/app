import * as React from 'react';
import {Switch as PaperSwitch, useTheme} from 'react-native-paper';

export const Switch = ({onValueChange, isOn}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(isOn);
  const {colors} = useTheme();
  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <PaperSwitch
      color={colors.primaryDark}
      value={isSwitchOn}
      onValueChange={() => {
        toggleSwitch();
        onValueChange && onValueChange();
      }}
    />
  );
};
