export interface User {
  id: string;
  name: string;
  email: string;
  role: "organization" | "recruiter" | "candidate";
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Recruiter {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  email: string;
}

export interface CV {
  id: string;
  candidateId: string;
  organizationId: string;
  filename: string;
  uploadDate: Date;
  status: "pending" | "reviewed" | "rejected" | "accepted";
}

export interface CVAnalysis {
  cvId: string;
  analysis: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
