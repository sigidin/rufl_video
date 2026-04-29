// Mocked Firebase services for demo mode
export const db = {} as any;
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: any) => {
    callback(null);
    return () => {};
  }
} as any;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.warn('Firebase disabled - error in', operationType, 'at', path, error);
}

export const startPresence = () => {
  console.info('Presence disabled (Demo Mode)');
  return () => {};
};

export const incrementMonthlyVisitors = async () => {
  // No-op in demo mode
};
