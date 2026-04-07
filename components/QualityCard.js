'use client';

const QUALITY_BULLETS = [
  'More than 730 million restorations placed throughout the world',
  'Based on Tetric EvoCeram, which has enjoyed more than 15 years of clinical success',
  'Easy handling',
  'Minimal susceptibility to fracture due to high flexural strength',
  'Due to their high radiopacity, the materials are clearly visible on X-rays',
];

export default function QualityCard() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="w-14 h-14 rounded-full border-2 border-[#0a478b]/30 bg-[#00a651]/10 flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-[#0a478b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Quality</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {QUALITY_BULLETS.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
