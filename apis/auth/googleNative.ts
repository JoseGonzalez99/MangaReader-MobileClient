import { GoogleSignin, SignInResponse } from '@react-native-google-signin/google-signin'
import { firebaseAuth } from '@/apis/auth/firebaseConfig'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
})

export async function loginWithGoogleNative() {
  console.log('EXPOCLIENT_ID: '+ process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID)

  try {
    console.log('Check Play Services...')
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    console.log('Starting signIn...')
    const userInfo = await GoogleSignin.signIn()
    console.log('userInfo:', JSON.stringify(userInfo))
    
    const userInfoData = userInfo.data;
    const  idToken  = userInfoData?.idToken
    console.log('idToken:', idToken)

    const googleCredential = GoogleAuthProvider.credential(idToken)
    const userCredential = await signInWithCredential(firebaseAuth, googleCredential)
    const token = await userCredential.user.getIdToken()
    console.log('Firebase ID token:', token)

    return token
  } catch (error) {
    console.error('Google SignIn error:', error)
    throw error
  }
}
