import { useState } from "react";
import { motion } from "motion/react";

const D = {
  fontFamily: "'Big Shoulders Display', 'Arial Narrow', Impact, sans-serif",
};

const M = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const B = {
  fontFamily: "'Inter Tight', system-ui, sans-serif",
};

const EASE = [0.76, 0, 0.24, 1];

const outline = (c = "#E8E6DE", w = 2) => ({
  WebkitTextStroke: `${w}px ${c}`,
  color: "transparent",
});

const Label = ({ children, className = "" }) => (
  <span
    style={M}
    className={`text-[11px] uppercase tracking-[0.2em] ${className}`}
  >
    {children}
  </span>
);

function Reveal({ children, from = "up", delay = 0, className = "" }) {
  const offset = {
    up: { y: 60 },
    left: { x: -90 },
    right: { x: 90 },
  }[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const PROGRAM_OPTIONS = ["Foundation", "Engine", "Force", "Not sure"];

const TRIAL_STEPS = [
  ["01", "We reply within 24 hours."],
  ["02", "Pick a session and a coach."],
  ["03", "Show up. The first session is on us."],
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  program: "",
  message: "",
};

const MAX = 400;

function Field({ n, id, label, error, optional, children }) {
  return (
    <div className="group relative border-b border-[#E8E6DE]/25">
      <div className="flex items-center justify-between pt-5">
        <label
          htmlFor={id}
          style={M}
          className="flex gap-3 text-[11px] uppercase tracking-[0.2em] text-[#777B78] transition-colors duration-100 group-focus-within:text-[#E8E6DE]"
        >
          <span className="text-[#B7FF00]">{n}</span>
          {label}
        </label>

        {error ? (
          <span
            style={M}
            className="bg-[#B7FF00] px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]"
          >
            {error}
          </span>
        ) : optional ? (
          <Label className="text-[#777B78]/70">Optional</Label>
        ) : null}
      </div>

      {children}

      <span className="pointer-events-none absolute bottom-[-1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-[#B7FF00] transition-transform duration-200 group-focus-within:scale-x-100" />
    </div>
  );
}

const inputCls =
  "w-full bg-transparent py-3 text-4xl font-extrabold uppercase leading-none text-[#E8E6DE] outline-none placeholder:text-[#777B78]/50 md:text-5xl";

function ContactForm({
  onSubmit = (data) =>
    new Promise((resolve) => setTimeout(resolve, 900)),
  onClose,
}) {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => {
    setV((state) => ({
      ...state,
      [key]: e.target.value,
    }));

    setErrors((state) => ({
      ...state,
      [key]: undefined,
    }));
  };

  const validate = () => {
    const e = {};

    if (!v.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Valid email";
    if (v.message.trim().length < 10) e.message = "Too short";

    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    setErrors(e);

    if (Object.keys(e).length) return;

    setStatus("sending");

    try {
      await onSubmit(v);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ message: "Failed. Retry" });
    }
  };

  const reset = () => {
    setV(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section className="fixed inset-0 z-[100] overflow-y-auto bg-[#181818] px-6 py-10 md:px-10 md:py-16">
      <button
        type="button"
        onClick={onClose}
        style={M}
        className="fixed right-6 top-6 z-[110] border border-[#E8E6DE]/30 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#E8E6DE] transition-colors duration-100 hover:border-[#B7FF00] hover:text-[#B7FF00]"
      >
        Close ×
      </button>

      <div className="mx-auto grid max-w-[1600px] gap-y-16 md:grid-cols-12 md:gap-x-10">
        <Reveal from="left" className="md:col-span-5">
          <Label className="text-[#B7FF00]">
            Trial session / Free
          </Label>

          <h2
            style={D}
            className="mt-6 font-black uppercase leading-[0.8] text-[#E8E6DE] text-[24vw] md:text-[10vw]"
          >
            Book a
            <br />
            <span style={outline()} className="md:ml-[4vw]">
              trial.
            </span>
          </h2>

          <p
            style={B}
            className="mt-8 max-w-xs text-sm leading-relaxed text-[#777B78]"
          >
            One session. One coach. No payment, no pitch. Tell us what you are
            training for.
          </p>

          <ol className="mt-12 border-t border-[#E8E6DE]/20">
            {TRIAL_STEPS.map(([n, t]) => (
              <li
                key={n}
                className="flex items-baseline gap-4 border-b border-[#E8E6DE]/20 py-3"
              >
                <Label className="text-[#B7FF00]">{n}</Label>
                <span style={B} className="text-sm text-[#E8E6DE]">
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal from="right" className="md:col-span-7">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border-t border-[#B7FF00] pt-8"
            >
              <Label className="text-[#B7FF00]">Message sent</Label>

              <div
                style={D}
                className="mt-4 font-black uppercase leading-[0.8] text-[#E8E6DE] text-[22vw] md:text-[11vw]"
              >
                Received<span className="text-[#B7FF00]">.</span>
              </div>

              <p
                style={B}
                className="mt-6 max-w-sm text-sm leading-relaxed text-[#777B78]"
              >
                We will reply within 24 hours at{" "}
                <span className="text-[#E8E6DE]">{v.email}</span>.
              </p>

              <button
                type="button"
                onClick={reset}
                style={M}
                className="mt-10 border border-[#E8E6DE] px-5 py-3 text-[12px] uppercase tracking-[0.14em] text-[#E8E6DE] transition-colors duration-100 hover:bg-[#E8E6DE] hover:text-[#0A0A0A]"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate>
              <Field
                n="01"
                id="f-name"
                label="Name"
                error={errors.name}
              >
                <input
                  id="f-name"
                  style={D}
                  className={inputCls}
                  value={v.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                />
              </Field>

              <Field
                n="02"
                id="f-email"
                label="Email"
                error={errors.email}
              >
                <input
                  id="f-email"
                  type="email"
                  style={D}
                  className={inputCls}
                  value={v.email}
                  onChange={set("email")}
                  placeholder="you@email.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
              </Field>

              <Field
                n="03"
                id="f-phone"
                label="Phone"
                optional
              >
                <input
                  id="f-phone"
                  type="tel"
                  style={D}
                  className={inputCls}
                  value={v.phone}
                  onChange={set("phone")}
                  placeholder="+254"
                  autoComplete="tel"
                />
              </Field>

              <div className="border-b border-[#E8E6DE]/25 pb-6 pt-5">
                <label
                  style={M}
                  className="flex gap-3 text-[11px] uppercase tracking-[0.2em] text-[#777B78]"
                >
                  <span className="text-[#B7FF00]">04</span>
                  Program
                </label>

                <div
                  role="radiogroup"
                  aria-label="Program"
                  className="mt-4 flex flex-wrap"
                >
                  {PROGRAM_OPTIONS.map((p) => {
                    const on = v.program === p;

                    return (
                      <button
                        key={p}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() =>
                          setV((state) => ({
                            ...state,
                            program: on ? "" : p,
                          }))
                        }
                        style={M}
                        className={`-ml-px -mt-px border px-4 py-3 text-[12px] uppercase tracking-[0.14em] transition-[transform,background-color,color] duration-100 hover:-translate-y-0.5 ${
                          on
                            ? "relative z-10 border-[#B7FF00] bg-[#B7FF00] text-[#0A0A0A]"
                            : "border-[#E8E6DE]/30 text-[#E8E6DE] hover:border-[#E8E6DE]"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field
                n="05"
                id="f-message"
                label="Message"
                error={errors.message}
              >
                <textarea
                  id="f-message"
                  rows={3}
                  maxLength={MAX}
                  style={D}
                  className={`${inputCls} resize-none text-3xl md:text-4xl`}
                  value={v.message}
                  onChange={set("message")}
                  placeholder="What are you training for?"
                  aria-invalid={!!errors.message}
                />

                <div className="pb-3 text-right">
                  <Label className="text-[#777B78]">
                    {String(v.message.length).padStart(3, "0")} / {MAX}
                  </Label>
                </div>
              </Field>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={M}
                  className="group inline-flex items-center gap-8 border border-[#B7FF00] bg-[#B7FF00] px-6 py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-[#0A0A0A] transition-[transform,box-shadow,background-color,color] duration-100 hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#0A0A0A] hover:text-[#B7FF00] hover:shadow-[6px_6px_0_#E8E6DE] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Send message"}

                  <span className="transition-transform duration-100 group-hover:translate-x-2">
                    {status === "sending" ? "…" : "→"}
                  </span>
                </button>

                <Label className="text-[#777B78]">
                  We reply within 24h
                </Label>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default ContactForm;