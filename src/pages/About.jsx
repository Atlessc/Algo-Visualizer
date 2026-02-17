
const About = () => {
  return (
    <section className="rounded-[18px] border border-(--surface-border) bg-(--card-bg) p-4 shadow-lg sm:p-5">
      <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-(--primary-strong)">About</p>
      <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-(--text-strong)">
        Built to make algorithm intuition visual.
      </h2>
      <p className="m-0.5 text-(--text-soft)">
        This project focuses on short, interactive demos that show how algorithms transform data
        over time. Use the controls in each card to run and compare approaches quickly.
      </p>
    </section>
  );
}

export default About;
