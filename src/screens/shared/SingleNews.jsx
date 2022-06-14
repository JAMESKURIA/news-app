import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { NewsActionSheet, TopNav, TouchView } from "../../components";
import { COLORS, STATUS } from "../../resources";

const SingleNews = ({ navigation, route }) => {
  const { newsId, media } = route.params;
  console.log(route.params);
  const menuRef = React.useRef();

  const selectOption = () => {
    menuRef?.current?.open();
  };
  return (
    <View style={tw`flex-1`}>
      <ScrollView>
        <View style={tw`pt-14`}>
          <Image
            source={require("../../images/news1.jpg")}
            style={tw`h-56 w-full`}
          />

          <View style={tw`px-2 `}>
            {/* Status */}
            <View style={tw`flex-row justify-between items-center mt-3`}>
              <Text style={[tw`leading-6`, { color: COLORS.color_dark_light }]}>
                November 25, 2020
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
              {media && (
                <TouchView onPress={() => selectOption()}>
                  <Text style={tw`px-4 py-2 bg-gray-200 rounded-lg`}>
                    Options
                  </Text>
                </TouchView>
              )}
            </View>

            {/* Description  / Tagline */}
            <Text style={tw`text-sm leading-6 py-3`}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas quo
              dolore eveniet quod ducimus ex repudiandae repellat neque
              accusamus obcaecati.
            </Text>

            <Text style={tw`font-semibold py-3 text-lg`}>Files submitted:</Text>

            {/* Images */}
            <View>
              <Text style={tw`font-semibold`}>Images: </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`py-3`}
              >
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
              </ScrollView>
            </View>

            {/* Videos */}
            <View>
              <Text style={tw`font-semibold`}>Videos: </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`py-3`}
              >
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
                <Image
                  source={require("../../images/news1.jpg")}
                  style={tw`h-24 w-24 rounded mr-2`}
                />
              </ScrollView>
            </View>

            {/* Action sheet  */}
            <NewsActionSheet ref={menuRef} newsItem={newsId} newspage={true} />
          </View>
        </View>
      </ScrollView>
      {/* Navigation */}
      <View style={tw`absolute top-0 left-0 w-full`}>
        <TopNav
          pageName={"View News "}
          handleGoBack={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default SingleNews;
