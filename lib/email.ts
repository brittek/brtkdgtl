
export const sendSystemEmail = async (type: 'CONTACT' | 'NEWSLETTER', payload: any) => {
  // Simulating Resend/Postmark API call
  console.group(`[Brittek Mailer] Sending ${type}`);
  console.log(`To: ${payload.email}`);
  console.log(`Subject: ${payload.subject || 'Action Required'}`);
  console.groupEnd();
  
  return new Promise((resolve) => setTimeout(resolve, 400));
};
