// Authentication utilities and types
export type UserRole = "student" | "parent" | "counsellor" | "admin"

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication functions - to be replaced with real implementation
export const mockUsers: User[] = [
  {
    id: 1,
    email: "student@example.com",
    firstName: "Alex",
    lastName: "Student",
    role: "student",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    email: "parent@example.com",
    firstName: "Sarah",
    lastName: "Parent",
    role: "parent",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    email: "counsellor@example.com",
    firstName: "Dr. Emily",
    lastName: "Counsellor",
    role: "counsellor",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export async function authenticateUser(email: string, password: string, role: UserRole): Promise<User | null> {
  // Mock authentication - replace with real implementation
  const user = mockUsers.find((u) => u.email === email && u.role === role)

  if (user && password === "password123") {
    return user
  }

  return null
}

export async function registerUser(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
}): Promise<User | null> {
  // Mock registration - replace with real implementation
  const newUser: User = {
    id: mockUsers.length + 1,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  return newUser
}

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case "student":
      return "/dashboard/student"
    case "parent":
      return "/dashboard/parent"
    case "counsellor":
      return "/dashboard/counsellor"
    case "admin":
      return "/dashboard/admin"
    default:
      return "/dashboard"
  }
}
