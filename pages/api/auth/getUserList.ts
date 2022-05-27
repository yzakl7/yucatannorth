import * as admin from 'firebase-admin'
import serviceAccount from '../../../utils/serviceAccountKey.json';
import functions from 'firebase-functions';


let app: any

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });
} else {
  app = admin.app();
}

const auth = app.auth()

const getUserList = async (req:any, res:any) => {
  try {
    const data = await auth.listUsers()
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err).end();
  }
}

export default getUserList