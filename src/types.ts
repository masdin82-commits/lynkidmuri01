export interface SyllabusItem {
  id: number;
  title: string;
  description: string;
  details: string[];
}

export interface BonusItem {
  id: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    points: {
      digital: number;
      fisik: number;
      jasa: number;
    };
  }[];
}

export interface QuizResult {
  category: 'digital' | 'fisik' | 'jasa';
  title: string;
  description: string;
  recommendation: string;
}

export interface Participant {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  businessInterest: string;
  ticketType: 'regular' | 'vip';
  paymentMethod: string;
  paymentStatus: 'pending' | 'success';
  bookingCode: string;
  registeredAt: string;
}
