// Typed Firestore helper functions for database operations
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  updateDoc, 
  addDoc, 
  deleteDoc,
  onSnapshot,
  Timestamp as ClientTimestamp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { Timestamp as AdminTimestamp } from 'firebase-admin/firestore';
import { db } from './firebase';
import { adminDb, getFirestoreTimestamp } from './firebaseAdmin';

// Common timestamp type that works with both client and admin SDKs
type FirestoreTimestamp = ClientTimestamp | AdminTimestamp | any;

// TypeScript interfaces for Firestore documents
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  photoURL?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  role: 'student' | 'admin';
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  lastActive: FirestoreTimestamp;
}

export interface Course {
  id?: string;
  title: string;
  description: string;
  courseIncludes: string[];
  price: number;
  thumbnailURL: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface Announcement {
  id?: string;
  title: string;
  message: string;
  createdAt: FirestoreTimestamp;
  createdBy: string;
}

export interface Reaction {
  id?: string;
  userId: string;
  emoji: string;
  createdAt: FirestoreTimestamp;
}

export interface Admin {
  adminId: string;
  admin_name: string;
  username: string;
  passwordHash: string;
  admin_email: string;
  createdAt: FirestoreTimestamp;
}

// User operations
export async function getUserById(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: ClientTimestamp.now()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function updateUserLastActive(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      lastActive: ClientTimestamp.now()
    });
  } catch (error) {
    console.error('Error updating user last active:', error);
    throw error;
  }
}

// Course operations
export async function getCourses(): Promise<Course[]> {
  try {
    const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Course);
  } catch (error) {
    console.error('Error getting courses:', error);
    throw error;
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const courseDoc = await getDoc(doc(db, 'courses', id));
    if (courseDoc.exists()) {
      return { id: courseDoc.id, ...courseDoc.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error('Error getting course by ID:', error);
    throw error;
  }
}

export async function getEnrolledCoursesForUser(userId: string): Promise<Course[]> {
  try {
    const user = await getUserById(userId);
    if (!user || !user.enrolledCourses.length) {
      return [];
    }

    const courses: Course[] = [];
    for (const courseId of user.enrolledCourses) {
      const course = await getCourseById(courseId);
      if (course) {
        courses.push(course);
      }
    }
    return courses;
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    throw error;
  }
}

export async function enrollUserInCourse(userId: string, courseId: string): Promise<void> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.enrolledCourses.includes(courseId)) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        enrolledCourses: [...user.enrolledCourses, courseId],
        updatedAt: ClientTimestamp.now()
      });
    }
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    throw error;
  }
}

// Announcement operations
export async function getAnnouncements(limitCount: number = 20): Promise<Announcement[]> {
  try {
    const q = query(
      collection(db, 'announcements'), 
      orderBy('createdAt', 'desc'), 
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Announcement);
  } catch (error) {
    console.error('Error getting announcements:', error);
    throw error;
  }
}

export async function createAnnouncement(adminId: string, payload: Omit<Announcement, 'id' | 'createdAt' | 'createdBy'>): Promise<string> {
  try {
    const announcementData = {
      ...payload,
      createdAt: getFirestoreTimestamp(),
      createdBy: adminId
    };
    
    const docRef = await adminDb.collection('announcements').add(announcementData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
}

export async function updateAnnouncement(id: string, payload: Partial<Omit<Announcement, 'id' | 'createdAt' | 'createdBy'>>): Promise<void> {
  try {
    await adminDb.collection('announcements').doc(id).update(payload);
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  try {
    await adminDb.collection('announcements').doc(id).delete();
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
}

// Reaction operations
export async function addReaction(announcementId: string, userId: string, emoji: string): Promise<void> {
  try {
    const reactionData: Omit<Reaction, 'id'> = {
      userId,
      emoji,
      createdAt: ClientTimestamp.now()
    };
    
    await addDoc(collection(db, 'announcements', announcementId, 'reactions'), reactionData);
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
}

export async function getAnnouncementReactions(announcementId: string): Promise<Reaction[]> {
  try {
    const snapshot = await adminDb.collection('announcements')
      .doc(announcementId)
      .collection('reactions')
      .orderBy('createdAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Reaction);
  } catch (error) {
    console.error('Error getting announcement reactions:', error);
    throw error;
  }
}

// Real-time listeners
export function listenToAnnouncements(
  callback: (announcements: Announcement[]) => void,
  limitCount: number = 20
): () => void {
  const q = query(
    collection(db, 'announcements'), 
    orderBy('createdAt', 'desc'), 
    limit(limitCount)
  );
  
  return onSnapshot(q, (snapshot) => {
    const announcements = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }) as Announcement);
    callback(announcements);
  });
}

export function listenToCourses(callback: (courses: Course[]) => void): () => void {
  const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const courses = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }) as Course);
    callback(courses);
  });
}

export function listenToUser(userId: string, callback: (user: User | null) => void): () => void {
  const userRef = doc(db, 'users', userId);
  
  return onSnapshot(userRef, (snapshot) => {
    if (snapshot.exists()) {
      const user = { id: snapshot.id, ...snapshot.data() } as User;
      callback(user);
    } else {
      callback(null);
    }
  });
}

// Admin operations (server-side only)
export async function getAllUsers(): Promise<User[]> {
  try {
    const snapshot = await adminDb.collection('users').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User);
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  try {
    const snapshot = await adminDb.collection('admins').where('username', '==', username).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { ...doc.data() } as Admin;
    }
    return null;
  } catch (error) {
    console.error('Error getting admin by username:', error);
    throw error;
  }
}

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  try {
    const snapshot = await adminDb.collection('admins').where('admin_email', '==', email).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { ...doc.data() } as Admin;
    }
    return null;
  } catch (error) {
    console.error('Error getting admin by email:', error);
    throw error;
  }
}