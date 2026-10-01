export default function Marquee() {
  return (
    <div className="overflow-hidden bg-[#0A0A0A] py-4">
      <div
        className="flex w-max"
        style={{
          animation: "marquee 15s linear infinite",
        }}
      >
        <span className="mx-6 text-5xl font-black uppercase text-[#E8E6DE]">
          KINETIC • KINETIC • KINETIC • KINETIC • KINETIC • KINETIC •
        </span>

        <span className="mx-6 text-5xl font-black uppercase text-[#E8E6DE]">
          KINETIC • KINETIC • KINETIC • KINETIC • KINETIC • KINETIC •
        </span>
      </div>
    </div>
  );
}