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
    affiliation: 'The MOD Institute',
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

/** Split hero: portrait frame (tall crop) so less of the subject is cut vs a wide short box */
const SPLIT_PHOTO_ASPECT = 'aspect-[3/5]';
/** Mobile/stacked: cap width; lg fills fixed grid column (see split layout 19rem track) */
const SPLIT_PHOTO_MAX_W_MOBILE = 'max-w-[16rem] sm:max-w-[17.5rem]';

function DoctorPhoto({ doctor, layout }) {
  const isSplit = layout === 'split';
  return (
    <div
      className={
        isSplit
          ? `relative mx-auto w-full overflow-hidden bg-gray-800 ${SPLIT_PHOTO_MAX_W_MOBILE} lg:mx-0 lg:w-full lg:max-w-none ${SPLIT_PHOTO_ASPECT}`
          : 'aspect-[23/24] w-full flex-shrink-0 overflow-hidden bg-gray-800'
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className={
          isSplit
            ? `absolute inset-0 h-full w-full object-cover object-top ${
                doctor.imagePosition === 'right' ? 'object-right' : 'object-center'
              }`
            : `h-full w-full object-cover object-top ${
                doctor.imagePosition === 'right' ? 'object-right object-top' : 'object-center object-top'
              }`
        }
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div
        className={`hidden flex flex-col items-center justify-center p-4 text-center text-sm text-white/50 ${
          isSplit ? 'absolute inset-0 z-10 h-full w-full' : 'h-full w-full'
        }`}
      >
        <span>Photo: {doctor.name}</span>
      </div>
    </div>
  );
}

function DoctorQuoteBody({ doctor, layout }) {
  const isSplit = layout === 'split';
  return (
    <>
      <blockquote
        className={
          isSplit
            ? 'text-white/95 text-lg sm:text-xl lg:text-[1.35rem] lg:leading-[1.65] italic flex-1 max-w-none'
            : 'text-white/95 text-sm md:text-base leading-relaxed italic flex-1'
        }
      >
        &quot;{doctor.quote}&quot;
      </blockquote>
      <footer className={isSplit ? 'mt-6 border-t border-white/20 pt-6' : 'mt-4 border-t border-white/20 pt-4'}>
        <cite className={`not-italic font-bold text-white ${isSplit ? 'text-lg lg:text-xl' : 'text-base'}`}>
          {doctor.name}
        </cite>
        <div className={`mt-0.5 text-white/80 ${isSplit ? 'text-base lg:text-lg' : 'text-sm'}`}>{doctor.affiliation}</div>
      </footer>
    </>
  );
}

export default function SuperheroTestimonialCards({ testimonialIds = DEFAULT_IDS }) {
  const visibleDoctors = buildVisibleDoctors(testimonialIds);
  if (!visibleDoctors.length) return null;

  if (visibleDoctors.length === 1) {
    const doctor = visibleDoctors[0];
    return (
      <div className="w-full">
        <article className="overflow-hidden border border-[#00a651] bg-blue-950 shadow-lg">
          <div className="grid min-h-0 grid-cols-1 items-stretch gap-0 lg:grid-cols-[19rem_1fr] lg:items-center">
            <div className="flex w-full shrink-0 justify-center px-4 pt-6 sm:px-6 sm:pt-8 lg:justify-start lg:pl-0 lg:pr-4 lg:pt-0 xl:pr-5">
              <DoctorPhoto doctor={doctor} layout="split" />
            </div>
            <div className="flex min-h-0 w-full min-w-0 flex-col justify-center p-6 sm:p-8 lg:py-8 lg:pr-6 lg:pl-2 xl:py-10 xl:pr-8 xl:pl-3">
              <DoctorQuoteBody doctor={doctor} layout="split" />
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
      {visibleDoctors.map((doctor) => (
        <article key={doctor.id} className="flex flex-col">
          <div className="flex flex-1 flex-col overflow-hidden border border-[#00a651]">
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-blue-950">
              <DoctorPhoto doctor={doctor} layout="stack" />
              <div className="flex flex-1 flex-col p-5">
                <DoctorQuoteBody doctor={doctor} layout="stack" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
