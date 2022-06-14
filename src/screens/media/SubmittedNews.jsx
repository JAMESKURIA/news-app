import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { NewsActionSheet, NewsCard } from "../../components";
import { ACTIONS, COLORS } from "../../resources";

const SubmittedNews = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "approved", value: "approved" },
    { label: "declined", value: "declined" },
    { label: "pending", value: "pending" },
    { label: "paid", value: "paid" },
  ]);
  const [activeCard, setActiveCard] = React.useState();

  const menuRef = React.useRef();

  const onCardPress = (id) => {
    setActiveCard(id);
    menuRef?.current?.open();
  };

  return (
    <View style={{ backgroundColor: COLORS.color_light_dark }}>
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
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <NewsCard
              type="media"
              key={p.toString()}
              onPress={() => onCardPress(p)}
              style={p === activeCard && tw`border-2 border-black`}
            />
          ))}
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
