export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // spam protection field
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot check: If the hidden honeypot field has a value, it is a bot
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.honeypot = 'Bot detected';
    return { isValid: false, errors };
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Full name must not exceed 100 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (data.subject.trim().length > 150) {
    errors.subject = 'Subject must not exceed 150 characters.';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (data.message.trim().length > 3000) {
    errors.message = 'Message must not exceed 3000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
