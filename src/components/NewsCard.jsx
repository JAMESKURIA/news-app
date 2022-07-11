import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { COLORS } from "../resources";
import NewsStatus from "./NewsStatus";

const NewsCard = ({ type = "customer", onPress, style, data }) => {
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
          <NewsStatus status={status} />
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
