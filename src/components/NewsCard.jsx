import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { COLORS, STATUS } from "../resources";

const NewsCard = ({ type = "customer", onPress, style, data }) => {
  // console.log("News data: ", data);
  const { date, desc, image, status, title } = data;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`flex-row justify-between shadow p-3 rounded my-2`,
        { backgroundColor: COLORS.color_accent_dark },
        { ...style },
      ]}
    >
      <View style={tw`w-2/3 `}>
        <Text style={tw`leading-6 text-lg font-semibold`}>{title}</Text>
        <Text style={tw`leading-5 py-2`} numberOfLines={2}>
          {desc}
        </Text>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={[tw`leading-6`, { color: COLORS.color_dark_light }]}>
            {date}
          </Text>
          <View style={tw`flex-row items-center`}>
            <Icon
              type={STATUS.APPROVED.icon.type}
              name={STATUS.APPROVED.icon.name}
              color={STATUS.APPROVED.color}
              size={14}
              style={tw`mr-1`}
            />
            <Text
              style={[
                tw`text-sm font-semibold`,
                { color: STATUS.APPROVED.color },
              ]}
            >
              {STATUS.APPROVED.text}
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={{
          uri: image,
        }}
        style={tw`h-24 w-24 rounded`}
      />
    </TouchableOpacity>
  );
};

export default NewsCard;
