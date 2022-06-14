import React from "react";
import { Modal, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { OutlinedTextField } from "rn-material-ui-textfield";
import tw from "tailwind-react-native-classnames";
import { COLORS } from "../resources";
import Button from "./Button";

const PaymentModal = ({ modalVisible, handlePayment }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("KES");
  const [refNumber, setRefNumber] = React.useState("");
  const [items, setItems] = React.useState([
    { label: "KES", value: "KES" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "YUAN", value: "YUAN" },
  ]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 items-center justify-center `}>
        <View style={tw`bg-gray-100 shadow-lg p-3 rounded w-11/12`}>
          {/* Amount and Currency */}
          <View style={tw`bg-white rounded p-2 z-50`}>
            <Text style={tw` pb-4 text-gray-800 text-lg`}>Enter amount</Text>
            <View style={tw`flex-row items-center justify-center`}>
              <View style={tw`flex-1 mr-2`}>
                <OutlinedTextField
                  label="Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                />
              </View>
              <View style={tw`w-1/3`}>
                <DropDownPicker
                  placeholder="KES"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  onChangeValue={(value) => setCurrency(value)}
                  style={[
                    tw`h-14 -mt-2`,
                    {
                      borderColor: COLORS.color_primary_dark,
                      // backgroundColor: COLORS.color_primary_dark,  fc
                      // width: "50%",
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* REF NO */}
          <View style={tw`bg-white rounded p-2 my-2`}>
            <Text style={tw` pb-4 text-gray-800 text-lg`}>
              Enter Ref number
            </Text>

            <OutlinedTextField
              label="Ref No"
              keyboardAppearance="default"
              keyboardType="default"
              value={refNumber}
              onChangeText={(text) => setRefNumber(text)}
            />
          </View>

          {/* Submit button */}
          <View style={tw`rounded my-2`}>
            <Button
              text="Pay Now"
              style={tw`bg-blue-500 w-full rounded`}
              textStyle={tw`text-white font-semibold`}
              onPress={() =>
                handlePayment({ type: "pay", amount, currency, refNumber })
              }
            />
          </View>

          {/* Cancel button */}
          <View style={tw`rounded my-2`}>
            <Button
              text="Cancel"
              style={tw`bg-red-500 w-full rounded`}
              textStyle={tw`text-white font-semibold`}
              onPress={() =>
                handlePayment({ type: "cancel", amount, currency, refNumber })
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
