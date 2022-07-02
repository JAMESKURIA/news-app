const { getDefaultConfig } = require("@expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push("cjs");
module.exports = defaultConfig;

// module.exports = {
//   //added this
//   resolver: {
//     sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
//   },
// };
