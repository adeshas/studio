'use client';

import Image from 'next/image';
import {useState} from 'react';
import styles from './profile.module.css';

const accolades = [
  {
    title: 'Education',
    items: [
      'J.D., Osgoode Hall Law School',
      'B.A., Political Science, McGill University',
      'Certified Specialist in Family Law',
    ],
  },
  {
    title: 'Bar Admissions',
    items: ['Law Society of Ontario', 'Ontario Superior Court of Justice', 'Ontario Court of Appeal'],
  },
  {
    title: 'Memberships & Affiliations',
    items: [
      "Advocates' Society",
      'Ontario Bar Association – Family Law Section',
      'International Academy of Family Lawyers',
      'Association of Family and Conciliation Courts',
    ],
  },
  {
    title: 'Representative Work',
    items: [
      'Successfully represented high net-worth clients in complex equalization disputes.',
      'Negotiated multi-jurisdictional parenting arrangements with creative dispute resolution models.',
      'Counsel to business owners navigating corporate valuations within family law matters.',
    ],
  },
];

function Accordion({title, items, defaultOpen = false}: {title: string; items: string[]; defaultOpen?: boolean}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionToggle}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <svg className={open ? styles.iconOpen : styles.icon} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 5v14m-7-7h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={panelId} className={open ? styles.accordionBodyOpen : styles.accordionBody} role="region" aria-hidden={!open}>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProfileTestPage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.gradient}></div>
        <div className={styles.heroInner}>
          <div className={styles.meta}>
            <p className={styles.breadcrumb}>Our Team / Partner</p>
            <h1 className={styles.title}>Rachel Healey</h1>
            <p className={styles.subtitle}>Partner &amp; Family Law Advocate</p>
            <div className={styles.contactRow}>
              <a className={styles.primaryButton} href="mailto:rachel.healey@example.com">
                Email Rachel
              </a>
              <a className={styles.secondaryButton} href="tel:+14160000000">
                416.000.0000
              </a>
            </div>
            <div className={styles.quickFacts}>
              <div>
                <span className={styles.factLabel}>Location</span>
                <span className={styles.factValue}>Toronto, Ontario</span>
              </div>
              <div>
                <span className={styles.factLabel}>Practice Focus</span>
                <span className={styles.factValue}>Family Law, Mediation, Parenting Coordination</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <div className={styles.imageHalo}></div>
            <div className={styles.imageMask}>
              <Image src="https://placehold.co/600x900/png" alt="Rachel Healey" width={600} height={900} priority />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.intro}>
          <h2>Advocacy with empathy, strategy with resolve.</h2>
          <p>
            Rachel partners with clients through every phase of complex family law matters with a focus on
            strategic planning, collaborative problem solving, and dignified advocacy. She is known for managing
            high-conflict matters that require discretion, financial literacy, and a calm, compassionate voice.
          </p>
          <p>
            Whether navigating parenting disputes, business valuations, or cross-border relocation cases, Rachel
            approaches each file with meticulous preparation and a tireless commitment to achieving practical
            solutions. She leverages a broad network of multidisciplinary professionals to ensure that clients feel
            supported beyond the legal process.
          </p>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3>Key Highlights</h3>
            <ul>
              <li>Trusted advisor to entrepreneurs and executives in high-stakes separation matters.</li>
              <li>Regular speaker on alternative dispute resolution and trauma-informed advocacy.</li>
              <li>Certified mediator with a focus on child-centric parenting plans.</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3>Notable Recognition</h3>
            <ul>
              <li>Best Lawyers in Canada – Family Law (2021-2024)</li>
              <li>Lexpert Rising Star – Leading Lawyer Under 40</li>
              <li>Ontario Bar Association Volunteer Service Award</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className={styles.details}>
        <div className={styles.accordionGrid}>
          {accolades.map((section, index) => (
            <Accordion key={section.title} title={section.title} items={section.items} defaultOpen={index === 0} />
          ))}
        </div>
        <div className={styles.quoteBlock}>
          <blockquote>
            “My role is to restore clarity when emotions run high. Clients deserve an advocate who protects what
            matters most while creating space for healing and forward momentum.”
          </blockquote>
          <span className={styles.quoteAttribution}>— Rachel Healey</span>
        </div>
      </section>
    </div>
  );
}
