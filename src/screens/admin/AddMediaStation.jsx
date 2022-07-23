import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { Button, Loading } from "../../components";
import { COLORS } from "../../resources";

const { width } = Dimensions.get("screen");

const CREATE_MEDIA_STATION = gql`
  mutation insertStation(
    $country: String
    $email: String
    $adminId: Int
    $name: String
    $phone: String
  ) {
    insert_media_station_one(
      object: {
        media_station_country: $country
        media_station_email: $email
        media_station_media_admin_id: $adminId
        media_station_name: $name
        media_station_phonenumber: $phone
      }
    ) {
      media_station_id
    }
  }
`;

const GET_ADMINS = gql`
  query getAdmins {
    media_admin(where: { login: { login_rank: { _eq: "media" } } }) {
      media_admin_id
      media_admin_name
      media_admin_email
    }
  }
`;

const AddMediaStation = () => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [adminId, setAdminId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [createStation, { loading: stationLoading, error: stationError }] =
    useMutation(CREATE_MEDIA_STATION);

  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
  } = useQuery(GET_ADMINS);

  React.useEffect(() => {
    if (adminData) {
      console.log("Admin data: ", adminData);

      setItems(
        adminData.media_admin.map((admin) => ({
          label: `${admin.media_admin_name} --- (${admin.media_admin_email})`,
          value: admin.media_admin_id,
        }))
      );
    }
  }, [adminData]);

  const addStation = async () => {
    if (!adminId || !name || !email || !country || !phone) {
      Alert.alert("Caution!", "Please fill in all the fields");
      return;
    }

    const { data: stationData } = await createStation({
      variables: {
        country,
        email,
        adminId,
        name,
        phone,
      },
    });

    if (stationData) {
      // console.log("Added station: ", stationData);
      Alert.alert("Success!", "Successfully added station");

      setCountry(null);
      setEmail(null);
      setAdminId(null);
      setName(null);
      setPhone(null);
    }
  };

  if (stationError) {
    console.log("Hasura Error: ", stationError);
  }

  if (adminError) {
    console.log("Hasura Error: ", adminError);
  }

  // Show loader
  if (loading || stationLoading || adminLoading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`flex-1 p-4`}>
        <View style={tw`pt-4 pb-5`}>
          <Text style={tw`text-center text-xl`}>Add A Media Station</Text>
        </View>
        {/* Station Name */}
        <TextField
          label="Station Name"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        {/* Email*/}
        <TextField
          label="Email"
          keyboardType="email-address"
          multiline={false}
          onChangeText={(text) => {
            setEmail(text);

            setErrors({ ...errors, emailError: null });
          }}
          value={email}
          error={errors.emailError}
        />

        {/* Country */}
        <TextField
          label="Country"
          keyboardType="default"
          multiline={false}
          onChangeText={(text) => setCountry(text)}
          value={country}
        />

        {/* Mobile */}
        <TextField
          label="Phone Number"
          keyboardType="phone-pad"
          multiline={false}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />

        {/* Add media station name */}
        <View style={tw`rounded shadow-none flex-1 z-10 py-4`}>
          <Text style={tw` pb-4 text-gray-800`}>
            Choose media station admin
          </Text>
          <View>
            <DropDownPicker
              placeholder="select station admin"
              open={open}
              value={adminId}
              items={items}
              setOpen={setOpen}
              setValue={setAdminId}
              setItems={setItems}
              style={{
                borderColor: COLORS.color_primary_dark,
                // backgroundColor: COLORS.color_primary_dark,  fc
              }}
              searchable={true}
            />
          </View>
        </View>

        {/* Register button */}
        <View style={[tw`py-4 self-center`, { width: width / 1.4 }]}>
          <Button
            text="Add Station"
            // color={COLORS.color_light_dark}
            style={tw`bg-gray-200 rounded-full px-20`}
            rounded="true"
            onPress={addStation}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddMediaStation;
