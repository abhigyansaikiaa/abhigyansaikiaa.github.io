"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Tell us a bit more (min 10 chars)"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = ["BRAND", "WEB", "MOTION", "ALL OF THE ABOVE"] as const;

const RED = "oklch(59.71% 0.23 23.86)";
const RED_RGBA = "rgba(201, 58, 42,";

const WORDS = [
  { text: "YOUR", accent: false },
  { text: "VISION.", accent: true },
  { text: "OUR", accent: false },
  { text: "CRAFT.", accent: true },
];

const SUCCESS_WORDS = [
  { text: "TRANS-", accent: false },
  { text: "MISSION", accent: true },
  { text: "SENT.", accent: false },
];

const CORNERS = [
  { id: "tl", top: 24, left: 24 },
  { id: "tr", top: 24, right: 24 },
  { id: "bl", bottom: 24, left: 24 },
  { id: "br", bottom: 24, right: 24 },
] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollabModal({ isOpen, onClose }: Props) {
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Escape key + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset state after close animation
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setIsSuccess(false);
        setSubmitError(false);
        reset();
        setSelectedType("");
        setIsSubmitting(false);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/collab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, projectType: selectedType }),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const borderBottom = (field: string) =>
    `1px solid ${focusedField === field ? RED : "rgba(255,255,255,0.13)"}`;

  const baseInput: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    outline: "none",
    paddingBottom: "12px",
    paddingTop: "4px",
    fontFamily: "var(--font-poppins)",
    fontSize: "clamp(15px, 1.6vw, 19px)",
    color: "white",
    caretColor: RED,
    transition: "border-color 0.3s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-poppins)",
    fontSize: "9px",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.28)",
    marginBottom: "10px",
  };

  const errorStyle: React.CSSProperties = {
    color: RED,
    fontSize: "10px",
    marginTop: "6px",
    fontFamily: "var(--font-poppins)",
    letterSpacing: "0.1em",
  };

  return (
    <>
      {/* Scoped styles for placeholder + scrollbar */}
      <style>{`
        .collab-input::placeholder {
          color: rgba(255,255,255,0.16);
          font-size: 13px;
          letter-spacing: 0.04em;
        }
        .collab-input::-webkit-scrollbar { display: none; }
        .collab-input { scrollbar-width: none; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-200"
            style={{ background: "#080808" }}
            aria-modal="true"
            role="dialog"
            aria-label="Collaboration form"
          >
            {/* Grain */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px",
              }}
            />

            {/* Corner brackets */}
            {CORNERS.map((c, i) => (
              <motion.div
                key={c.id}
                aria-hidden="true"
                className="absolute w-9 h-9 z-10 pointer-events-none"
                style={{
                  ...("top" in c ? { top: (c as { top: number }).top } : {}),
                  ...("bottom" in c
                    ? { bottom: (c as { bottom: number }).bottom }
                    : {}),
                  ...("left" in c
                    ? { left: (c as { left: number }).left }
                    : {}),
                  ...("right" in c
                    ? { right: (c as { right: number }).right }
                    : {}),
                  borderTop: c.id.includes("t")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderBottom: c.id.includes("b")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderLeft: c.id.includes("l")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                  borderRight: c.id.includes("r")
                    ? `1px solid ${RED_RGBA} 0.45)`
                    : "none",
                }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + i * 0.06,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}

            {/* Scrollable wrapper */}
            <div className="relative z-10 h-full overflow-y-auto flex flex-col">
              {/* ── HEADER ── */}
              <motion.header
                className="flex items-center justify-between px-8 md:px-16 pt-8 pb-5 shrink-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.5 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: RED,
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ YOUR NAME
                </span>

                <motion.button
                  onClick={onClose}
                  className="flex items-center gap-3 cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0 }}
                  aria-label="Close collaboration form"
                  whileHover="hov"
                >
                  <motion.span
                    variants={{ hov: { color: "rgba(255,255,255,0.6)" } }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontSize: "10px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      transition: "color 0.2s",
                    }}
                  >
                    CLOSE
                  </motion.span>
                  <motion.span
                    variants={{ hov: { rotate: 90, color: RED } }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "18px",
                      display: "block",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </motion.span>
                </motion.button>
              </motion.header>

              {/* Thin top rule */}
              <motion.div
                className="mx-8 md:mx-16 shrink-0"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.52,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
              />

              {/* ── BODY ── */}
              <div className="flex-1 flex flex-col lg:flex-row px-8 md:px-16 py-10 lg:py-0 gap-10 lg:gap-0 min-h-0">
                {/* ── LEFT — Typography ── */}
                <div className="lg:w-[40%] flex flex-col justify-center lg:py-16 lg:pr-14">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.66, duration: 0.5 }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      color: RED,
                      fontSize: "9px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      marginBottom: "28px",
                    }}
                  >
                    ✦ INITIATE COLLABORATION
                  </motion.p>

                  {/* Stacked giant words */}
                  <div aria-hidden="true">
                    {WORDS.map(({ text, accent }, i) => (
                      <div key={text} style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: "112%" }}
                          animate={{ y: "0%" }}
                          transition={{
                            delay: 0.62 + i * 0.095,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            fontFamily: "var(--font-poppins)",
                            fontSize: "clamp(50px, 7.5vw, 104px)",
                            lineHeight: 0.87,
                            color: accent ? RED : "white",
                            fontWeight: "normal",
                            paddingBottom: "2px",
                          }}
                        >
                          {text}
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.04, duration: 0.8 }}
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontSize: "11px",
                      lineHeight: "1.8",
                      color: "rgba(255,255,255,0.28)",
                      marginTop: "30px",
                      maxWidth: "260px",
                    }}
                  >
                    We craft digital experiences that demand attention.
                    Let&apos;s build something worth remembering.
                  </motion.p>

                  {/* Red gradient line */}
                  <motion.div
                    aria-hidden="true"
                    style={{
                      height: "1px",
                      background: `linear-gradient(to right, ${RED}, transparent)`,
                      marginTop: "18px",
                      maxWidth: "260px",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 1.14,
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>

                {/* Vertical divider — desktop */}
                <motion.div
                  aria-hidden="true"
                  className="hidden lg:block w-px self-stretch shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    transformOrigin: "top",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    delay: 0.52,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {/* ── RIGHT — Form / Success ── */}
                <div className="lg:w-[60%] flex flex-col justify-center lg:py-16 lg:pl-14">
                  <AnimatePresence mode="wait">
                    {/* ── FORM ── */}
                    {!isSuccess && (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35 }}
                        noValidate
                      >
                        {/* ── NAME ── */}
                        <motion.div
                          className="mb-7"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.76,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label htmlFor="collab-name" style={labelStyle}>
                            NAME <span style={{ color: RED }}>*</span>
                          </label>
                          <input
                            id="collab-name"
                            {...register("name")}
                            placeholder="Your name"
                            autoComplete="name"
                            className="collab-input"
                            style={{
                              ...baseInput,
                              borderBottom: borderBottom("name"),
                            }}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                          />
                          {errors.name && (
                            <p style={errorStyle} role="alert">
                              ↳ {errors.name.message}
                            </p>
                          )}
                        </motion.div>

                        {/* ── EMAIL ── */}
                        <motion.div
                          className="mb-7"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.84,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label htmlFor="collab-email" style={labelStyle}>
                            EMAIL <span style={{ color: RED }}>*</span>
                          </label>
                          <input
                            id="collab-email"
                            {...register("email")}
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            className="collab-input"
                            style={{
                              ...baseInput,
                              borderBottom: borderBottom("email"),
                            }}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                          />
                          {errors.email && (
                            <p style={errorStyle} role="alert">
                              ↳ {errors.email.message}
                            </p>
                          )}
                        </motion.div>

                        {/* ── PROJECT TYPE ── */}
                        <motion.div
                          className="mb-7"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.92,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label style={labelStyle}>PROJECT TYPE</label>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                            role="group"
                            aria-label="Select project type"
                          >
                            {PROJECT_TYPES.map((type) => {
                              const active = selectedType === type;
                              return (
                                <motion.button
                                  key={type}
                                  type="button"
                                  onClick={() =>
                                    setSelectedType(active ? "" : type)
                                  }
                                  whileTap={{ scale: 0.94 }}
                                  aria-pressed={active}
                                  style={{
                                    fontFamily: "var(--font-poppins)",
                                    fontSize: "9px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    padding: "9px 15px",
                                    border: `1px solid ${active ? RED : "rgba(255,255,255,0.16)"}`,
                                    background: active
                                      ? `oklch(59.71% 0.23 23.86 / 0.12)`
                                      : "transparent",
                                    color: active
                                      ? RED
                                      : "rgba(255,255,255,0.4)",
                                    cursor: "pointer",
                                    transition: "all 0.22s ease",
                                  }}
                                >
                                  {type}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>

                        {/* ── MESSAGE ── */}
                        <motion.div
                          className="mb-9"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 1.0,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <label htmlFor="collab-message" style={labelStyle}>
                            MESSAGE <span style={{ color: RED }}>*</span>
                          </label>
                          <textarea
                            id="collab-message"
                            {...register("message")}
                            rows={3}
                            placeholder="Tell us about your project..."
                            className="collab-input"
                            style={{
                              ...baseInput,
                              resize: "none",
                              display: "block",
                              lineHeight: "1.65",
                              borderBottom: borderBottom("message"),
                            }}
                            onFocus={() => setFocusedField("message")}
                            onBlur={() => setFocusedField(null)}
                          />
                          {errors.message && (
                            <p style={errorStyle} role="alert">
                              ↳ {errors.message.message}
                            </p>
                          )}
                        </motion.div>

                        {/* Submit error */}
                        {submitError && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ ...errorStyle, marginBottom: "12px" }}
                            role="alert"
                          >
                            ↳ Something went wrong. Please try again.
                          </motion.p>
                        )}

                        {/* ── TRANSMIT BUTTON ── */}
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 1.08,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative overflow-hidden w-full"
                            style={{
                              border: `1px solid ${RED}`,
                              padding: "22px 28px",
                              background: "transparent",
                              cursor: isSubmitting ? "wait" : "pointer",
                            }}
                            initial="rest"
                            whileHover={!isSubmitting ? "hov" : undefined}
                          >
                            {/* Red fill sweep */}
                            <motion.div
                              aria-hidden="true"
                              variants={{
                                rest: { scaleX: 0 },
                                hov: {
                                  scaleX: 1,
                                  transition: {
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                },
                              }}
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundColor: RED,
                                transformOrigin: "left",
                              }}
                            />
                            {/* Shine line at top */}
                            <motion.div
                              aria-hidden="true"
                              variants={{
                                rest: { scaleX: 0 },
                                hov: {
                                  scaleX: 1,
                                  transition: {
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                },
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "1px",
                                background: "rgba(255,255,255,0.3)",
                                transformOrigin: "left",
                              }}
                            />
                            <span
                              style={{
                                position: "relative",
                                zIndex: 1,
                                fontFamily: "var(--font-poppins)",
                                fontSize: "10px",
                                letterSpacing: "0.38em",
                                textTransform: "uppercase",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px",
                              }}
                            >
                              {isSubmitting ? (
                                <>
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }}
                                    style={{
                                      display: "inline-block",
                                      fontSize: "11px",
                                    }}
                                  >
                                    ◌
                                  </motion.span>
                                  TRANSMITTING
                                </>
                              ) : (
                                "TRANSMIT →"
                              )}
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    )}

                    {/* ── SUCCESS STATE ── */}
                    {isSuccess && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col"
                      >
                        {SUCCESS_WORDS.map(({ text, accent }, i) => (
                          <div key={text} style={{ overflow: "hidden" }}>
                            <motion.div
                              initial={{ y: "110%" }}
                              animate={{ y: "0%" }}
                              transition={{
                                delay: i * 0.085,
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                fontFamily: "var(--font-poppins)",
                                fontSize: "clamp(42px, 5.5vw, 76px)",
                                lineHeight: 0.88,
                                color: accent ? RED : "white",
                                fontWeight: "normal",
                                marginBottom: "2px",
                              }}
                            >
                              {text}
                            </motion.div>
                          </div>
                        ))}

                        {/* Animated red rule */}
                        <motion.div
                          aria-hidden="true"
                          style={{
                            height: "1px",
                            background: `linear-gradient(to right, ${RED}, transparent)`,
                            marginTop: "28px",
                            marginBottom: "24px",
                            transformOrigin: "left",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 0.35,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />

                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          style={{
                            fontFamily: "var(--font-poppins)",
                            fontSize: "12px",
                            lineHeight: "1.85",
                            color: "rgba(255,255,255,0.32)",
                            marginBottom: "32px",
                          }}
                        >
                          We&apos;ve received your transmission.
                          <br />
                          Expect a reply within 24–48 hours.
                        </motion.p>

                        <motion.button
                          onClick={onClose}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                          whileHover={{ x: -5 }}
                          style={{
                            fontFamily: "var(--font-poppins)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: RED,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            textAlign: "left",
                            width: "fit-content",
                          }}
                        >
                          ← RETURN TO SITE
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
