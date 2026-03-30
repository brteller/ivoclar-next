import Link from 'next/link';

export const metadata = {
  title: 'Thank You',
  description: "Thank you for your message. We'll be in touch soon.",
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Thank You!</h1>
          <p className="text-xl text-gray-700 mb-8">
            We&apos;ve received your message and will get back to you within 24 hours.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-black mb-4 text-center">What happens next?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>A specialist will review your inquiry</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>We&apos;ll reach out to schedule a discovery call</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Discuss how we can scale your visibility</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">72h</div>
              <div className="text-xs text-gray-600">Avg deployment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
              <div className="text-xs text-gray-600">Pages at scale</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">5M+</div>
              <div className="text-xs text-gray-600">Impressions driven</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
