import { Text, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { STATUS } from "../resources";

const NewsStatus = ({ status }) => {
  //   console.log("News Status: ", status);

  const getStatus = (_status) => {
    switch (_status) {
      case "pending":
        return {
          ...STATUS.PENDING,
        };
      case "verified":
        return {
          ...STATUS.APPROVED,
        };
      case "rejected":
        return {
          ...STATUS.DECLINED,
        };
      case "paid":
        return {
          ...STATUS.PAID,
        };
    }
  };

  return (
    <View style={tw`flex-row items-center`}>
      <Icon
        type={getStatus(status)?.icon.type}
        name={getStatus(status)?.icon.name}
        color={getStatus(status)?.color}
        size={14}
        style={tw`mr-1`}
      />
      <Text
        style={[tw`text-sm font-semibold`, { color: getStatus(status)?.color }]}
      >
        {getStatus(status)?.text}
      </Text>
    </View>
  );
};

export default NewsStatus;
