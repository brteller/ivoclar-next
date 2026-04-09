'use client';

const TESTIMONIALS = [
  
  {
    id: 'tiffani',
    name: 'Dr. Tiffani Dunn',
    affiliation: 'Kona Smile Co',
    quote:
      'The Tetric Line gives me confidence in every restoration. From smooth handling to lifelike esthetics and reliable strength, it allows me to achieve beautiful, predictable results efficiently. It’s a material I trust for both everyday dentistry and high-esthetic anterior cases.',
    image: '/images/superhero/tiffany.jpg',
    imagePosition: null,
  },
  {
    id: 'rice',
    name: 'Dr. David Rice',
    affiliation: 'IgniteDDS',
    quote:
      'When a patient needs me to save the day, I reach for the Tetric® Line of composites. My secret weapon for Class I/II posterior bulk restorations. Simple, strong, reliable and esthetic - Tetric®. Oste preperio. Ut volore, tempe nonsequo tectam non raest laborum harit unt faceri ommolestin commos.',
    image: '/images/superhero/rice.jpg',
    imagePosition: null,
  },
  {
    id: 'manuela',
    name: 'Dr. Anthony Mennito',
    affiliation: 'Dental Clinic Porec, Croatia',
    quote:
      "I'm saving the day for my patients by doing great dentistry with Tetric Line. From a flowable that cures really efficiently on the floor of a deep box to dentin shade composite that helps me nail my class IV's, every detail is well thought out. And it's those details that can make all the difference.",
    image: '/images/superhero/mennito.jpg',
    imagePosition: null,
  },
  {
    id: 'luana',
    name: 'Dr. Luana Oliveira-Hass',
    affiliation: 'Dental Clinic Porec, Croatia',
    quote:
      'When a patient needs me to save the day, I reach for the Tetric® Line of composites. Tetric is the bread-and-butter composite in my practice—predictable, efficient, and consistent. The color matching is intuitive and integrates into the natural tooth structure without overthinking shades or layers. Dependable strength and esthetics for everyday posterior cases make Tetric the composite I reach for without hesitation.',
    image: '/images/superhero/luana.jpg',
    imagePosition: null,
  },
  
];

const DEFAULT_IDS = ['ragazzini', 'rice', 'manuela'];

function buildVisibleDoctors(selectedIds = []) {
  const ids = Array.isArray(selectedIds) && selectedIds.length > 0 ? selectedIds : DEFAULT_IDS;
  const byId = Object.fromEntries(TESTIMONIALS.map((doctor) => [doctor.id, doctor]));
  return ids.map((id) => byId[id]).filter(Boolean);
}

export default function SuperheroTestimonialCards({ testimonialIds = DEFAULT_IDS }) {
  const visibleDoctors = buildVisibleDoctors(testimonialIds);
  if (!visibleDoctors.length) return null;

  const gridClassName = visibleDoctors.length === 1
    ? 'grid grid-cols-1 max-w-md mx-auto'
    : 'grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10';

  return (
    <div className={gridClassName}>
      {visibleDoctors.map((doctor) => (
        <article key={doctor.id} className="flex flex-col">
          <div className="flex-1 flex flex-col overflow-hidden border border-[#00a651]">
            <div className="rounded-xl bg-blue-950 flex flex-col h-full overflow-hidden">
              <div className="aspect-[23/24] w-full flex-shrink-0 overflow-hidden bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className={`w-full h-full object-cover ${
                    doctor.imagePosition === 'right' ? 'object-right object-top' : 'object-center object-top'
                  }`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center text-white/50 text-sm p-4 text-center">
                  <span>Photo: {doctor.name}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <blockquote className="text-white/95 text-sm md:text-base leading-relaxed italic flex-1">
                  &quot;{doctor.quote}&quot;
                </blockquote>
                <footer className="mt-4 pt-4 border-t border-white/20">
                  <cite className="not-italic font-bold text-white text-base">{doctor.name}</cite>
                  <div className="text-white/80 text-sm mt-0.5">{doctor.affiliation}</div>
                </footer>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
