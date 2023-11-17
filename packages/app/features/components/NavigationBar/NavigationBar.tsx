import { SafeAreaView } from 'moti'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { MotiLink } from 'solito/moti'
import { TouchableOpacity } from 'react-native'

// Assets
import Plus from '../../../../assets/Icons/plus/plus'

export function NavigationScreen() {
  return (
    <SafeAreaView className="fixed left-0 right-0 top-0 mb-2 flex-1">
      <View className="flex-row items-center justify-between bg-transparent px-4">
        <MotiLink
          href="/"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
          style={undefined}
          onLayout={undefined}
        >
          <Text selectable={false} className="color-white text-base font-bold">
            DocuMe
          </Text>
        </MotiLink>

        <View className="flex-row items-center space-x-2">
          <Text className="color-white">DocuMe</Text>
        </View>

        <View className="flex flex-row items-center justify-center">
          <MotiLink
            href="/activity/xxx"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
            style={undefined}
            onLayout={undefined}
          >
            <View className="mr-4 flex flex-row items-center justify-center rounded-full bg-gray-700 p-2 text-white min-[320px]:hidden min-[540px]:inline-flex min-[720px]:bg-blue-600 min-[1540px]:bg-purple-300">
              <Plus width={24} height={24} fill="white" color={'white'} />
              <Text className="ml-2 mr-2 text-xs font-bold text-white">
                Add Activity
              </Text>
            </View>
          </MotiLink>
          <MotiLink
            href="/user/xxx"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
            style={undefined}
            onLayout={undefined}
          >
            <SolitoImage
              alt="user-image"
              src={require('../../../../assets/images/ulises.jpeg')}
              style={{ borderRadius: 40, padding: 8 }}
              height={50}
              width={50}
            />
          </MotiLink>

          {/* <MotiLink
            href="/activity/xxx"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
            style={undefined}
            onLayout={undefined}
          >
            <Text>Mobile</Text>
          </MotiLink> */}
        </View>
      </View>
    </SafeAreaView>
  )
}
