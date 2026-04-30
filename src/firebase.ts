import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  updateDoc, 
  increment, 
  setDoc, 
  onSnapshot,
  collection,
  query,
  where,
  Timestamp,
  deleteDoc,
  getDoc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = (firebaseConfig as any).firestoreDatabaseId && (firebaseConfig as any).firestoreDatabaseId !== '(default)'
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

// Connection Test
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection successful');
  } catch (error) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('permission-denied'))) {
      console.warn("Firebase connection test finished (could be offline or restricted):", error.message);
    }
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Stats & Presence logic
export const incrementMonthlyVisitors = async () => {
  const statsRef = doc(db, 'stats', 'visitors');
  try {
    const docSnap = await getDoc(statsRef);
    if (!docSnap.exists()) {
      await setDoc(statsRef, { 
        monthlyCount: 1, 
        lastReset: new Date().toISOString() 
      });
    } else {
      await updateDoc(statsRef, {
        monthlyCount: increment(1)
      });
    }
  } catch (error) {
    console.warn('Failed to increment visitors:', error);
  }
};

export const startPresence = (onOnlineChange: (count: number) => void) => {
  const sessionId = Math.random().toString(36).substring(7);
  const sessionRef = doc(db, 'presence', sessionId);

  const updatePresence = async () => {
    try {
      await setDoc(sessionRef, {
        lastSeen: Timestamp.now()
      });
    } catch (error) {
      console.warn('Presence update failed:', error);
    }
  };

  // Initial update
  updatePresence();
  const interval = setInterval(updatePresence, 30000); // Every 30s

  // Listen for online count
  const q = query(
    collection(db, 'presence'),
    where('lastSeen', '>', Timestamp.fromMillis(Date.now() - 60000)) // Active in last minute
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log('Presence update:', snapshot.size, 'users online');
    onOnlineChange(snapshot.size);
  }, (error) => {
    console.error('Presence Snapshot Error:', error);
    handleFirestoreError(error, OperationType.GET, 'presence');
  });

  // Cleanup
  window.addEventListener('beforeunload', () => {
    deleteDoc(sessionRef);
  });

  return () => {
    clearInterval(interval);
    unsubscribe();
    deleteDoc(sessionRef).catch(() => {});
  };
};
