import { getDefaultConfig } from "@expo/metro-config";

const defaultConfig = getDefaultConfig(__dirname);

export default {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"]
  }
};
