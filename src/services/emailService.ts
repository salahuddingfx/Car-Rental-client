export interface EmailNotification {
  id: string;
  to: string;
  subject: string;
  body: string;
  type: 'booking' | 'cancellation' | 'reminder' | 'welcome' | 'payment';
  sentAt: number;
}

// Simulated email queue (in real app, this would call backend API)
class EmailService {
  private queue: EmailNotification[] = [];

  send(to: string, subject: string, body: string, type: EmailNotification['type']) {
    const email: EmailNotification = {
      id: crypto.randomUUID(),
      to,
      subject,
      body,
      type,
      sentAt: Date.now(),
    };
    this.queue.push(email);
    console.log(`📧 Email sent to ${to}: ${subject}`);
    return email;
  }

  sendBookingConfirmation(to: string, carName: string, dates: string) {
    return this.send(
      to,
      `Booking Confirmed - ${carName}`,
      `Your booking for ${carName} has been confirmed. Dates: ${dates}. Thank you for choosing Apex Ride!`,
      'booking'
    );
  }

  sendBookingCancellation(to: string, carName: string) {
    return this.send(
      to,
      `Booking Cancelled - ${carName}`,
      `Your booking for ${carName} has been cancelled. If you have any questions, please contact us.`,
      'cancellation'
    );
  }

  sendPaymentReminder(to: string, amount: number) {
    return this.send(
      to,
      `Payment Reminder - ৳${amount}`,
      `You have a pending payment of ৳${amount}. Please complete your payment to confirm your booking.`,
      'payment'
    );
  }

  sendWelcomeEmail(to: string, name: string) {
    return this.send(
      to,
      'Welcome to Apex Ride!',
      `Hi ${name}, welcome to Apex Ride! We're excited to have you on board. Browse our premium collection and start your journey.`,
      'welcome'
    );
  }

  sendTripReminder(to: string, carName: string, date: string) {
    return this.send(
      to,
      `Trip Reminder - ${carName}`,
      `Your trip with ${carName} starts on ${date}. Please ensure you have your driving license and ID ready.`,
      'reminder'
    );
  }

  getQueue() {
    return [...this.queue];
  }
}

export const emailService = new EmailService();
