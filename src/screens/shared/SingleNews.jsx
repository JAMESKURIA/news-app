import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";

import { Loading, NewsActionSheet, TopNav, TouchView } from "../../components";
import NewsStatus from "../../components/NewsStatus";
import { COLORS } from "../../resources";

const FETCH_NEWS = gql`
  query getSingleNews($newsId: Int!) {
    customer_news(where: { customer_news_id: { _eq: $newsId } }) {
      customer_files {
        customer_file_attachment
        customer_file_type
        customer_file_id
      }
      customer_news_date_posted
      customer_news_desc
      customer_news_id
      news_verifies {
        news_verify_status
      }
    }
  }
`;

const SingleNews = ({ navigation, route }) => {
  const { newsId, media } = route.params;

  const menuRef = React.useRef();

  const selectOption = () => {
    menuRef?.current?.open();
  };

  // Fetch News
  const { loading, error, data } = useQuery(FETCH_NEWS, {
    variables: {
      newsId,
    },
    fetchPolicy: "network-only",
  });

  let newsItem;

  // Loading States
  if (loading) {
    return <Loading message="Fetching news details..." />;
  }

  // Error states
  if (error) {
    console.log("Error fetching personal user news: ", newsError);
  }

  if (data) {
    newsItem = data?.customer_news[0];
  }
  // console.log("News Item: ", newsItem);

  const displayImage = newsItem?.customer_files[0].customer_file_attachment
    ? newsItem?.customer_files[0].customer_file_attachment
    : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1657386247~exp=1657386847~hmac=5c4dd553e91fea7c928e43797134dc1a5fae7824532b515d096bc859b29e0ddd";

  const images = newsItem?.customer_files?.filter(
    (file) => file.customer_file_type.toLowerCase() === "image"
  );
  const videos = newsItem?.customer_files?.filter(
    (file) => file.customer_file_type.toLowerCase() === "video"
  );

  return (
    <View style={[tw`flex-1`, { backgroundColor: COLORS.color_accent_dark }]}>
      {/* Navigation */}
      <View
        style={[
          tw` w-full pt-4 pb-2`,
          { backgroundColor: COLORS.color_light_dark },
        ]}
      >
        <TopNav
          pageName={"View News "}
          handleGoBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: displayImage,
            }}
            style={tw`h-56 w-full`}
          />

          <View
            style={[
              tw`px-2 flex-1`,
              { backgroundColor: COLORS.color_accent_dark },
            ]}
          >
            {/* Status */}
            <View style={tw`flex-row justify-between items-center mt-3`}>
              <Text style={[tw`leading-6`, { color: COLORS.color_dark_light }]}>
                {newsItem?.customer_news_date_posted}
              </Text>

              <NewsStatus
                status={newsItem?.news_verifies[0]?.news_verify_status}
              />
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
              {newsItem?.customer_news_desc}
            </Text>

            <Text style={tw`font-semibold py-3 text-lg`}>Files submitted:</Text>

            {/* Images */}
            {images.length > 0 && (
              <View>
                <Text style={tw`font-semibold`}>Images: </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={tw`py-3`}
                >
                  {images?.length > 0 ? (
                    images?.map((image) => (
                      <Image
                        key={image.customer_file_id}
                        source={{
                          uri: image.customer_file_attachment,
                        }}
                        style={tw`h-24 w-24 rounded mr-2`}
                      />
                    ))
                  ) : (
                    <Text>No images</Text>
                  )}
                </ScrollView>
              </View>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <View>
                <Text style={tw`font-semibold`}>Videos: </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={tw`py-3`}
                >
                  {videos?.map((video) => (
                    <View key={video.customer_file_id} style={tw`mr-2`}>
                      <Image
                        source={{
                          uri: video.customer_file_attachment,
                        }}
                        style={tw`h-24 w-24 rounded mr-2`}
                      />
                      <View
                        style={tw`absolute rounded bg-black bg-opacity-70 top-0 left-0 w-full h-full items-center justify-center`}
                      >
                        <Icon
                          name="play-circle"
                          type="FontAwesome"
                          size={26}
                          color={"dodgerblue"}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Action sheet  */}
            <NewsActionSheet ref={menuRef} newsItem={newsId} newspage={true} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleNews;
