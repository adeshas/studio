"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

const heroImage = "https://placehold.co/900x1200/png";

const accordionSections = [
  {
    title: "Expertise",
    items: [
      { label: "Legal Experience", value: "18 Years" },
      { label: "Specialty", value: "High Conflict, Parenting Issues" },
    ],
  },
  {
    title: "Education",
    items: [
      { label: "University of Windsor, LL.B.", value: "Law Degree" },
      { label: "University of Detroit Mercy, J.D.", value: "Law Degree" },
    ],
  },
  {
    title: "Certifications",
    items: [{ label: "Collaborative Family Law", value: "Certificate" }],
  },
  {
    title: "Associations",
    items: [
      { label: "Toronto Lawyers Association", value: "Member" },
      { label: "Law Society of Ontario", value: "Member" },
    ],
  },
  {
    title: "Reviews",
    items: [],
    review: {
      headline: "Highly Recommend",
      body: `I am very thankful and blessed to be recommended by a friend of mine from USA to Stanchieri Family law. My case was very complicated, I had two previous lawyers from two different law firms who failed miserably to fight my case for 1 year and a half with multiple unsuccessful mediation sessions. I was on a verge of giving up as I felt defeated and completely lost before I was introduced to Stanchieri family law firm;  where I felt confident, stronger and hopeful. Immediately after talking to the receptionist, I felt a sense of peace and instantly I knew I was in good hands. She was very professional, comforting and understanding. After a brief conversation she recommended me a very suitable lawyer for my case who dealt more with custody and mobility rights. That’s when Ms. Rachel Healey and Mr. Robert Milley came on board and took my case very seriously with no time to waste. They tuned my case from impossible to possible, Ms. Healey managed to start and finish my case within 6 months. I couldn’t be happier, I just wish I had known about Stanchieri Family law firm from the beginning, would’ve saved me a lot of money, time and stress. I highly recommend Stanchieri family law firm.`,
      source: "//Google Reviews",
    },
  },
];

const otherProfiles = [
  {
    name: "Julie Stanchieri",
    title: "Partner",
    experience: "23 Years Experience",
    href: "#",
    image: "https://placehold.co/740x940/png",
  },
  {
    name: "Andrew Vankoughnett",
    title: "Lawyer",
    experience: "10 Years Experience",
    href: "#",
    image: "https://placehold.co/740x940/png",
  },
];

