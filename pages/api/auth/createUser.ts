import * as admin from 'firebase-admin'
import serviceAccount from '../../../utils/serviceAccountKey.json';

let app: any

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });
} else {
  app = admin.app();
}

const auth = app.auth()

const creaateUser = async ({ query }:any, res:any) => {
  const { email, password, role } = query
  try {
    const { uid } = await auth.createUser({
      email,
      emailVerified: false,
      password,
      disabled: false,
    })
    await auth.setCustomUserClaims(uid, { role })
    res.status(200).json({success: true});
  } catch(err) {
    res.status(400).json(err).end();
  }
}

export default creaateUser