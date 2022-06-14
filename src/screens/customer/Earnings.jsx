import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { COLORS } from "../../resources";

const Payment = ({ station, amount, ...props }) => {
  return (
    <View
      style={[
        tw`flex-row justify-between p-4 px-6 my-2`,
        ...props.ContainerStyle,
      ]}
    >
      <Text>{station}</Text>
      <Text>{`Ksh ${amount}`}</Text>
    </View>
  );
};

const Earnings = () => {
  const PAYMENTS = [
    {
      id: 1,
      station: "KBC",
      amount: 45.78,
    },
    {
      id: 2,
      station: "KTN",
      amount: 45.78,
    },
    {
      id: 3,
      station: "NTV",
      amount: 45.78,
    },
    {
      id: 4,
      station: "Citizen TV",
      amount: 45.78,
    },
    {
      id: 5,
      station: "Inooro TV",
      amount: 45.78,
    },
  ];

  const [totalEarnings, setTotalEarnings] = React.useState(0);

  const totalE = PAYMENTS.reduce((acc, value) => {
    return acc + value.amount;
  }, 0);

  React.useEffect(() => {
    setTotalEarnings(totalE);
  }, [PAYMENTS]);

  return (
    <>
      <View
        style={[
          tw`h-48 items-center justify-center`,
          { backgroundColor: COLORS.color_accent_dark },
        ]}
      >
        <Text style={[tw`text-sm`, { color: COLORS.color_dark_light }]}>
          Total Balance
        </Text>
        <Text style={[tw`text-4xl mt-2`, { color: COLORS.color_dark_dark }]}>
          {`Ksh ${totalEarnings}`}
        </Text>
      </View>

      {/* All Payments */}
      <ScrollView>
        <View style={[tw`p-6`, { backgroundColor: COLORS.color_light_dark }]}>
          <Text
            style={[
              tw`text-center leading-6`,
              { color: COLORS.color_dark_accent },
            ]}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, est
            numquam incidunt.
          </Text>
          <View style={[tw`pt-3`]}>
            <Payment
              station="Total Balance"
              amount="74.99"
              ContainerStyle={[
                tw`rounded-full`,
                { backgroundColor: COLORS.color_accent_dark },
              ]}
            />

            {PAYMENTS.map((payment) => (
              <Payment
                key={payment.id.toString()}
                station={payment.station}
                amount={payment.amount}
                ContainerStyle={[
                  tw`rounded-full`,
                  { backgroundColor: COLORS.color_dark_accent },
                ]}
                TextStyle={{ color: "red" }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Earnings;
