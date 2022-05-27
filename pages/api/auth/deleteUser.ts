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

const deleteUser = async ({ query }:any, res:any) => {

  console.log('delete')
  const { uid } = query
  try {
    const data = await auth.deleteUser(uid)
    res.status(200).json({success: true, data});
  } catch(err) {
    console.log({err})
    res.status(400).json(err);
  }
}

export default deleteUser