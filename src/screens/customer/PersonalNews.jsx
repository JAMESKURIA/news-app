import { gql, useLazyQuery } from "@apollo/client";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { Loading, NewsCard, TopNav } from "../../components";
import useCustomer from "../../hooks/useCustomer";
import useStations from "../../hooks/useStations";
import { COLORS } from "../../resources";

const FETCH_NEWS = gql`
  query fetchCustomerNews($customerId: Int!) {
    customer_news(where: { customer_news_customer_id: { _eq: $customerId } }) {
      customer_files {
        customer_file_attachment
        customer_file_type
      }
      customer_news_date_posted
      customer_news_desc
      customer_news_id
      media_station {
        media_station_id
        media_station_name
      }
      news_verifies {
        news_verify_status
      }
    }
  }
`;

const PersonalNews = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [news, setNews] = React.useState([]);

  const { customer_id: customerId } = useCustomer();

  const stations = useStations();

  // Set Stations
  React.useEffect(() => {
    setItems(stations);
  }, [stations]);

  // Get customer details
  React.useEffect(() => {
    if (customerId) {
      fetchNews({
        variables: {
          customerId,
        },
      });
    }
  }, [customerId]);

  const [
    fetchNews,
    { loading: newsLoading, error: newsError, data: newsData },
  ] = useLazyQuery(FETCH_NEWS);

  // News Data
  React.useEffect(() => {
    if (newsData) {
      setNews(newsData?.customer_news);
      // console.log("Personal news: ", news);
    }
  }, [newsData]);

  // Error states
  if (newsError) {
    console.log("Error fetching personal user news: ", newsError);
  }

  // Loading States
  if (newsLoading) {
    return <Loading message="Fetching news..." />;
  }

  return (
    <View style={[tw`flex-1`, { backgroundColor: COLORS.color_light_dark }]}>
      {/* Navigation */}
      <View style={tw` pt-4  w-full`}>
        <TopNav
          pageName={" My News "}
          handleGoBack={() => navigation.goBack()}
        />
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center p-2 w-full`}>
          <View style={tw`w-2/3`}>
            <DropDownPicker
              placeholder="Filter by media station..."
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderColor: COLORS.color_primary_dark,
                // backgroundColor: COLORS.color_primary_dark,  fc
                // width: "50%",
              }}
              // dropDownContainerStyle={{ width: "50%" }}
            />
          </View>

          <TouchableOpacity
            style={[
              tw` flex-row items-center rounded-xl ml-3 p-3 px-6 `,
              {
                backgroundColor: COLORS.color_dark_light,
              },
            ]}
          >
            <Icon
              type="Ionicons"
              name="filter"
              size={20}
              color={COLORS.color_dark_dark}
            />

            <Text
              style={[
                tw`ml-3 text-lg`,
                {
                  color: COLORS.color_accent_dark,
                },
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`p-2 pb-20`}>
            {/* News Cards */}
            {news.map((n) => {
              const data = {
                title: n.media_station.media_station_name,
                desc: n.customer_news_desc,
                date: n.customer_news_date_posted,
                status: n.news_verifies[0]?.news_verify_status,
                image: n.customer_files[0].customer_file_attachment,
              };

              // console.log("\n\nNews One: ", n);

              return (
                <NewsCard
                  data={data}
                  key={n.customer_news_id.toString()}
                  onPress={() =>
                    navigation.navigate("SingleNews", {
                      newsId: n.customer_news_id,
                    })
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PersonalNews;
