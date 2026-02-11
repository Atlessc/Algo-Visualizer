
const About = () => {
  return (
    <section className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
      <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">About</p>
      <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
        Built to make algorithm intuition visual.
      </h2>
      <p className="m-0.5 text-slate-600">
        This project focuses on short, interactive demos that show how algorithms transform data
        over time. Use the controls in each card to run and compare approaches quickly.
      </p>
    </section>
  );
}

export default About;
