import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Alert, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import tw from "tailwind-react-native-classnames";
import useAdmin from "../hooks/useAdmin";
import { ACTIONS } from "../resources";
import Loading from "./Loading";
import PaymentModal from "./PaymentModal";

const UPDATE_NEWS = gql`
  mutation verifyNews($newsId: Int!, $adminId: Int!, $status: String) {
    update_news_verify(
      where: { customer_new: { customer_news_id: { _eq: $newsId } } }
      _set: {
        news_verify_media_admin_id: $adminId
        news_verify_status: $status
      }
    ) {
      affected_rows
    }
  }
`;

const PAY_NEWS = gql`
  mutation payNews(
    $newsId: Int!
    $adminId: Int!
    $amount: String
    $currency: String
    $mode: String
    $refNumber: String
  ) {
    insert_payments_one(
      object: {
        payment_amount: $amount
        payment_currency_type: $currency
        payment_customer_news_id: $newsId
        payment_media_admin_id: $adminId
        payment_ref: $refNumber
        payments_mode: $mode
      }
    ) {
      payment_id
    }
    update_news_verify(
      where: { news_verify_customer_news_id: { _eq: $newsId } }
      _set: { news_verify_status: "paid" }
    ) {
      affected_rows
    }
  }
`;
const { SlideInMenu } = renderers;

const NewsActionSheet = React.forwardRef(
  ({ newsItem, cb = () => null, newspage }, ref) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const { media_admin_id: adminId } = useAdmin();

    const [
      upDateNews,
      { data: updateData, loading: updateLoading, error: updateError },
    ] = useMutation(UPDATE_NEWS);

    const [payNews, { data: payData, loading: payLoading, error: payError }] =
      useMutation(PAY_NEWS);

    const handleNewsActions = (type) => {
      switch (type) {
        case "approve":
          upDateNews({
            variables: {
              newsId: newsItem,
              adminId,
              status: "verified",
            },
          });

          break;

        case "reject":
          upDateNews({
            variables: {
              newsId: newsItem,
              adminId,
              status: "rejected",
            },
          });

          break;

        case "pay":
          break;
        default:
          break;
      }
    };

    const handlePayment = ({ type, amount, currency, refNumber, mode }) => {
      cb();

      const newsId = newsItem;

      setModalVisible((prev) => !prev);

      if (type === "cancel") {
        return;
      }

      payNews({
        variables: {
          newsId,
          adminId,
          amount,
          currency,
          mode,
          refNumber,
        },
      });
    };

    // Handle News Actions
    const handleActions = ({ type }) => {
      switch (type) {
        case ACTIONS.approve:
          Alert.alert("Alert", `Approve ${newsItem} ?`, [
            {
              text: "Cancel",
              onPress: () => {
                console.log("Cancel Pressed");
                cb();
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                handleNewsActions("approve");
                // console.log(`News Id ${newsItem}`);
                // console.log(`Admin Id ${adminId}`);
              },
            },
          ]);
          break;
        case ACTIONS.reject:
          Alert.alert(
            "Confirm",
            `Are you sure you want to reject ${newsItem}`,
            [
              {
                text: "Cancel",
                onPress: () => {
                  console.log("Cancel Pressed");
                  cb();
                },
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  handleNewsActions("reject");
                  // console.log(`Rejected news ${newsItem}`);
                },
              },
            ]
          );
          break;
        case ACTIONS.pay:
          Alert.alert("Confirm!", `Proceed to pay ${newsItem}`, [
            {
              text: "Cancel",
              onPress: () => {
                console.log("Cancel Pressed");
                cb();
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                setModalVisible(true);
              },
            },
          ]);

          break;
        case ACTIONS.view:
          cb((type = ACTIONS.view));
          break;

        default:
          break;
      }
    };

    React.useEffect(() => {
      if (updateData) {
        console.log("Updated news: ", updateData || payData);
        Alert.alert("Success", `Successfully updated News `);
      }
    }, [updateData]);

    // Loading state
    if (updateLoading || payLoading) {
      return <Loading message="updating news..." />;
    }

    // Error state
    if (updateError || payError) {
      console.log(
        "An error occurred while updating news: ",
        updateError || payError
      );
    }
    return (
      <View>
        <Menu renderer={SlideInMenu} ref={ref}>
          <MenuTrigger />
          <MenuOptions
            customStyles={{
              optionsContainer: { backgroundColor: "transparent" },
              optionWrapper: {
                // padding: 15,
                justifyContent: "center",
                // alignItems: "center",
              },
            }}
            style={tw`bg-white rounded-tr-xl rounded-tl-xl shadow-lg`}
          >
            {!newspage && (
              <MenuOption
                onSelect={() => handleActions({ type: ACTIONS.view })}
              >
                <Text style={[tw`text-lg p-2 px-3`, { color: "dodgerblue" }]}>
                  View
                </Text>
              </MenuOption>
            )}
            <MenuOption
              onSelect={() => handleActions({ type: ACTIONS.approve })}
            >
              <Text style={[tw`text-lg p-2 px-3`, { color: "green" }]}>
                Approve
              </Text>
            </MenuOption>
            <MenuOption onSelect={() => handleActions({ type: ACTIONS.pay })}>
              <Text style={[tw`text-lg p-2 px-3`, { color: "blue" }]}>Pay</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => handleActions({ type: ACTIONS.reject })}
            >
              <Text style={[tw`text-lg p-2 px-3`, { color: "red" }]}>
                Reject
              </Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                ref?.current?.close();
                cb();
              }}
            >
              <Text style={[tw`text-lg p-2 px-3 text-center text-red-500`]}>
                Cancel
              </Text>
            </MenuOption>
            {/* <MenuOption disabled={true} text="Disabled" /> */}
          </MenuOptions>
        </Menu>

        <PaymentModal
          modalVisible={modalVisible}
          handlePayment={(details) => handlePayment(details)}
        />
      </View>
    );
  }
);

export default NewsActionSheet;
