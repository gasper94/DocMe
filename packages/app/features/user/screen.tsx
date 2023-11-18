import { useState } from 'react'
import { Text } from 'app/design/typography'
import { TextLink } from 'solito/link'
import { StyleSheet, Button } from 'react-native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'moti'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { View } from 'app/design/view'
import { Image, TouchableOpacity } from 'react-native'

// Image upload
import { handleGetImage } from '../../cross-platform-features/uploadImage/index'

export function UserDetailScreen() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    // <SafeAreaView style={styles.container}>
    // <View style={styles.navigation} className="border-b-2">
    //   <NavigationScreen />
    // </View>
    // <View
    //   style={styles.mainx}
    //   className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
    // >
    //   <View className="w-32 border-r-8 bg-blue-200 lg:max-h-full xl:max-h-full">
    //     <View className="align-center mt-4 h-full min-[1540px]:items-center">

    //     </View>
    //   </View>

    //   <View
    //     style={styles.right}
    //     className=" hidden bg-red-300 min-[375px]:hidden sm:hidden md:hidden lg:block"
    //   >
    //     <View style={styles.rightContainer}>
    //       <View style={styles.communities} className="p-4">
    //         <Text className="text-white">Communities should go here</Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
    // </SafeAreaView>

    <View
      style={styles.theme}
      className="bg-trasnparent flex-1 items-center justify-center"
    >
      <View style={styles.navigation} className="border-b-2">
        <NavigationScreen />
      </View>
      <View
        style={styles.mainx}
        className="flex flex-col bg-red-100 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
      >
        <Text>Hello there!</Text>

        <TouchableOpacity onPress={handleGetImage}>
          {selectedImage ? (
            <Image source={selectedImage} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text>Tap to pick an image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theme: {
    backgroundColor: '#21252E',
  },
  communities: {
    backgroundColor: 'rgb(26, 30, 38)',
    width: 350,
    height: 350,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  mobileOptions: {
    ...Platform.select({
      ios: {
        display: 'none',
      },
    }),
  },
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgb(33, 37, 46)',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  navigation: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#21252E',
    borderColor: 'rgb(49, 51, 53)',

    ...Platform.select({
      ios: {
        height: 'auto',
        display: 'none',
      },
    }),
  },
  mainx: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '95%',

    overflow: 'hidden',
    ...Platform.select({
      ios: {
        flexDirection: 'column',
        height: '100%',
      },
    }),
  },
  center: {
    overflow: 'scroll',
    flex: 1,
    height: '100%',

    ...Platform.select({
      ios: {
        height: '100%',
      },
    }),
  },
  left: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    borderColor: 'rgb(49, 51, 53)',
    backgroundColor: 'red',
  },
  right: {
    flex: 1,
    overflow: 'hidden',

    ...Platform.select({
      ios: {
        display: 'none',
      },
    }),
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
  },
})
