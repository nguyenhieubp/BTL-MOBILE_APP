import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";

const SimpleMenu = () => {
  return (
    <MenuProvider>
      <Menu>
      <MenuTrigger
       />
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};

export default SimpleMenu;