export default function ProfileTestPage() {
  const [showFullBio, setShowFullBio] = useState(false);
  const [openSections, setOpenSections] = useState(() => new Set([accordionSections[0].title]));

  const bioIntro =
    "I completed both my American and Canadian law degrees in 2006 and have practised in family law, almost exclusively, since my call to the bar in 2007. I feel humbled and fortunate every day to be trusted by individuals to assist them in the most personal transitions shaping their family’s futures.";

  const bioFull =
    "I spent a large part of my life on the East Coast of Canada and that is where I learned the importance of treating people as people, not files. Specifically, I learned to treat people with honesty, integrity, and fairness. I also pride myself on being approachable. Given the personal nature of topics that family law deals with, it is important to me that my clients feel that they can be completely honest with me so that they can decide, fully informed, how they wish to proceed. I pride myself on being a tireless advocate for my client’s interests. I especially enjoy helping families through high conflict parenting matters, including those dealing with mental health and addiction issues. My goal in all matters is to bring calm and stability to what can be a stressful and chaotic period. Sometimes court is the only avenue in which to advance files. Mediation, collaborative law, and negotiation all require the cooperation of both parties to be successful. In many family law cases, that doesn’t exist. In those instances, you need an advocate who is not only not afraid but can effectively advance a case through the Court system. I have advocated at all levels of Court in Ontario, including the Court of Appeal, and utilize arbitration when possible. If you would like to discuss options appropriate for your situation, I would be happy to discuss your circumstances in a confidential consultation.";

  const toggleFullBio = useCallback(() => {
    setShowFullBio((prev) => !prev);
  }, []);

  const toggleSection = useCallback((title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }, []);

  const handleScrollToBio = useCallback(() => {
    const section = document.querySelector("#profile-bio");
    section?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const showMoreLabel = useMemo(
    () => (showFullBio ? "Show Less" : "Show More"),
    [showFullBio]
  );

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero__glow" />
        <div className="profile-hero__image">
          <img src={heroImage} alt="Rachel Healey" />
        </div>
        <div className="shell">
          <div className="profile-hero__content">
            <div className="profile-hero__title" data-animate>
              <h1>Rachel Healey</h1>
              <h6>Partner</h6>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn-scroll"
          onClick={handleScrollToBio}
          aria-label="Scroll to bio section"
        >
          <span className="btn-scroll__icon" />
        </button>
      </section>

      <section id="profile-bio" className="profile-section profile-section--border" data-animate>
        <div className="shell">
          <div className="section-head">
            <h3>Bio</h3>
          </div>
          <div className="section-intro">
            <p>{bioIntro}</p>
          </div>
          <div className={`section-full ${showFullBio ? "is-open" : ""}`}>
            <p>{bioFull}</p>
          </div>
          <div className="section-actions">
            <button type="button" className="btn btn--outline" onClick={toggleFullBio}>
              {showMoreLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="profile-section profile-section--border" data-animate>
        <div className="shell">
          <div className="section-head">
            <h3>Credentials</h3>
          </div>
          <div className="accordion">
            {accordionSections.map((section) => {
              const isOpen = openSections.has(section.title);
              return (
                <div className={`accordion__section ${isOpen ? "is-open" : ""}`} key={section.title}>
                  <button
                    type="button"
                    className="accordion__head"
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={isOpen}
                  >
                    <span className="accordion__icon" aria-hidden />
                    <h5>{section.title}</h5>
                  </button>
                  <div className="accordion__body" aria-hidden={!isOpen}>
                    {section.items.length > 0 && (
                      <ul className="accordion__list">
                        {section.items.map((item) => (
                          <li key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.review && (
                      <div className="accordion__review">
                        <div className="accordion__review-inner">
                          <h6>{section.review.headline}</h6>
                          <p>{section.review.body}</p>
                          <p className="accordion__review-source">{section.review.source}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="profile-section profile-section--border profile-section--center" data-animate>
        <div className="shell">
          <div className="section-head">
            <h3>Meet the Others</h3>
          </div>
          <div className="cards">
            {otherProfiles.map((card) => (
              <div className="card" key={card.name}>
                <div className="card__inner">
                  <div className="card__image">
                    <img src={card.image} alt={card.name} />
                  </div>
                  <div className="card__head">
                    <h5>{card.name}</h5>
                    <p>{card.title}</p>
                  </div>
                  <div className="card__entry">
                    <p>{card.experience}</p>
                  </div>
                  <div className="card__actions">
                    <Link href={card.href} className="btn">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-actions">
            <button type="button" className="btn btn--outline">
              Show More
            </button>
          </div>
        </div>
      </section>

      <section className="profile-cta" data-animate>
        <div className="shell">
          <div className="profile-cta__inner">
            <h4>Need Legal Advice?</h4>
            <Link href="#" className="btn">
              Book consultation
            </Link>
          </div>
        </div>
      </section>

      <footer className="profile-footer">
        <div className="shell">
          <div className="profile-footer__inner">
            <nav className="footer-nav">
              <Link href="#">Services</Link>
              <Link href="#">Team</Link>
            </nav>
            <div className="profile-footer__logo">Stanchieri Family Law</div>
            <nav className="footer-nav">
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
            </nav>
          </div>
          <div className="profile-footer__bar">
            <Link href="#">Legal Disclaimer</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .profile-page {
          color: #f3f3f9;
          background: #030104;
          font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
          min-height: 100vh;
        }

        .shell {
          width: min(1120px, 92vw);
          margin: 0 auto;
        }

        .profile-hero {
          position: relative;
          min-height: clamp(420px, 60vw, 680px);
          display: flex;
          align-items: flex-end;
          padding: clamp(3rem, 5vw, 6rem) 0 clamp(6rem, 8vw, 9rem);
          background: radial-gradient(
            120% 120% at 72% 10%,
            rgba(107, 85, 215, 0.55),
            rgba(33, 18, 66, 0.95) 45%,
            rgba(7, 4, 17, 0.98) 70%,
            #05010b 100%
          );
          overflow: hidden;
        }

        .profile-hero__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            110% 110% at 80% 30%,
            rgba(220, 152, 255, 0.32),
            rgba(20, 12, 36, 0.2) 45%,
            transparent 70%
          );
          filter: blur(4px);
          pointer-events: none;
        }

        .profile-hero__image {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-right: clamp(2rem, 8vw, 6rem);
          pointer-events: none;
        }

        .profile-hero__image img {
          width: clamp(280px, 40vw, 480px);
          height: auto;
          object-fit: cover;
          filter: saturate(110%);
          mix-blend-mode: lighten;
          mask-image: radial-gradient(circle at 70% 30%, black 60%, transparent 92%);
          -webkit-mask-image: radial-gradient(circle at 70% 30%, black 60%, transparent 92%);
          opacity: 0;
          transform: translate3d(0, 40px, 0) scale(1.04);
          animation: fadeUp 1.1s ease forwards 0.15s;
        }

        .profile-hero__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-left: clamp(1.5rem, 6vw, 4rem);
        }

        .profile-hero__title h1 {
          font-size: clamp(2.75rem, 6vw, 4.75rem);
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.04em;
          text-transform: capitalize;
        }

        .profile-hero__title h6 {
          margin: 0.5rem 0 0;
          font-size: clamp(0.95rem, 2.4vw, 1.2rem);
          text-transform: uppercase;
          letter-spacing: 0.36em;
          color: rgba(255, 255, 255, 0.68);
        }

        .btn-scroll {
          position: absolute;
          left: 50%;
          bottom: clamp(2rem, 4vw, 3.5rem);
          transform: translateX(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(2, 2, 6, 0.75);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.4s ease, border-color 0.3s ease;
          z-index: 3;
        }

        .btn-scroll:hover {
          transform: translate(-50%, -6px);
          border-color: rgba(255, 255, 255, 0.55);
        }

        .btn-scroll__icon {
          width: 14px;
          height: 14px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(45deg);
          animation: float 1.6s ease-in-out infinite;
        }

        .profile-section {
          position: relative;
          padding: clamp(4rem, 6vw, 5.5rem) 0;
          background: rgba(9, 6, 16, 0.8);
        }

        .profile-section:nth-of-type(even) {
          background: rgba(6, 4, 12, 0.92);
        }

        .profile-section--border::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
          transform: scaleX(0.92);
        }

        .profile-section--center {
          text-align: center;
        }

        .section-head h3 {
          text-transform: uppercase;
          letter-spacing: 0.42em;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 1.5rem;
        }

        .section-intro p,
        .section-full p {
          line-height: 1.65;
          color: rgba(242, 241, 246, 0.86);
          font-size: 1.05rem;
        }

        .section-full {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease;
          opacity: 0;
        }

        .section-full.is-open {
          max-height: 520px;
          opacity: 1;
          margin-top: 1.25rem;
        }

        .section-actions {
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 2.6rem;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(138, 96, 255, 0.85), rgba(217, 169, 255, 0.65));
          color: #111;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
          border: none;
          cursor: pointer;
        }

        .btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(97, 71, 188, 0.45);
        }

        .btn--outline {
          background: transparent;
          color: #f3f3f9;
          border: 1px solid rgba(255, 255, 255, 0.24);
        }

        .btn--outline:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        .accordion {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .accordion__section {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(6, 5, 15, 0.7);
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .accordion__section.is-open {
          border-color: rgba(176, 152, 255, 0.5);
          box-shadow: 0 18px 40px rgba(78, 56, 150, 0.35);
        }

        .accordion__head {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1.35rem 1.6rem;
          cursor: pointer;
          position: relative;
        }

        .accordion__head h5 {
          text-transform: uppercase;
          letter-spacing: 0.32em;
          font-size: 0.92rem;
          margin: 0;
        }

        .accordion__icon {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-right: 1.1rem;
        }

        .accordion__icon::before,
        .accordion__icon::after {
          content: "";
          position: absolute;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease;
        }

        .accordion__icon::before {
          width: 16px;
          height: 2px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .accordion__icon::after {
          width: 2px;
          height: 16px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .accordion__section.is-open .accordion__icon::after {
          transform: translate(-50%, -50%) scaleY(0);
        }

        .accordion__body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.7s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease;
          opacity: 0;
        }

        .accordion__section.is-open .accordion__body {
          max-height: 480px;
          opacity: 1;
        }

        .accordion__list {
          list-style: none;
          margin: 0;
          padding: 0 1.6rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .accordion__list li {
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.82rem;
          color: rgba(240, 239, 246, 0.7);
        }

        .accordion__list strong {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .accordion__review {
          padding: 0 1.6rem 1.6rem;
        }

        .accordion__review-inner {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          padding-top: 1.2rem;
        }

        .accordion__review-inner h6 {
          margin: 0 0 0.75rem;
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.32em;
        }

        .accordion__review-inner p {
          margin: 0 0 0.75rem;
          line-height: 1.6;
          color: rgba(237, 234, 248, 0.82);
        }

        .accordion__review-source {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.42);
        }

        .cards {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          margin-top: 2.5rem;
        }

        .card__inner {
          background: rgba(14, 10, 22, 0.8);
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 2rem;
          position: relative;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .card__inner::before {
          content: "";
          position: absolute;
          inset: -40% -40% auto;
          height: 80%;
          background: radial-gradient(circle at 50% 50%, rgba(178, 121, 255, 0.4), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover .card__inner {
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(61, 45, 110, 0.45);
        }

        .card:hover .card__inner::before {
          opacity: 1;
        }

        .card__image img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
          mix-blend-mode: screen;
        }

        .card__head {
          padding: 1.5rem 1.75rem 0.5rem;
        }

        .card__head h5 {
          margin: 0;
          font-size: 1.25rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .card__head p {
          margin: 0.75rem 0 0;
          font-size: 0.85rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }

        .card__entry {
          padding: 0 1.75rem;
          font-size: 0.92rem;
          color: rgba(232, 228, 242, 0.78);
        }

        .card__actions {
          padding: 1.75rem 1.75rem 0;
        }

        .profile-cta {
          padding: clamp(4rem, 7vw, 6rem) 0;
          background: radial-gradient(
              120% 120% at 50% 0%,
              rgba(153, 105, 255, 0.35),
              transparent 60%
            ),
            rgba(7, 5, 15, 0.95);
        }

        .profile-cta__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }

        .profile-cta__inner h4 {
          margin: 0;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .profile-footer {
          background: rgba(4, 2, 8, 0.95);
          padding: 3rem 0 2rem;
        }

        .profile-footer__inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-nav {
          display: flex;
          gap: 1.25rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        .footer-nav a {
          color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-nav a:hover {
          color: rgba(255, 255, 255, 0.95);
        }

        .profile-footer__logo {
          font-size: 0.85rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        .profile-footer__bar {
          text-align: center;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.68rem;
        }

        .profile-footer__bar a {
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
        }

        [data-animate] {
          opacity: 0;
          transform: translate3d(0, 35px, 0);
          animation: fadeUp 0.9s ease forwards;
        }

        [data-animate]:nth-of-type(2) {
          animation-delay: 0.2s;
        }

        [data-animate]:nth-of-type(3) {
          animation-delay: 0.32s;
        }

        [data-animate]:nth-of-type(4) {
          animation-delay: 0.44s;
        }

        [data-animate]:nth-of-type(5) {
          animation-delay: 0.56s;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(4px);
          }
        }

        @media (max-width: 768px) {
          .profile-hero {
            min-height: 540px;
            align-items: flex-end;
            padding: 3.5rem 0 8rem;
          }

          .profile-hero__image {
            justify-content: center;
            padding-right: 0;
          }

          .profile-hero__image img {
            width: clamp(240px, 60vw, 420px);
            mask-image: radial-gradient(circle at 50% 30%, black 58%, transparent 94%);
            -webkit-mask-image: radial-gradient(circle at 50% 30%, black 58%, transparent 94%);
          }

          .profile-hero__content {
            padding: 0 clamp(1.25rem, 6vw, 2rem);
          }

          .section-actions {
            justify-content: flex-start;
          }

          .profile-footer__inner {
            flex-direction: column;
            align-items: center;
          }

          .footer-nav {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
