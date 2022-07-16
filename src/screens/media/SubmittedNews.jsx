import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { Loading, NewsActionSheet, NewsCard } from "../../components";
import useAdmin from "../../hooks/useAdmin";
import { ACTIONS, COLORS } from "../../resources";

const FETCH_NEWS = gql`
  query getNews($adminId: Int) {
    customer_news(
      where: {
        media_station: { media_station_media_admin_id: { _eq: $adminId } }
      }
    ) {
      customer {
        customer_id
        customer_name
      }
      customer_files {
        customer_file_id
        customer_file_attachment
        customer_file_type
      }
      customer_news_id
      customer_news_desc
      customer_news_date_posted
      news_verifies {
        news_verify_id
        news_verify_status
      }
    }
  }
`;

const SubmittedNews = ({ navigation }) => {
  const [news, setNews] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "approved", value: "approved" },
    { label: "declined", value: "declined" },
    { label: "pending", value: "pending" },
    { label: "paid", value: "paid" },
  ]);

  const [activeCard, setActiveCard] = React.useState();

  const { media_admin_id: adminId } = useAdmin();

  // console.log("Admin ID: ", adminId);
  const { loading, error, data } = useQuery(FETCH_NEWS, {
    variables: { adminId },
    fetchPolicy: "network-only",
  });

  // React.useEffect(() => {
  //   if (adminId) {
  //     fetchNews();
  //   }
  // }, [adminId]);

  React.useEffect(() => {
    if (data) {
      setNews(data.customer_news);
    }
  }, [data]);

  const menuRef = React.useRef();

  const onCardPress = (id) => {
    setActiveCard(id);
    menuRef?.current?.open();
  };

  // Error states
  if (error) {
    console.log("Error fetching station news: ", error);
  }

  // Loading States
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[tw`flex-1`, { backgroundColor: COLORS.color_light_dark }]}>
      <View style={tw`flex-row items-center p-2 pt-6 w-full`}>
        <View style={tw`w-2/3`}>
          <DropDownPicker
            placeholder="Filter by..."
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // searchable={true}
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

      {/* News Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`p-2 pb-20`}>
          {news.map((n) => {
            const _data = {
              title: n.customer.customer_name,
              date: n.customer_news_date_posted,
              desc: n.customer_news_desc,
              image: n.customer_files[0].customer_file_attachment,
              status: n?.news_verifies[0]?.news_verify_status,
            };

            return (
              <NewsCard
                type="media"
                key={n.customer_news_id.toString()}
                data={_data}
                onPress={() => onCardPress(n.customer_news_id)}
                style={
                  n.customer_news_id === activeCard && tw`border-2 border-black`
                }
              />
            );
          })}
        </View>
      </ScrollView>

      <NewsActionSheet
        ref={menuRef}
        newsItem={activeCard}
        cb={(type = undefined) => {
          switch (type) {
            case ACTIONS.view:
              navigation.navigate("SingleNews", {
                newsId: activeCard,
                media: true,
              });
              setActiveCard();
              break;

            default:
              setActiveCard();
              break;
          }
        }}
      />
    </View>
  );
};

export default SubmittedNews;
