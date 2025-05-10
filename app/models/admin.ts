export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// In a real app, this would be stored in a database
// For now, we'll use a simple in-memory store
const admins: Admin[] = [
  {
    id: '1',
    email: 'admin@heartlink.com',
    // In a real app, this would be hashed
    password: '000000',
    name: 'Admin',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function getAdminByEmail(email: string): Admin | undefined {
  return admins.find(admin => admin.email === email);
}

export function validateAdminPassword(admin: Admin, password: string): boolean {
  // In a real app, you would compare hashed passwords
  return admin.password === password;
}
