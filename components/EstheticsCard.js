'use client';

const ESTHETICS_BULLETS = [
  'Esthetic results in both anterior and posterior teeth',
  'Natural-looking restorations in anterior teeth with Tetric Prime and Tetric EvoFlow',
  'True-to-nature esthetics in the posterior region with Tetric PowerFill and Tetric PowerFlow',
];

export default function EstheticsCard() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="w-14 h-14 rounded-full border-2 border-[#0a478b]/30 bg-[#00a651]/10 flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-[#0a478b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Esthetics</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {ESTHETICS_BULLETS.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
