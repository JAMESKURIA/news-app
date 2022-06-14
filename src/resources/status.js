const STATUS = {
  PENDING: {
    text: "pending",
    color: "#945762",
    icon: {
      name: "unverified",
      type: "Octicons",
    },
  },
  APPROVED: {
    text: "approved",
    color: "#008b8b",
    icon: {
      name: "verified",
      type: "Octicons",
    },
  },
  PAID: {
    text: "paid",
    color: "#228b22",
    icon: {
      name: "verified",
      type: "MaterialIcons",
    },
  },
  DECLINED: {
    text: "declined",
    color: "#ff2424",
    icon: {
      name: "exclamation-circle",
      type: "FontAwesome5",
    },
  },
};

export default STATUS;
