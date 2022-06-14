import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

const TouchView = ({ children, ...props }) => {
  return (
    <>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
      ) : (
        <TouchableHighlight {...props}>{children}</TouchableHighlight>
      )}
    </>
  );
};

export default TouchView;
