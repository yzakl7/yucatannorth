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

const updateUser = async ({ query }:any, res:any) => {
  const { email, role, uid, disabled } = query
  try {
    const data = await auth.updateUser(uid, {
      email,
      emailVerified: false,
      disabled: disabled === 'true',
    })
    if (role) {
      await auth.setCustomUserClaims(uid, { role })
    }
    
    res.status(200).json({success: true, data});
  } catch(err) {
    console.log({err})
    res.status(400).json(err);
  }
}

export default updateUser