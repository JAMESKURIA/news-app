import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-dynamic-vector-icons";
import tw from "tailwind-react-native-classnames";
import { NewsCard } from "../../components";
import { COLORS } from "../../resources";

const PersonalNews = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "Citizen TV", value: "citizen" },
    { label: "NTV", value: "ntv" },
    { label: "K24 TV", value: "k24" },
    { label: "INOORO TV", value: "inooro" },
  ]);
  return (
    <View style={{ backgroundColor: COLORS.color_light_dark }}>
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
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <NewsCard
              key={p.toString()}
              onPress={() => navigation.navigate("SingleNews", { newsId: p })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalNews;
