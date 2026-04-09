/**
 * Ivoclar brand i-check-1 (CMS) inside a 1px gradient ring (cyan → lime), white fill.
 * @see https://www.ivoclar.com/cache-buster-1/en_US/CMS/Laski/ZirCAD%20Prime%20Esthetic/i-check-1.svg
 */
const IVOCLAR_ICHECK_SRC =
  'https://www.ivoclar.com/cache-buster-1/en_US/CMS/Laski/ZirCAD%20Prime%20Esthetic/i-check-1.svg';

export default function PillarCheckIcon() {
  return (
    <div
      className="mb-6 h-14 w-14 shrink-0 rounded-full bg-gradient-to-bl from-sky-400 to-lime-500 p-px"
      aria-hidden
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote Ivoclar CMS SVG (brand asset) */}
        <img
          src={IVOCLAR_ICHECK_SRC}
          alt=""
          width={29}
          height={22}
          className="h-[22px] w-auto max-w-[calc(100%-10px)] object-contain"
          decoding="async"
        />
      </div>
    </div>
  );
}
