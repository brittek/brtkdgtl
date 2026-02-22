
export const validateContact = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.length < 2) errors.name = "Name too short";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email";
  if (!data.subject || data.subject.length < 2) errors.subject = "Subject required";
  if (!data.message || data.message.length < 10) errors.message = "Message too short";
  if (!data.consent) errors.consent = "Consent required";
  
  // Honeypot check
  if (data.company) errors.spam = "Bot detected";
  
  return {
    success: Object.keys(errors).length === 0,
    errors
  };
};

export const validateNewsletter = (email: string, honeypot?: string) => {
  if (honeypot) return { success: false, error: "Bot detected" };
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return { success: valid, error: valid ? null : "Invalid email" };
};
