// app/help/page.tsx
"use client";

import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  CreditCard,
  Search,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Note: This would normally be in a separate metadata file
// export const metadata: Metadata = {
//   title: "Help Center | Ticketin",
//   description: "FAQ, Support, Terms of Service, and Privacy Policy for Ticketin.",
// };

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
  category: string;
}

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems: FAQItem[] = [
    {
      question: "How do I purchase a ticket?",
      answer:
        "Browse events on our platform, select your desired event, choose your preferred ticket type and quantity, then proceed to checkout. Complete your payment using our secure payment gateway, and you'll receive a confirmation email with your ticket details.",
      icon: CreditCard,
      category: "Purchasing",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refund policies vary by event organizer. Most events allow refunds up to 48-72 hours before the event date. Please check the specific refund policy on the event page or contact the organizer directly. Emergency situations may be handled case-by-case.",
      icon: Shield,
      category: "Refunds",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team through multiple channels: email us at support@ticketin.com, call our hotline at +62-21-1234-5678 (available 9 AM - 6 PM), or use our live chat feature for instant assistance.",
      icon: MessageCircle,
      category: "Support",
    },
    {
      question: "How do I transfer my ticket to someone else?",
      answer:
        "Ticket transfers depend on the event organizer's policy. If transfers are allowed, go to 'My Tickets', select the ticket you want to transfer, and click 'Transfer Ticket'. Enter the recipient's email address and they'll receive transfer instructions.",
      icon: Users,
      category: "Transfers",
    },
    {
      question: "What happens if an event is cancelled?",
      answer:
        "If an event is cancelled, you'll receive an automatic full refund within 5-7 business days. We'll also notify you via email and SMS. For postponed events, your tickets remain valid for the new date, or you can request a refund.",
      icon: AlertCircle,
      category: "Cancellations",
    },
    {
      question: "How do I access my digital tickets?",
      answer:
        "After purchase, check your email for a confirmation with ticket links. You can also access tickets by logging into your Ticketin account and visiting 'My Tickets'. For mobile access, download our app or save tickets to your phone's wallet.",
      icon: CheckCircle,
      category: "Digital Tickets",
    },
  ];

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <HelpCircle size={40} />
            </div>
            <h1 className="animate-fade-in-up mb-4 text-4xl font-bold sm:text-5xl">
              Help Center
            </h1>
            <p className="animate-fade-in-up mx-auto max-w-2xl text-xl text-blue-100 delay-300">
              Find answers, get support, and learn about our policies for using
              Ticketin
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Quick Access Cards */}
        <div className="-mt-8 mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Live Chat
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Get instant help from our support team
            </p>
            <button className="w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700">
              <Link href="/under-construction">Start Chat</Link>
            </button>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              <Link href="/under-construction">Email Support</Link>
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Send us a detailed message
            </p>
            <a
              href="mailto:support@ticketin.com"
              className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <Link href="/under-construction"> Send Email</Link>
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Call Us
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Speak with our team directly
            </p>
            <a
              href="tel:+62211234567"
              className="block w-full rounded-lg bg-purple-600 px-4 py-2 text-center font-medium text-white transition-colors duration-200 hover:bg-purple-700"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Find quick answers to common questions about using Ticketin
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* FAQ Items */}
          <div className="mx-auto max-w-4xl space-y-4">
            {filteredFAQs.map((item, index) => {
              const IconComponent = item.icon;
              const isOpen = openFAQ === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.question}
                        </h3>
                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5">
                      <div className="pl-14">
                        <p className="leading-relaxed text-gray-600">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="py-12 text-center">
              <HelpCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg text-gray-500">
                No FAQs found matching your search.
              </p>
            </div>
          )}
        </section>

        {/* Support Details */}
        <section className="mb-16">
          <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">Need More Help?</h2>
              <p className="mx-auto max-w-2xl text-gray-300">
                Our support team is here to help you with any questions or
                issues you might have.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email Support</h3>
                    <p className="text-sm text-gray-300">
                      We&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:support@ticketin.com"
                  className="font-medium text-blue-300 hover:text-blue-200"
                >
                  support@ticketin.com
                </a>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone Support</h3>
                    <p className="text-sm text-gray-300">
                      Mon-Fri, 9 AM - 6 PM WIB
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+62211234567"
                  className="font-medium text-green-300 hover:text-green-200"
                >
                  +62-21-1234-5678
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Information */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Terms of Service */}
          <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Terms of Service
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                By using Ticketin, you agree to comply with our terms and
                conditions. We act as a platform connecting event organizers and
                ticket buyers.
              </p>
              <p>
                Organizers are responsible for their events, while Ticketin
                facilitates secure ticketing and payment processing with
                industry-standard security measures.
              </p>
              <p>
                Users must not engage in fraudulent activities, ticket scalping,
                or violating applicable laws. Failure to comply may result in
                account suspension.
              </p>

              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">
                    Important
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  Please read our full Terms of Service for complete details
                  about usage rights and restrictions.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Privacy Policy
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                Ticketin values your privacy and is committed to protecting your
                personal information. We collect only necessary information
                required for ticket purchases and account management.
              </p>
              <p>
                We collect information such as name, email, and payment details
                to process your ticket purchases securely. All data is encrypted
                and stored using industry-standard security protocols.
              </p>
              <p>
                We never sell your personal data to third parties. Information
                may be shared only with event organizers and payment providers
                when required to complete your transaction.
              </p>

              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">
                    Your Data is Safe
                  </span>
                </div>
                <p className="text-sm text-purple-700">
                  We use bank-level encryption and regularly audit our security
                  practices to keep your information secure.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
}
