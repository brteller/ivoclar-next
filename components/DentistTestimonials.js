'use client';

const DENTIST_TESTIMONIALS = [
  {
    name: 'Dr med. dent. Manuela Brajkovic-Dekovic',
    affiliation: 'Dental Clinic Porec, Croatia',
    quote:
      "Tetric Prime has a creamy consistency, yet it is stable and very easy to adapt. I'm looking forward to using it in my practice.",
    image:
      'https://www.ivoclar.com/cache-buster-1/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/32964/image-thumb__32964__cms_image_banner__100/Jevremovic_SW.53088855.jpg',
  },
  {
    name: 'Dr Nicola Ragazzini',
    affiliation: 'Bologna, Italy',
    quote:
      'Fast-curing materials such as Tetric PowerFill and Tetric PowerFlow, which can be applied in layers of up to 4 mm, enable us to improve the patient experience in our dental practice. Simultaneously, we can optimize chairside time, as the dental bonding and layering procedure in the posterior area is less time consuming.',
    image:
      'https://www.ivoclar.com/cache-buster-1/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/33032/image-thumb__33032__cms_image_banner__100/Ragazzini_SW.59aa5c5d.jpg',
  },
];

export default function DentistTestimonials() {
  return (
    <section className="py-24 px-4 md:px-6 bg-white" aria-label="Testimonials from dentists">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-16 tracking-tight text-center">
          What dentists say about Tetric
        </h2>
        <div className="space-y-24 md:space-y-28">
          {DENTIST_TESTIMONIALS.map((testimonial, index) => (
            <article
              key={index}
              className={`grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              <div
                className={`flex justify-center md:justify-start ${
                  index % 2 === 1 ? 'md:col-start-2 md:justify-end' : ''
                }`}
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 ring-4 ring-[#0a478b]/20 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`w-full h-full object-cover object-top ${
                      testimonial.imagePosition === 'right' ? 'object-right' : 'object-center'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center text-gray-400 text-xs p-3 text-center">
                    <span>Photo</span>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col justify-center text-center md:text-left ${
                  index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''
                }`}
              >
                <blockquote className="text-[#0a478b]">
                  <p className="text-lg md:text-xl leading-relaxed mb-5 font-normal">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer>
                    <cite className="not-italic font-bold text-[#0a478b] text-lg md:text-xl block">
                      {testimonial.name}
                    </cite>
                    <span className="text-[#0a478b]/80 text-sm md:text-base mt-0.5 block">
                      {testimonial.affiliation}
                    </span>
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
