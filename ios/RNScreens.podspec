Pod::Spec.new do |s|
  s.name         = "RNScreens"
  s.version      = "3.10.1"
  s.summary      = "React Native Screens"
  s.description  = <<-DESC
                   React Native Screens
                   DESC
  s.homepage     = "https://github.com/software-mansion/react-native-screens"
  s.license      = { :type => "MIT" }
  s.author       = { "Software Mansion" => "info@swmansion.com" }
  s.source       = { :git => "https://github.com/software-mansion/react-native-screens.git", :tag => "#{s.version}" }
  s.platform     = :ios, "10.0"
  s.source_files = "ios/**/*.{h,m,swift}"
  s.dependency "React-Core"
  s.dependency "React-RCTUtils"
  s.dependency "React-RCTBridge"
  s.dependency "React-RCTImage"
  s.dependency "React-RCTLinking"
  s.dependency "React-RCTNetwork"
  s.dependency "React-RCTText"
  s.dependency "React-RCTWebSocket"
  # Ensure only one version of react-native-gesture-handler is used
  s.dependency "RNGestureHandler", :path => "../node_modules/react-native-gesture-handler"
end
