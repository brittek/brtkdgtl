
import { hashMetadata } from './privacy';

export interface Submission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'RECEIVED' | 'NOTIFIED' | 'FAILED';
  aiTriage?: any;
  ipHash?: string | null;
}

export const saveSubmission = (data: Omit<Submission, 'id' | 'createdAt' | 'status'>) => {
  const submissions = JSON.parse(localStorage.getItem('brittek_leads') || '[]');
  const newSubmission = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    status: 'RECEIVED' as const,
    ipHash: hashMetadata('127.0.0.1') // Mock IP
  };
  submissions.push(newSubmission);
  localStorage.setItem('brittek_leads', JSON.stringify(submissions));
  return newSubmission;
};

export const updateSubmissionStatus = (id: string, status: Submission['status'], aiTriage?: any) => {
  const submissions = JSON.parse(localStorage.getItem('brittek_leads') || '[]');
  const index = submissions.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    submissions[index].status = status;
    if (aiTriage) submissions[index].aiTriage = aiTriage;
    localStorage.setItem('brittek_leads', JSON.stringify(submissions));
  }
};

export const saveSubscriber = (email: string) => {
  const subs = JSON.parse(localStorage.getItem('brittek_subs') || '[]');
  if (!subs.some((s: any) => s.email === email)) {
    subs.push({
      email,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      unsubToken: Math.random().toString(36).substr(2, 12)
    });
    localStorage.setItem('brittek_subs', JSON.stringify(subs));
  }
};
