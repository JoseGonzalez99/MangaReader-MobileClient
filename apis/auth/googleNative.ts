import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { firebaseAuth } from "@/apis/auth/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

/*
Configuras Google SignIn con tu webClientId, que es obligatorio incluso en Android.

Inicias sesión con la cuenta de Google del usuario.

Tomas el idToken que te devuelve Google.

Lo usas para generar un credential de Firebase.

Luego haces signInWithCredential, que autentica a ese usuario dentro de Firebase Authentication.

Finalmente obtienes un Firebase ID Token, el que se usa como comprobante de identidad para tu backend.
*/

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export async function loginWithGoogleNative() {
  console.log("EXPOCLIENT_ID: " + process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);

  try {
    console.log("Check Play Services...");
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log("Starting signIn...");
    const userInfo = await GoogleSignin.signIn();
    const userInfoData = userInfo.data;
    const idToken = userInfoData?.idToken;
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(
      firebaseAuth,
      googleCredential
    );
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Google SignIn error:", error);
    throw error;
  }
}
