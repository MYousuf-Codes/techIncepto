// Seed script to populate Firestore with sample data - Run with: node --loader ts-node/esm scripts/seed.ts
import { adminAuth, adminDb, getFirestoreTimestamp } from '../lib/firebaseAdmin.js';
import bcrypt from 'bcryptjs';

interface Course {
  id?: string;
  title: string;
  description: string;
  courseIncludes: string[];
  price: number;
  thumbnailURL: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  photoURL?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  role: 'student' | 'admin';
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastActive: FirebaseFirestore.Timestamp;
}

interface Admin {
  adminId: string;
  admin_name: string;
  username: string;
  passwordHash: string;
  admin_email: string;
  createdAt: FirebaseFirestore.Timestamp;
}

interface Announcement {
  title: string;
  message: string;
  createdAt: FirebaseFirestore.Timestamp;
  createdBy: string;
}

async function seedData() {
  try {
    console.log('🌱 Starting database seeding...');
    
    const timestamp = getFirestoreTimestamp();
    
    // Sample courses data
    const coursesData: Course[] = [
      {
        title: "MS Office Mastery",
        description: "Master Microsoft Office suite for professional productivity and career advancement.",
        courseIncludes: [
          "Professional document formatting in Word",
          "Advanced Excel formulas & pivot tables",
          "Dynamic PowerPoint presentations",
          "Professional email management with Outlook"
        ],
        price: 5000,
        thumbnailURL: "/images/courses/ms-office.jpg",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        title: "Digital Marketing & Social Media",
        description: "Build your brand online and master digital marketing strategies that convert.",
        courseIncludes: [
          "SEO optimization and keyword research",
          "Facebook and Instagram advertising",
          "TikTok and YouTube growth strategies",
          "Email marketing campaigns"
        ],
        price: 6000,
        thumbnailURL: "/images/courses/digital-marketing.jpg",
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        title: "Web Development",
        description: "Build responsive, modern websites using the latest web technologies.",
        courseIncludes: [
          "HTML5 and CSS3 fundamentals",
          "JavaScript programming basics",
          "Modern CSS frameworks",
          "WordPress development"
        ],
        price: 9000,
        thumbnailURL: "/images/courses/web-development.jpg",
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ];

    // Seed courses
    console.log('📚 Seeding courses...');
    const courseIds: string[] = [];
    for (const courseData of coursesData) {
      const courseRef = adminDb.collection('courses').doc();
      const existingCourse = await adminDb.collection('courses')
        .where('title', '==', courseData.title)
        .limit(1)
        .get();
      
      if (existingCourse.empty) {
        await courseRef.set({ ...courseData, id: courseRef.id });
        courseIds.push(courseRef.id);
        console.log(`✅ Created course: ${courseData.title}`);
      } else {
        courseIds.push(existingCourse.docs[0].id);
        console.log(`⏭️  Course already exists: ${courseData.title}`);
      }
    }

    // Sample students data
    const studentsData = [
      {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "+92 300 1234567",
        password: "password123"
      },
      {
        firstName: "Sarah",
        lastName: "Khan",
        username: "sarahkhan",
        email: "sarah.khan@example.com",
        phone: "+92 301 9876543",
        password: "password123"
      },
      {
        firstName: "Ahmed",
        lastName: "Ali",
        username: "ahmedali",
        email: "ahmed.ali@example.com",
        password: "password123"
      }
    ];

    // Seed students (create Firebase Auth users and Firestore docs)
    console.log('👥 Seeding students...');
    const studentIds: string[] = [];
    for (const studentData of studentsData) {
      try {
        // Check if user already exists in Firebase Auth
        let userRecord;
        try {
          userRecord = await adminAuth.getUserByEmail(studentData.email);
          console.log(`⏭️  Auth user already exists: ${studentData.email}`);
        } catch (error) {
          // User doesn't exist, create them
          userRecord = await adminAuth.createUser({
            email: studentData.email,
            password: studentData.password,
            displayName: `${studentData.firstName} ${studentData.lastName}`,
            emailVerified: true // For testing purposes
          });
          console.log(`✅ Created auth user: ${studentData.email}`);
        }

        // Check if Firestore user doc exists
        const userDocRef = adminDb.collection('users').doc(userRecord.uid);
        const userDoc = await userDocRef.get();
        
        if (!userDoc.exists) {
          const userData: User = {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            username: studentData.username,
            email: studentData.email,
            phone: studentData.phone,
            enrolledCourses: courseIds.slice(0, 2), // Enroll in first 2 courses
            completedCourses: courseIds.slice(0, 1), // Complete first course
            role: 'student',
            createdAt: timestamp,
            updatedAt: timestamp,
            lastActive: timestamp
          };
          
          await userDocRef.set(userData);
          console.log(`✅ Created user doc: ${studentData.username}`);
        } else {
          console.log(`⏭️  User doc already exists: ${studentData.username}`);
        }
        
        studentIds.push(userRecord.uid);
      } catch (error) {
        console.error(`❌ Error creating student ${studentData.email}:`, error);
      }
    }

    // Seed admin
    console.log('👑 Seeding admin...');
    const adminData = {
      admin_name: "Tech Admin",
      username: "admin",
      admin_email: "admin@techincepto.com",
      password: "admin123"
    };

    const adminRef = adminDb.collection('admins').doc('admin-001');
    const existingAdmin = await adminRef.get();
    
    if (!existingAdmin.exists) {
      const passwordHash = await bcrypt.hash(adminData.password, 12);
      const adminDoc: Admin = {
        adminId: 'admin-001',
        admin_name: adminData.admin_name,
        username: adminData.username,
        passwordHash: passwordHash,
        admin_email: adminData.admin_email,
        createdAt: timestamp
      };
      
      await adminRef.set(adminDoc);
      console.log(`✅ Created admin: ${adminData.username}`);
    } else {
      console.log(`⏭️  Admin already exists: ${adminData.username}`);
    }

    // Seed announcements
    console.log('📢 Seeding announcements...');
    const announcementsData: Announcement[] = [
      {
        title: "Welcome to TECHINCEPTO Student Portal",
        message: "Welcome to your personalized learning hub! Here you can track your progress, access course materials, and manage your learning journey.",
        createdAt: timestamp,
        createdBy: 'admin-001'
      },
      {
        title: "New Course Launch: Advanced React Development",
        message: "We are excited to announce the launch of our new Advanced React Development course! Early bird discount available until October 15th.",
        createdAt: timestamp,
        createdBy: 'admin-001'
      }
    ];

    for (const announcementData of announcementsData) {
      const announcementRef = adminDb.collection('announcements').doc();
      const existingAnnouncement = await adminDb.collection('announcements')
        .where('title', '==', announcementData.title)
        .limit(1)
        .get();
      
      if (existingAnnouncement.empty) {
        await announcementRef.set({ ...announcementData, id: announcementRef.id });
        console.log(`✅ Created announcement: ${announcementData.title}`);
      } else {
        console.log(`⏭️  Announcement already exists: ${announcementData.title}`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`Courses: ${courseIds.length}`);
    console.log(`Students: ${studentIds.length}`);
    console.log(`Admin: 1`);
    console.log(`Announcements: ${announcementsData.length}`);
    console.log('\n🔐 Admin Login Credentials:');
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
    console.log('\n👥 Student Login Credentials:');
    studentsData.forEach(student => {
      console.log(`Email: ${student.email} | Password: ${student.password}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedData().then(() => {
  console.log('\n✨ Seed script finished. You can now test the application!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Seed script failed:', error);
  process.exit(1);
});