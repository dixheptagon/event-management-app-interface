// app/help/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Ticketin",
  description:
    "FAQ, Support, Terms of Service, and Privacy Policy for Ticketin.",
};

export default async function HelpPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 p-6">
      <h1 className="text-center text-3xl font-bold">Help Center</h1>
      <p className="text-center text-gray-500">
        Find answers, support, and policies for using Ticketin.
      </p>

      {/* FAQ Section */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <div>
            <p className="font-medium">How do I purchase a ticket?</p>
            <p className="text-gray-600">
              Browse events, select your desired one, choose ticket type, and
              complete your payment.
            </p>
          </div>
          <div>
            <p className="font-medium">Can I get a refund?</p>
            <p className="text-gray-600">
              Refunds depend on the organizer&apos;s policy. Please check the
              event page for details.
            </p>
          </div>
          <div>
            <p className="font-medium">How do I contact support?</p>
            <p className="text-gray-600">
              You can reach us via the Support section below.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Support</h2>
        <p className="text-gray-600">
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@ticketin.com"
            className="text-blue-600 hover:underline"
          >
            support@ticketin.com
          </a>{" "}
          or call us at +62-21-1234-5678.
        </p>
      </section>

      {/* Terms of Service */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Terms of Service</h2>
        <p className="text-gray-600">
          By using Ticketin, you agree to comply with our terms. We act as a
          platform connecting event organizers and ticket buyers. Organizers are
          responsible for the events, while Ticketin facilitates secure
          ticketing and payments.
        </p>
        <p className="mt-2 text-gray-600">
          Users must not engage in fraudulent activities, ticket scalping, or
          violating applicable laws. Failure to comply may result in account
          suspension.
        </p>
      </section>

      {/* Privacy Policy */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Privacy Policy</h2>
        <p className="text-gray-600">
          Ticketin values your privacy. We collect necessary information such as
          name, email, and payment details to process your ticket purchase
          securely.
        </p>
        <p className="mt-2 text-gray-600">
          We never sell your personal data to third parties. Information may be
          shared only with event organizers and payment providers when required
          to complete your order.
        </p>
      </section>
    </main>
  );
}
