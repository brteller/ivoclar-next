'use client';

import PillarCheckIcon from './PillarCheckIcon';

const EFFICIENCY_BULLETS = [
  'All the different consistency and shade variants of the Tetric Line can be effectively combined',
  'Short light exposure times',
  'Time savings of up to 51% with the 4-mm composites when the 3s PowerCure product portfolio is used',
];

export default function EfficiencyCard({ bullets = EFFICIENCY_BULLETS }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <PillarCheckIcon />
      <h3 className="text-xl font-bold text-[#0a478b] mb-4">Efficiency</h3>
      <ul className="space-y-2.5 text-gray-600 text-sm leading-relaxed">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-[#00a651] mt-1.5 shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
