// Shared user storage - replace with real database connection
export const users = [
  {
    id: 1,
    email: "student@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Alex",
    lastName: "Student",
    role: "student",
    isActive: true,
  },
  {
    id: 2,
    email: "parent@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Sarah",
    lastName: "Parent",
    role: "parent",
    isActive: true,
  },
  {
    id: 3,
    email: "counsellor@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    firstName: "Dr. Emily",
    lastName: "Counsellor",
    role: "counsellor",
    isActive: true,
  },
  {
    id: 4,
    email: "surindhar@gmail.com",
    password: "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa", // suri@2005
    firstName: "Surindhar",
    lastName: "Admin",
    role: "admin",
    isActive: true,
  },
]

export function addUser(user: any) {
  users.push(user)
}

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email)
}

export function findUserByEmailAndRole(email: string, role: string) {
  return users.find((u) => u.email === email && u.role === role)
}
