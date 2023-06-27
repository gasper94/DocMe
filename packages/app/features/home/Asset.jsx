import { Text, View, StyleSheet, Image } from 'react-native';

export default function AssetExample() {
    {/* <Image style={styles.logo} source={require('../assets/snack-icon.png')} /> */}
  return (
       <Image style={styles.logo} source={require('../../../assets/images/ulises.jpeg')} />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
