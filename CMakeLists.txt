cmake_minimum_required(VERSION 3.10)

# Verify Compiler Installation
# Ensure that your compiler (e.g., GCC, Clang, MSVC) is correctly installed and accessible from your command line or terminal.

# Check Include Paths
# Verify that the include paths for the standard library headers are correctly set in your build configuration.

# Update Build Configuration
# If you are using a build system like CMake, make sure it is set up to include the necessary paths for your compiler.

# Add include directories for standard library headers
include_directories(${CMAKE_CXX_IMPLICIT_INCLUDE_DIRECTORIES})

# Add your source files
add_executable(YourExecutableName
    /Users/I868139/Library/CloudStorage/OneDrive-SAPSE/03. Personal/PUCRS - Pos graduação/HouseMatching/node_modules/react-native/ReactCommon/jsinspector/InspectorInterfaces.h
)