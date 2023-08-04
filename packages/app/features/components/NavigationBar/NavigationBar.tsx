import { SafeAreaView } from 'moti';
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View  } from 'app/design/view'
import { MotiLink } from 'solito/moti';


export function NavigationScreen() {

  return (
    <SafeAreaView className="fixed top-0 left-0 right-0 flex-1">
        <View className='px-4 flex-row justify-between items-center bg-red-200'>
        {/* <Text>Image</Text> */}

        <MotiLink
          href="/"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          } }
          transition={{
            type: 'timing',
            duration: 150,
          }} style={undefined} onLayout={undefined}        >
          <Text selectable={false} className="text-base font-bold">
            DocuMe
          </Text>
        </MotiLink>
        
        <View className='flex-row items-center space-x-2'>
            <Text>DocMe</Text>
        </View>
            <SolitoImage
            alt="user-image"
            src={require('../../../../assets/images/ulises.jpeg')}
            style={{ borderRadius: 40 }}
            height={50}
            width={50}
            />
        </View>
    </SafeAreaView>
  )
}
