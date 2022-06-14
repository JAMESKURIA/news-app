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
import { ACTIONS } from "../resources";
import PaymentModal from "./PaymentModal";

const { SlideInMenu } = renderers;

const NewsActionSheet = React.forwardRef(
  ({ newsItem, cb = () => null, newspage }, ref) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const handlePayment = ({ type, amount, currency, refNumber }) => {
      cb();

      if (type === "cancel") {
        setModalVisible((prev) => !prev);
        return;
      }

      console.log({ amount, currency, refNumber });
      setModalVisible((prev) => !prev);
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
                console.log(`Approved ${newsItem}`);
                cb();
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
                  console.log(`Rejected news ${newsItem}`);
                  cb();
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
