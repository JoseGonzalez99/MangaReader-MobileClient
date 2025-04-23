import { Platform } from 'react-native'
import { loginWithGoogleWeb } from './googleWeb'
import { loginWithGoogleNative } from './googleNative'

export async function loginWithGoogle() {
  if (Platform.OS === 'web') {
    return await loginWithGoogleWeb()
  } else {
    return await loginWithGoogleNative()
  }
}
