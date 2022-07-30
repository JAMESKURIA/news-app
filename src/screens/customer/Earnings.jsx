import { gql, useQuery } from "@apollo/client";
import * as Print from "expo-print";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { pdfHtml } from "../../../pdf";
import { Loading, TopNav } from "../../components";
import useCustomer from "../../hooks/useCustomer";
import { COLORS } from "../../resources";

const FETCH_PAYMENTS = gql`
  query getPayments($customerId: Int) {
    payments(
      where: {
        media_admin: {
          news_verifies: {
            customer_new: { customer_news_customer_id: { _eq: $customerId } }
          }
        }
      }
    ) {
      payment_amount
      payment_id
      payment_ref
      payments_date
      payments_mode
      payment_currency_type
      media_admin {
        media_stations {
          media_station_id
          media_station_name
        }
      }
    }
  }
`;

const Payment = ({ station, amount, currency, ...props }) => {
  return (
    <View
      style={[
        tw`flex-row justify-between p-4 px-6 my-2`,
        ...props.ContainerStyle,
      ]}
    >
      <Text>{station}</Text>
      <Text style={tw`capitalize`}>{`${currency} ${amount}`}</Text>
    </View>
  );
};

const Earnings = ({ navigation }) => {
  const { customer_id: customerId } = useCustomer();
  const { loading, error, data } = useQuery(FETCH_PAYMENTS, {
    variables: { customerId },
  });

  const [totalEarnings, setTotalEarnings] = React.useState(0);
  const [payments, setPayments] = React.useState([]);
  const [pdfLoading, setPdfLoading] = React.useState(false);

  const totalE = payments.reduce((acc, value) => {
    return acc + parseFloat(value.amount);
  }, 0);

  React.useEffect(() => {
    setTotalEarnings(totalE);
  }, [payments]);

  React.useEffect(() => {
    if (data) {
      const _paymData = data.payments.map((paym) => ({
        id: paym.payment_id,
        currency: paym.payment_currency_type,
        amount: paym.payment_amount,
        paymentRef: paym.payment_ref,
        date: paym.payments_date,
        mode: paym.payments_mode,
        station: {
          id: paym.media_admin.media_stations[0].media_station_id,
          name: paym.media_admin.media_stations[0].media_station_name,
        },
      }));

      setPayments([..._paymData]);

      // console.log(_paymData);
    }
  }, [data]);

  // Print Receipts
  const print = async () => {
    setPdfLoading(true);

    // pdfHtml(values.user_image);

    await Print.printAsync({
      html: pdfHtml(payments),
    });

    setPdfLoading(false);
  };

  if (error) {
    console.log("Error fetching payments: ", error);
    Alert.alert("Error", "Some error occurred while fetching payments");
  }
  if (loading) {
    return <Loading message="fetching payments..." />;
  }

  if (pdfLoading) {
    return <Loading message="generating report..." />;
  }
  return (
    <>
      {/* Navigation */}
      <View style={tw` pt-4  w-full`}>
        <TopNav
          pageName={"My Earnings"}
          handleGoBack={() => navigation.goBack()}
        />
      </View>
      <View
        style={[
          tw`items-end p-4 z-10`,
          { backgroundColor: COLORS.color_accent_dark },
        ]}
      >
        <TouchableOpacity style={tw`rounded p-2 bg-blue-50 `} onPress={print}>
          <Text>Receipt</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          tw`h-48 items-center justify-center -mt-6`,
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
      <View style={[tw`flex-1`, { backgroundColor: COLORS.color_light_dark }]}>
        <ScrollView>
          <View style={tw`p-6`}>
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
                currency={""}
                station="Total Balance"
                amount={totalE}
                ContainerStyle={[
                  tw`rounded-full`,
                  { backgroundColor: COLORS.color_accent_dark },
                ]}
              />

              {payments.map((payment) => (
                <Payment
                  key={payment.id.toString()}
                  station={payment.station.name}
                  currency={payment.currency}
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
      </View>
    </>
  );
};

export default Earnings;
