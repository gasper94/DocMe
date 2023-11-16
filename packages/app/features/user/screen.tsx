import { Text } from 'app/design/typography'
import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'
import { SafeAreaView } from 'moti'
import { NavigationScreen } from '../components/NavigationBar/NavigationBar'
import { View } from 'app/design/view'

export function UserDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation} className="border-b-2">
        <NavigationScreen />
      </View>
      <View
        style={styles.mainx}
        className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
      >
        <View className="w-32 border-r-8 bg-blue-200 lg:max-h-full xl:max-h-full">
          <View className="align-center mt-4 h-full min-[1540px]:items-center">
            {/* This is the calendar side */}
          </View>
        </View>

        {/* This is the right side - Might be menus in the future */}
        <View
          style={styles.right}
          className=" hidden bg-red-300 min-[375px]:hidden sm:hidden md:hidden lg:block"
        >
          <View style={styles.rightContainer}>
            <View style={styles.communities} className="p-4">
              <Text className="text-white">Communities should go here</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    borderColor: 'rgb(49, 51, 53)',

    ...Platform.select({
      ios: {
        height: 'auto',
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
