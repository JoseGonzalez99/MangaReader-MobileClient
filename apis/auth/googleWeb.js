import { GoogleAuthProvider } from 'firebase/auth'
import { firebaseAuth } from '@/apis/auth/firebaseConfig'

export async function loginWithGoogleWeb() {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(firebaseAuth, provider)
  const idToken = await result.user.getIdToken()
  return idToken
}
