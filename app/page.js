"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ICONS = {
  logoDesktop: "https://www.figma.com/api/mcp/asset/46375ff1-bb16-4208-9325-d2e99f08ea52",
  logoMobile: "https://www.figma.com/api/mcp/asset/bfa8013e-f2d8-4a4b-8f9f-63a9057c5ed1",
  search: "https://www.figma.com/api/mcp/asset/3a559dd8-5dee-40c3-9f33-5ff4c3faa033",
  bag: "https://www.figma.com/api/mcp/asset/54c8022b-211c-4901-9848-403bacabf602",
  account: "https://www.figma.com/api/mcp/asset/47434cef-d394-4db6-8323-152f8b6854a8",
  menu: "https://www.figma.com/api/mcp/asset/f1284af7-8258-4e49-adeb-f70f42134bfe",
};

const FALLBACKS = {
  logo: "/fallback/logo.svg",
  search: "/fallback/icon-search.svg",
  bag: "/fallback/icon-bag.svg",
  account: "/fallback/icon-account.svg",
  card: "/fallback/card.svg",
  hero: "/fallback/hero-sales.svg",
};

const DESKTOP_NAV_ITEMS = [
  { key: "sales", label: "Sales & Offers", hasPanel: true },
  {
    key: "vacuum",
    label: "Vacuum Cleaner",
    hasPanel: true,
  },
  { key: "accessories", label: "Accessories" },
  { key: "about", label: "About Eureka" },
  { key: "support", label: "Support" },
  {
    key: "bestfits",
    label: "Best Fits Your Home",
    hasPanel: true,
  },
];

const DESKTOP_VACUUM_TABS = [
  { key: "robot", label: "Robot Vacuums" },
  { key: "wetdry", label: "Wet/Dry Cleaners" },
  { key: "stick", label: "Stick Vacuums" },
];

const DESKTOP_VACUUM_PRODUCTS = {
  robot: {
    allLabel: "All Robot Vacuums",
    jSeries: [
      { name: "J15 Max Ultra", image: "https://www.figma.com/api/mcp/asset/05e9771a-1ef5-4aab-b52b-b526533b2597", isNew: true },
      { name: "J15 Evo Ultra", image: "https://www.figma.com/api/mcp/asset/26122038-8832-4986-b12a-8e03904a2892", isNew: true },
      { name: "J15 Pro Ultra", image: "https://www.figma.com/api/mcp/asset/edc6c448-45ba-484f-9da8-d8269d76de4f" },
      { name: "J15 Ultra", image: "https://www.figma.com/api/mcp/asset/94903f40-7031-4169-802a-6943091d0f0c" },
      { name: "J12 Ultra", image: "https://www.figma.com/api/mcp/asset/4bad1f03-9867-4d37-805c-626359739eea" },
    ],
    eSeries: [
      { name: "E20 Evo Plus", image: "https://www.figma.com/api/mcp/asset/a62fc0aa-1b82-4544-8314-6bb9015979a4", isNew: true },
      { name: "E20 Plus", image: "https://www.figma.com/api/mcp/asset/a76a93b6-bac2-4e0e-be01-7dc4e2cf5bca" },
    ],
  },
  wetdry: {
    allLabel: "All Wet/Dry Cleaners",
    jSeries: [
      { name: "FloorShine 880", image: "https://www.figma.com/api/mcp/asset/3d623cb1-9ab4-4bc0-8948-054531508567", isNew: true },
      { name: "FloorShine 460", image: "https://www.figma.com/api/mcp/asset/f68a8ac3-7ff4-4a63-a84e-4d0a2848d3a6", isNew: true },
      { name: "NEW 400", image: "https://www.figma.com/api/mcp/asset/b49a46c1-3d4f-4b32-827f-1f29e2a6c4a2" },
    ],
    eSeries: [],
  },
  stick: {
    allLabel: "All Stick Vacuums",
    jSeries: [
      { name: "FloorShine 880", image: "https://www.figma.com/api/mcp/asset/3d623cb1-9ab4-4bc0-8948-054531508567", isNew: true },
      { name: "FloorShine 460", image: "https://www.figma.com/api/mcp/asset/f68a8ac3-7ff4-4a63-a84e-4d0a2848d3a6", isNew: true },
      { name: "NEW 400", image: "https://www.figma.com/api/mcp/asset/b49a46c1-3d4f-4b32-827f-1f29e2a6c4a2" },
    ],
    eSeries: [],
  },
};

const MENU_BEST_FITS_ITEMS_DESKTOP = [
  { title: "Pet Owners", image: "https://www.figma.com/api/mcp/asset/a4df819f-67af-4ca8-b330-bbd999f0efae" },
  { title: "Family with Kids", image: "https://www.figma.com/api/mcp/asset/3c19988c-b57f-426f-a800-eb365b13a133" },
  { title: "Large Homes", image: "https://www.figma.com/api/mcp/asset/aba3a793-bc00-4150-80be-61d029634b93" },
  { title: "Small Apartments", image: "https://www.figma.com/api/mcp/asset/51bafae6-fd20-4e85-b29c-8a9047504ccd" },
  { title: "Help me Choose", image: "https://www.figma.com/api/mcp/asset/e27c2ed3-231c-47e9-a80c-ef29fdd34f22", dark: true },
];

const MENU_BEST_FITS_ITEMS_MOBILE = [
  { title: "Pet Owners", image: "https://www.figma.com/api/mcp/asset/fe267f0a-3754-4217-982f-fd5123e33f9c" },
  { title: "Family with Kids", image: "https://www.figma.com/api/mcp/asset/a2e57d77-454d-43ae-a801-04e2a57bd6da" },
  { title: "Large Homes", image: "https://www.figma.com/api/mcp/asset/e2b8e382-d04c-46b8-a1b7-48da5aa37306" },
  { title: "Small Apartments", image: "https://www.figma.com/api/mcp/asset/3c9c1bfb-ddd3-483f-bac5-a91b260863fd" },
  { title: "Help me Choose", image: "https://www.figma.com/api/mcp/asset/62e76c70-caaf-435f-885e-84b81a68614e", dark: true },
];

const DESKTOP_SALES_MENU = {
  promoImage: "https://www.figma.com/api/mcp/asset/0ffb614c-4764-4522-804a-b95ebde695ec",
  promoTitle: "Bloom Into Big Savings—Up To €400 Off This Spring",
  groups: [
    {
      title: "Featured Sale",
      links: ["Spring Sale", "Bundle & Save"],
    },
    {
      title: "Offer",
      links: ["Subscribe - Get 10% OFF!", "Key Worker Discount", "Student & Youth Saving", "Senior Saving"],
    },
    {
      title: "Loyalty",
      links: ["Eureka Rewards Program", "Redeem Rewards"],
    },
    {
      title: "New Product Launch",
      links: ["Z20 Ultra Preview"],
    },
  ],
};

const MOBILE_MENU_ITEMS = [
  { key: "sales", label: "Sales & Offers", hasPanel: true },
  { key: "vacuum", label: "Vacuum Cleaner", hasPanel: true },
  { key: "accessories", label: "Accessories", hasPanel: false },
  { key: "about", label: "About Eureka", hasPanel: false },
  { key: "support", label: "Support", hasPanel: false },
  { key: "bestfits", label: "Best Fits Your Home", hasPanel: true },
];

const MOBILE_SALES_HERO = {
  image: "https://www.figma.com/api/mcp/asset/62bb7e4c-9bdb-4ee1-983a-27b302a80149",
  title: "Bloom Into Big Savings—Up To €400 Off This Spring",
};

const MOBILE_SALES_SECTIONS = [
  { key: "featured", title: "Featured Sale", children: ["Spring Sale", "Bundle & Save"] },
  { key: "offer", title: "Offer", children: [] },
  { key: "loyalty", title: "Loyalty", children: [] },
  { key: "launch", title: "New Product Launch", children: [] },
];

const MOBILE_VACUUM_ROBOT = {
  allLabel: "All Robot Vacuums",
  jSeries: [
    { name: "J15 Max Ultra", image: "https://www.figma.com/api/mcp/asset/927df633-fae7-466c-8f95-b7edfe537223", isNew: true },
    { name: "J15 Evo Ultra", image: "https://www.figma.com/api/mcp/asset/7899c7e9-115d-4b0a-9b65-4b291ab3fda8", isNew: true },
    { name: "J15 Pro Ultra", image: "https://www.figma.com/api/mcp/asset/15ff342f-5fed-4729-8267-ba3d8fbe461f" },
    { name: "J15 Ultra", image: "https://www.figma.com/api/mcp/asset/9f2407a1-6a5e-4a15-96a4-c8e86707275c" },
    { name: "J12 Ultra", image: "https://www.figma.com/api/mcp/asset/957dfba3-c685-4f82-9653-cfc2c8ce77f9" },
  ],
  eSeries: [
    { name: "E20 Evo Plus", image: "https://www.figma.com/api/mcp/asset/3037d1c3-889b-4488-9df3-38c9c154e625", isNew: true },
    { name: "E20 Plus", image: "https://www.figma.com/api/mcp/asset/13fbe5d0-6b3c-4405-855b-28a434653c1d" },
  ],
};

const HERO_SLIDES = [
  {
    id: "valentine",
    eyebrow: "1 FEB - 14 FEB",
    title: "Valentine's Day Sale",
    subtitle: "50% Off. Just for you",
    cta: "Shop now",
    desktopImage: "https://www.figma.com/api/mcp/asset/2ab1a74d-589b-440e-967d-01ea4d305613",
    mobileImage: "https://www.figma.com/api/mcp/asset/b5968633-7deb-4700-a274-bff31fe6d76b",
    navLabel: "Valentine's Day Sale",
  },
  {
    id: "reactisens",
    eyebrow: "Limited Campaign",
    title: "ReactiSens 530",
    subtitle: "Smart detection. Turbo power.",
    cta: "Shop now",
    desktopImage: "https://www.figma.com/api/mcp/asset/76883c79-69c9-44e5-9fd0-6864a1e5c051",
    mobileImage: "https://www.figma.com/api/mcp/asset/76883c79-69c9-44e5-9fd0-6864a1e5c051",
    navLabel: "ReactiSens 530",
  },
  {
    id: "loyalty",
    eyebrow: "Members First",
    title: "Eureka Loyalty",
    subtitle: "Exclusive perks and faster shipping.",
    cta: "Join now",
    desktopImage: "https://www.figma.com/api/mcp/asset/99ee2db2-acc5-45fb-92e0-9587c0adaf58",
    mobileImage: "https://www.figma.com/api/mcp/asset/9b91c81c-087f-46b7-8e23-c55fbbc2090c",
    navLabel: "Eureka Loyalty",
  },
];

const CATEGORIES = [
  { title: "Robot", image: "https://www.figma.com/api/mcp/asset/56911eff-570a-4da4-9578-ae4e493fe1c9" },
  { title: "Wet/Dry Cleaner", image: "https://www.figma.com/api/mcp/asset/480b8cff-3db9-431d-ab64-7fe610cc8d01" },
  { title: "Stick", image: "https://www.figma.com/api/mcp/asset/e85e544f-56e7-4316-9b5d-1472bbaf0710" },
  { title: "Carpet cleaner", image: "https://www.figma.com/api/mcp/asset/72f925a9-199a-46cb-99c7-8e02a7bd65a9" },
  { title: "Accessories", image: "https://www.figma.com/api/mcp/asset/7a37fdfa-f3f7-42f0-8dc1-36d4bc36a3fd" },
];

const FEATURED_PRODUCTS = [
  {
    name: "J15 Max Ultra",
    description: "Double cleaning for greater cleanliness.",
    image: "https://www.figma.com/api/mcp/asset/a27982d6-541d-436c-9000-609de5734968",
    learnMore: true,
    isNew: true,
  },
  {
    name: "E20 Evo Plus",
    description: "Improved performance, easier maintenance",
    image: "https://www.figma.com/api/mcp/asset/6f929fa9-9337-4ef1-ac40-3788d2b771ee",
    learnMore: false,
    isNew: true,
  },
  {
    name: "Floorshine 880",
    description: "Discover effortless precision",
    image: "https://www.figma.com/api/mcp/asset/b236a6c3-a2c9-4e5f-aa45-501f444a65ae",
    learnMore: false,
    isNew: true,
  },
  {
    name: "ReactiSens 530",
    description: "Smart detection. Turbo power. Energy for the whole day.",
    image: "https://www.figma.com/api/mcp/asset/76883c79-69c9-44e5-9fd0-6864a1e5c051",
    learnMore: false,
    isNew: true,
  },
];

const FEATURED_METADATA_ASSETS = {
  ces: "https://www.figma.com/api/mcp/asset/837546bb-6fbe-4d37-85d2-c26f2b63af1b",
  ifa: "https://www.figma.com/api/mcp/asset/b893772f-2011-4c5d-b2bc-a6b8a05bbb8f",
  divider: "https://www.figma.com/api/mcp/asset/d92537d9-1574-40b2-928e-c7acf181592a",
};
const FEATURED_NEW_BADGE = "https://www.figma.com/api/mcp/asset/ab04608e-6626-4eee-8e4e-fae4d4a1b9b6";

const SCENARIOS = [
  { title: "Pet Owners", image: "https://www.figma.com/api/mcp/asset/71af65c8-3ca4-45d2-825d-c77666e53b57" },
  { title: "Family with Kids", image: "https://www.figma.com/api/mcp/asset/9db8c182-f5de-46e9-bb3c-4335b76aef75" },
  { title: "Large Homes", image: "https://www.figma.com/api/mcp/asset/e9ca3c3d-cac3-42c1-9b95-5f396770b317" },
  { title: "Small Apartments", image: "https://www.figma.com/api/mcp/asset/2eed3148-5ab8-43b0-8182-6775009359c8" },
  { title: "Help me Choose", image: "https://www.figma.com/api/mcp/asset/10cd5801-c40d-4078-8a0e-8e7fcde69f78", darkOverlay: true },
];

const EVENT_CARDS = [
  {
    title: "Eureka Rewards Program",
    description: "Unlock tons of savings, member-only perks, and special treats.",
    image: "https://www.figma.com/api/mcp/asset/99ee2db2-acc5-45fb-92e0-9587c0adaf58",
    dark: false,
    actions: ["Learn more", "Sign up now"],
  },
  {
    title: "Eureka Deals",
    description: "Enjoy premium discount for our products",
    image: "https://www.figma.com/api/mcp/asset/db5417b9-89d5-4454-b452-c32edee13de7",
    dark: false,
    actions: ["Sign up now"],
  },
  {
    title: "Affiliate Program",
    description: "We're looking for affiliates who share our passion to join our success.",
    image: "https://www.figma.com/api/mcp/asset/960cfcd3-eb9f-4c0f-b914-f27aad43064e",
    dark: true,
    actions: ["Sign up now"],
  },
];

const SERVICE_CARDS = [
  {
    title: "24-month Warranty",
    description: "Enjoy complete protection with our 2-year warranty covering repairs and replacements.",
    image: "https://www.figma.com/api/mcp/asset/9b6e04e6-7ee7-45cd-a6c0-43712712a83b",
    icon: "https://www.figma.com/api/mcp/asset/efad5575-5fd2-4ca4-89f6-23293985bab9",
  },
  {
    title: "30-Day Money-Back Guarantee",
    description: "Shop risk-free with our no-questions-asked 30-day return policy.",
    image: "https://www.figma.com/api/mcp/asset/eb2f17b2-6de1-42cf-a2ef-5538627ea8b6",
    icon: "https://www.figma.com/api/mcp/asset/ad16927f-ae19-40b2-ad30-4248a0361762",
  },
  {
    title: "Best Price Guarantee",
    description: "Shop with confidence knowing you're always getting the best deal on every purchase.",
    image: "https://www.figma.com/api/mcp/asset/f2d6bdfd-69a3-44e0-9ae7-73685d8a2bbd",
    icon: "https://www.figma.com/api/mcp/asset/833e105e-88b0-49c6-b899-d76814bea76c",
  },
];

const CUSTOMER_VIDEOS = [
  { user: "@queens.home_", image: "https://www.figma.com/api/mcp/asset/17234860-806d-4dc9-94dd-64d426cbeb6a" },
  { user: "@bibi__nk", image: "https://www.figma.com/api/mcp/asset/9885f8d4-115a-41cb-993a-7ed17fba1111" },
  { user: "@interior.ela", image: "https://www.figma.com/api/mcp/asset/04f20d00-4d44-4b93-ad52-5e7807d1c11d" },
  { user: "@rimastuce", image: "https://www.figma.com/api/mcp/asset/a81dda3f-ccd9-4c5d-b239-bfbceb41cb07" },
  { user: "@miley_home", image: "https://www.figma.com/api/mcp/asset/7a037999-5210-47ac-b49f-8f29e6953166" },
  { user: "@cleaninglab", image: "https://www.figma.com/api/mcp/asset/bbe7b387-10c6-4ac9-b6e8-e5ff349ddcdf" },
  { user: "@lacasadiclaudia2022", image: "https://www.figma.com/api/mcp/asset/42857dc1-9fe4-46c4-9cb8-82bb02e2dec4" },
  { user: "@chiarashome", image: "https://www.figma.com/api/mcp/asset/772ba467-81e9-4a89-8906-a63ba5e36776" },
  { user: "@eurekahome", image: "https://www.figma.com/api/mcp/asset/1ec53a67-a85c-49a1-9639-a3c3a14e236e" },
  { user: "@robotdaily", image: "https://www.figma.com/api/mcp/asset/18e503d4-f7a0-4927-81d7-5e9ea3d14f2f" },
];

const AWARD_LOGOS = [
  "https://www.figma.com/api/mcp/asset/d90e1193-b062-4c69-b750-57cfba4dfaf9",
  "https://www.figma.com/api/mcp/asset/91c18086-1b7a-4459-867b-623d9200f58e",
  "https://www.figma.com/api/mcp/asset/e6538da3-d50d-48bf-8912-602ff23d136a",
  "https://www.figma.com/api/mcp/asset/88ca029d-eb61-41ec-8991-c12304b5aa2d",
  "https://www.figma.com/api/mcp/asset/fa72a386-19e2-4485-b8e5-78389e57a8ba",
  "https://www.figma.com/api/mcp/asset/dd386cee-4610-49da-9251-a3e054e5b50d",
  "https://www.figma.com/api/mcp/asset/bd65ee7a-dd4d-4be9-b7d7-5db3a9ba705a",
];

const HERO_AUTOPLAY_MS = 5200;
const HERO_PROGRESS_TICK_MS = 40;

const FOOTER = {
  newsletterTitle: "Melden Sie sich für unseren Newsletter an",
  links: {
    produkte: ["Roboterstaubsauger", "Nass-/Trockenreiniger", "Stabstaubsauger", "Teppichreiniger", "Zubehör"],
    support: [
      "Hilfe Center",
      "Meine Garantie einlösen",
      "Verfolgen deine Sendung",
      "Preisgarantie Richtlinie",
      "Vergleichen Sie Robotersauger",
      "Hilf mir bei der Auswahl",
      "FAQ",
      "Kontaktieren Sie uns",
    ],
    about: ["Über Eureka", "Affiliate Programm", "Studenten- & Jugendrabatt", "Seniorenrabatt", "IFA 2024", "IFA 2023"],
  },
  social: [
    "https://www.figma.com/api/mcp/asset/811a0095-c595-4cb3-bb02-29ed72827352",
    "https://www.figma.com/api/mcp/asset/27409822-5d95-4b58-b276-c19ca91c55bd",
    "https://www.figma.com/api/mcp/asset/750bbc1a-b8f5-4283-810d-5b070fd98152",
  ],
  payment: [
    "https://www.figma.com/api/mcp/asset/f1d27815-63cc-49e2-81bd-a209cbd66ca4",
    "https://www.figma.com/api/mcp/asset/d2939d42-6a68-4a35-b891-d6315272406f",
    "https://www.figma.com/api/mcp/asset/a403affe-a235-4dee-b053-cabb47f0535f",
    "https://www.figma.com/api/mcp/asset/7c412620-cdb0-4cad-9d15-c568571744bb",
    "https://www.figma.com/api/mcp/asset/fd987c14-07cb-4719-b206-3aa93175d8f7",
    "https://www.figma.com/api/mcp/asset/9dd9ad11-966e-4286-ace3-adb13b3ec52f",
    "https://www.figma.com/api/mcp/asset/12ac5d96-4549-4852-a5be-d510afec1950",
    "https://www.figma.com/api/mcp/asset/a0d4bb9c-8a56-4d47-a297-ade5917b9d42",
    "https://www.figma.com/api/mcp/asset/1e960903-5d75-4be8-9c33-caeae93b8edf",
  ],
  logoWhite: "https://www.figma.com/api/mcp/asset/f3852869-d858-4e97-b8cb-ef15cf401764",
  badge: "https://www.figma.com/api/mcp/asset/b5becccd-69d0-4456-97fe-d7a2ded44e65",
  countryFlag: "https://www.figma.com/api/mcp/asset/6a018aae-daab-4beb-9c62-1e398fe2fb36",
};

function withFallback(event, fallbackSrc) {
  if (event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackSrc;
}

function HeaderIcons() {
  return (
    <div className="header-icons">
      <button type="button" className="icon-btn" aria-label="Search">
        <img src={ICONS.search} alt="" onError={(event) => withFallback(event, FALLBACKS.search)} />
      </button>
      <button type="button" className="icon-btn" aria-label="Shopping bag">
        <img src={ICONS.bag} alt="" onError={(event) => withFallback(event, FALLBACKS.bag)} />
      </button>
      <button type="button" className="icon-btn" aria-label="Account">
        <img src={ICONS.account} alt="" onError={(event) => withFallback(event, FALLBACKS.account)} />
      </button>
    </div>
  );
}

function DesktopMenuProductCard({ item }) {
  return (
    <article className="desktop-menu-product-card">
      <img src={item.image} alt={item.name} onError={(event) => withFallback(event, FALLBACKS.card)} />
      <p>{item.name}</p>
      {item.isNew && <span className="desktop-menu-product-new">New</span>}
    </article>
  );
}

function DesktopBestFitMiniCard({ item }) {
  return (
    <article className="desktop-bestfit-mini-card">
      <div className={`desktop-bestfit-mini-media${item.dark ? " is-dark" : ""}`}>
        <img src={item.image} alt={item.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
      </div>
      <div className="desktop-bestfit-mini-meta">
        <span>{item.title}</span>
        <span aria-hidden="true">›</span>
      </div>
    </article>
  );
}

function DesktopMegaPanel({ activeMenu, vacuumCategory, onVacuumCategoryChange }) {
  if (!activeMenu) {
    return null;
  }

  if (activeMenu === "vacuum") {
    const data = DESKTOP_VACUUM_PRODUCTS[vacuumCategory] || DESKTOP_VACUUM_PRODUCTS.robot;

    return (
      <section className="desktop-mega-panel desktop-mega-panel-vacuum" aria-label="Vacuum Cleaner menu">
        <aside className="desktop-vacuum-sidebar">
          {DESKTOP_VACUUM_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={tab.key === vacuumCategory ? "is-active" : ""}
              onMouseEnter={() => onVacuumCategoryChange(tab.key)}
              onClick={() => onVacuumCategoryChange(tab.key)}
            >
              <span>{tab.label}</span>
              <span aria-hidden="true">›</span>
            </button>
          ))}
        </aside>

        <div className="desktop-vacuum-main">
          <div className="desktop-vacuum-main-head">
            <p>J Series</p>
            <button type="button">
              {data.allLabel}
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className="desktop-vacuum-grid">
            {data.jSeries.map((item) => (
              <DesktopMenuProductCard key={item.name} item={item} />
            ))}
          </div>

          {data.eSeries.length > 0 && (
            <>
              <p className="desktop-vacuum-section">E Series</p>
              <div className="desktop-vacuum-grid desktop-vacuum-grid-short">
                {data.eSeries.map((item) => (
                  <DesktopMenuProductCard key={item.name} item={item} />
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="desktop-bestfit-side-panel">
          <p className="desktop-bestfit-side-title">Best Fits Your Home</p>
          <div className="desktop-bestfit-side-grid">
            {MENU_BEST_FITS_ITEMS_DESKTOP.map((item) => (
              <DesktopBestFitMiniCard key={item.title} item={item} />
            ))}
          </div>
        </aside>
      </section>
    );
  }

  if (activeMenu === "sales") {
    const [featuredSale, offer, loyalty, launch] = DESKTOP_SALES_MENU.groups;

    return (
      <section className="desktop-mega-panel desktop-mega-panel-sales" aria-label="Sales and offers menu">
        <div className="desktop-sales-columns">
          <div className="desktop-sales-column">
            <p>{featuredSale.title}</p>
            {featuredSale.links.map((link) => (
              <button type="button" key={link}>{link}</button>
            ))}
          </div>
          <div className="desktop-sales-column">
            <p>{offer.title}</p>
            {offer.links.map((link) => (
              <button type="button" key={link}>{link}</button>
            ))}
            <p className="desktop-sales-subhead">{loyalty.title}</p>
            {loyalty.links.map((link) => (
              <button type="button" key={link}>{link}</button>
            ))}
          </div>
          <div className="desktop-sales-column">
            <p>{launch.title}</p>
            {launch.links.map((link) => (
              <button type="button" key={link}>{link}</button>
            ))}
          </div>
        </div>

        <article className="desktop-sales-promo-card">
          <img src={DESKTOP_SALES_MENU.promoImage} alt="" onError={(event) => withFallback(event, FALLBACKS.card)} />
          <h3>{DESKTOP_SALES_MENU.promoTitle}</h3>
          <button type="button">
            Shop Now
            <span aria-hidden="true">›</span>
          </button>
        </article>
      </section>
    );
  }

  if (activeMenu === "bestfits") {
    return (
      <section className="desktop-mega-panel desktop-mega-panel-bestfits" aria-label="Best fits your home menu">
        <div className="desktop-bestfits-grid">
          {MENU_BEST_FITS_ITEMS_DESKTOP.map((item) => (
            <article className="desktop-bestfits-card" key={item.title}>
              <div className={`desktop-bestfits-media${item.dark ? " is-dark" : ""}`}>
                <img src={item.image} alt={item.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
              </div>
              <button type="button" className="desktop-bestfits-link">
                <span>{item.title}</span>
                <span aria-hidden="true">›</span>
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return null;
}

function DesktopHeader() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [vacuumCategory, setVacuumCategory] = useState("robot");

  return (
    <div className="desktop-header-shell" onMouseLeave={() => setActiveMenu(null)}>
      <header className="desktop-header">
        <div className="desktop-header-left">
          <img
            src={ICONS.logoDesktop}
            alt="Eureka"
            className="eureka-logo"
            onError={(event) => withFallback(event, FALLBACKS.logo)}
          />
          <nav className="desktop-nav" aria-label="Primary">
            {DESKTOP_NAV_ITEMS.map((item) => (
              <div className="desktop-nav-item" key={item.key}>
                <button
                  type="button"
                  className={`${item.key === activeMenu ? "is-active" : ""}${item.hasPanel ? " has-panel" : ""}`}
                  onMouseEnter={() => {
                    if (item.hasPanel) {
                      setActiveMenu(item.key);
                    } else {
                      setActiveMenu(null);
                    }
                  }}
                  onFocus={() => {
                    if (item.hasPanel) {
                      setActiveMenu(item.key);
                    }
                  }}
                  onClick={() => {
                    if (item.hasPanel) {
                      setActiveMenu((current) => (current === item.key ? null : item.key));
                    }
                  }}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>
        </div>
        <div className="desktop-header-right">
          <HeaderIcons />
          <button type="button" className="pill-btn sm">Geschäft</button>
        </div>
      </header>

      <DesktopMegaPanel
        activeMenu={activeMenu}
        vacuumCategory={vacuumCategory}
        onVacuumCategoryChange={setVacuumCategory}
      />
    </div>
  );
}

function MobileMenuArrow({ expanded = false }) {
  return (
    <span className={`mobile-menu-arrow${expanded ? " is-expanded" : ""}`} aria-hidden="true">
      ›
    </span>
  );
}

function MobileHeader({
  isOpen,
  onToggleMenu,
  activePanel,
  onChangePanel,
  salesSection,
  onChangeSalesSection,
}) {
  return (
    <>
      <header className="mobile-header">
        <button
          type="button"
          className={`menu-btn${isOpen ? " is-open" : ""}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={onToggleMenu}
        >
          {isOpen ? "×" : <img src={ICONS.menu} alt="" />}
        </button>
        <img
          src={ICONS.logoMobile}
          alt="Eureka"
          className="eureka-logo mobile"
          onError={(event) => withFallback(event, FALLBACKS.logo)}
        />
        <HeaderIcons />
      </header>

      {isOpen && (
        <aside className="mobile-menu-drawer" aria-label="Mobile menu">
          <div className="mobile-menu-scroll">
            {MOBILE_MENU_ITEMS.map((item) => {
              const isExpanded = activePanel === item.key;
              return (
                <div className="mobile-menu-group" key={item.key}>
                  <button
                    type="button"
                    className={`mobile-menu-row${isExpanded ? " is-expanded" : ""}`}
                    onClick={() => {
                      if (!item.hasPanel) {
                        return;
                      }
                      onChangePanel(isExpanded ? null : item.key);
                    }}
                  >
                    <span>{item.label}</span>
                    {item.hasPanel && <MobileMenuArrow expanded={isExpanded} />}
                  </button>

                  {item.key === "sales" && isExpanded && (
                    <div className="mobile-menu-panel sales">
                      <article className="mobile-sales-hero-card">
                        <img src={MOBILE_SALES_HERO.image} alt="" onError={(event) => withFallback(event, FALLBACKS.card)} />
                        <h3>{MOBILE_SALES_HERO.title}</h3>
                        <button type="button">
                          Shop Now
                          <span aria-hidden="true">›</span>
                        </button>
                      </article>

                      <div className="mobile-sales-subsections">
                        {MOBILE_SALES_SECTIONS.map((section) => {
                          const isSubExpanded = salesSection === section.key;
                          return (
                            <div className="mobile-sales-subsection" key={section.key}>
                              <button
                                type="button"
                                className={`mobile-sales-subhead${isSubExpanded ? " is-expanded" : ""}`}
                                onClick={() => onChangeSalesSection(isSubExpanded ? null : section.key)}
                              >
                                <span>{section.title}</span>
                                <MobileMenuArrow expanded={isSubExpanded} />
                              </button>
                              {isSubExpanded && section.children.length > 0 && (
                                <div className="mobile-sales-subitems">
                                  {section.children.map((link) => (
                                    <button type="button" key={link}>{link}</button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {item.key === "vacuum" && isExpanded && (
                    <div className="mobile-menu-panel vacuum">
                      <div className="mobile-vacuum-head">
                        <span>J Series</span>
                        <button type="button">
                          {MOBILE_VACUUM_ROBOT.allLabel}
                          <span aria-hidden="true">›</span>
                        </button>
                      </div>

                      <div className="mobile-vacuum-grid">
                        {MOBILE_VACUUM_ROBOT.jSeries.map((product) => (
                          <article className="mobile-vacuum-card" key={product.name}>
                            <img src={product.image} alt={product.name} onError={(event) => withFallback(event, FALLBACKS.card)} />
                            <p>{product.name}</p>
                            {product.isNew && <span>New</span>}
                          </article>
                        ))}
                      </div>

                      <p className="mobile-vacuum-section">E Series</p>
                      <div className="mobile-vacuum-grid mobile-vacuum-grid-short">
                        {MOBILE_VACUUM_ROBOT.eSeries.map((product) => (
                          <article className="mobile-vacuum-card" key={product.name}>
                            <img src={product.image} alt={product.name} onError={(event) => withFallback(event, FALLBACKS.card)} />
                            <p>{product.name}</p>
                            {product.isNew && <span>New</span>}
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.key === "bestfits" && isExpanded && (
                    <div className="mobile-menu-panel bestfits">
                      <div className="mobile-bestfits-grid">
                        {MENU_BEST_FITS_ITEMS_MOBILE.map((fit) => (
                          <article className="mobile-bestfits-card" key={fit.title}>
                            <div className={`mobile-bestfits-media${fit.dark ? " is-dark" : ""}`}>
                              <img src={fit.image} alt={fit.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
                            </div>
                            <button type="button" className="mobile-bestfits-link">
                              <span>{fit.title}</span>
                              <span aria-hidden="true">›</span>
                            </button>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mobile-menu-cta">
            <button type="button" className="pill-btn">Sign up for Eureka</button>
          </div>
        </aside>
      )}
    </>
  );
}

function FeaturedCard({ item }) {
  return (
    <article className="featured-card">
      <img
        src={item.image}
        alt={item.name}
        className="featured-card-image"
        onError={(event) => withFallback(event, FALLBACKS.card)}
      />
      <div className="featured-card-overlay">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="featured-card-actions">
          {item.learnMore && <button type="button" className="pill-btn ghost">Learn more</button>}
          <button type="button" className="pill-btn">Shop now</button>
        </div>
      </div>
      {item.isNew && (
        <div className="new-badge" aria-label="New">
          <img
            className="new-badge-image"
            src={FEATURED_NEW_BADGE}
            alt=""
            aria-hidden="true"
            onError={(event) => withFallback(event, FALLBACKS.card)}
          />
          <span className="new-badge-label">NEW</span>
        </div>
      )}
      <div className="featured-offer-bar">
        <strong>Sweet Valentine's Day Offer</strong>
        <span>Save €120 + Get Free Accessories Worth €30</span>
      </div>
    </article>
  );
}

function ScenarioCard({ item }) {
  return (
    <article className="scenario-card">
      <img
        src={item.image}
        alt={item.title}
        onError={(event) => withFallback(event, FALLBACKS.card)}
      />
      <div className={`scenario-overlay${item.darkOverlay ? " is-dark" : ""}`} />
      <div className="scenario-meta">
        <h3>{item.title}</h3>
        <span aria-hidden="true">›</span>
      </div>
    </article>
  );
}

function EventCard({ item }) {
  return (
    <article className={`event-card${item.dark ? " is-dark" : ""}`}>
      <img src={item.image} alt={item.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
      {item.dark && <div className="event-overlay" />}
      <div className="event-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="event-actions">
          {item.actions.map((action) => (
            <button key={action} type="button" className={`pill-btn${action === "Learn more" ? " ghost purple" : ""}`}>
              {action}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ item }) {
  return (
    <article className="service-card">
      <img className="service-bg" src={item.image} alt={item.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
      <div className="service-overlay" />
      <div className="service-content">
        <img className="service-icon" src={item.icon} alt="" aria-hidden="true" onError={(event) => withFallback(event, FALLBACKS.card)} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

function VideoCard({ item }) {
  return (
    <article className="video-card">
      <img src={item.image} alt={item.user} onError={(event) => withFallback(event, FALLBACKS.card)} />
      <div className="video-top">{item.user}</div>
      <button type="button" className="video-play" aria-label={`Play video from ${item.user}`}>
        ▶
      </button>
    </article>
  );
}

function NewsletterBlock() {
  return (
    <section className="newsletter-block">
      <h2>{FOOTER.newsletterTitle}</h2>
      <div className="newsletter-form">
        <input type="email" placeholder="Email" aria-label="Email" />
        <button type="button" className="pill-btn">Submit</button>
      </div>
      <label className="newsletter-legal">
        <input type="checkbox" defaultChecked />
        <span>
          Sie haben unsere <a href="#">Datenschutzerklärung</a> gelesen und stimmen dem Erhalt von Marketing-Kommunikation zu.
        </span>
      </label>
    </section>
  );
}

function DesktopFooter() {
  return (
    <footer className="site-footer desktop">
      <div className="footer-inner container">
        <NewsletterBlock />

        <div className="footer-links-grid">
          <section className="footer-brand-block">
            <div className="footer-brand-head">
              <img src={FOOTER.logoWhite} alt="Eureka" className="footer-logo" />
              <img src={FOOTER.badge} alt="Award badge" className="footer-badge" />
            </div>
            <p>
              Das Eureka Clean Versprechen Als Ihr zuverlässiger Reinigungspartner verpflichten wir
              uns, Ihnen stets Staubsauger zu liefern, die Leistung, Qualität und Wert bieten.
            </p>
            <div className="footer-socials">
              {FOOTER.social.map((icon, index) => (
                <a href="#" key={icon} aria-label={`Social ${index + 1}`}>
                  <img src={icon} alt="" />
                </a>
              ))}
            </div>
          </section>

          <section>
            <h4>PRODUKTE</h4>
            <ul>{FOOTER.links.produkte.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul>
          </section>

          <section>
            <h4>UNTERSTÜTZUNG</h4>
            <ul>{FOOTER.links.support.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul>
          </section>

          <section>
            <h4>ÜBER</h4>
            <ul>{FOOTER.links.about.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul>
          </section>
        </div>
      </div>

      <div className="footer-legal-bar">
        <div className="container footer-legal-inner">
          <div className="footer-country">
            <img src={FOOTER.countryFlag} alt="Germany" />
            <span>Deutschland ( Deutsch )</span>
          </div>
          <div className="footer-copyright">
            © 2025 Jiangsu Midea Cleaning Appliances Co., Ltd. Alle Rechte beibehalten
          </div>
          <div className="footer-policy-links">
            <a href="#">Datenschutzerklärung</a>
            <a href="#">Rückgabebedingungen</a>
            <a href="#">Garantiepolitik</a>
            <a href="#">Versandrichtlinie</a>
          </div>
          <div className="footer-payments">
            {FOOTER.payment.map((logo) => (
              <img key={logo} src={logo} alt="Payment method" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileFooter() {
  return (
    <footer className="site-footer mobile">
      <div className="container mobile-footer-inner">
        <NewsletterBlock />

        <section className="footer-brand-block mobile">
          <div className="footer-brand-head">
            <img src={FOOTER.logoWhite} alt="Eureka" className="footer-logo" />
            <img src={FOOTER.badge} alt="Award badge" className="footer-badge" />
          </div>
          <p>
            Das Eureka Clean Versprechen Als Ihr zuverlässiger Reinigungspartner verpflichten wir
            uns, Ihnen stets Staubsauger zu liefern, die Leistung, Qualität und Wert bieten.
          </p>
          <div className="footer-socials">
            {FOOTER.social.map((icon, index) => (
              <a href="#" key={icon} aria-label={`Social ${index + 1}`}>
                <img src={icon} alt="" />
              </a>
            ))}
          </div>
        </section>

        <div className="mobile-footer-accordions">
          <button type="button">PRODUKTE <span>+</span></button>
          <button type="button">UNTERSTÜTZUNG <span>+</span></button>
          <button type="button">ÜBER <span>+</span></button>
        </div>

        <div className="footer-legal-bar mobile">
          <div className="footer-country">
            <img src={FOOTER.countryFlag} alt="Germany" />
            <span>Deutschland ( Deutsch )</span>
          </div>
          <div className="footer-copyright">
            © 2025 Jiangsu Midea Cleaning Appliances Co., Ltd. Alle Rechte beibehalten
          </div>
          <div className="footer-policy-links">
            <a href="#">Datenschutzerklärung</a>
            <a href="#">Rückgabebedingungen</a>
            <a href="#">Garantiepolitik</a>
            <a href="#">Versandrichtlinie</a>
          </div>
          <div className="footer-payments">
            {FOOTER.payment.map((logo) => (
              <img key={logo} src={logo} alt="Payment method" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function scrollRail(ref, direction) {
  if (!ref.current) {
    return;
  }

  const amount = direction === "left" ? -420 : 420;
  const rail = ref.current;
  rail.dispatchEvent(new CustomEvent("rail-stop-motion"));

  const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
  const targetLeft = Math.max(0, Math.min(maxScrollLeft, rail.scrollLeft + amount));
  rail.scrollTo({ left: targetLeft, behavior: "smooth" });
}

function useDraggableRail(ref) {
  useEffect(() => {
    const rail = ref.current;
    if (!rail) {
      return undefined;
    }

    let isDragging = false;
    let moved = false;
    let suppressClick = false;
    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let inertiaFrameId = 0;
    let easingFrameId = 0;
    let targetScrollLeft = rail.scrollLeft;

    const isInteractiveTarget = (target) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      return Boolean(target.closest("button, a, input, textarea, select, label"));
    };

    const stopInertia = () => {
      if (!inertiaFrameId) {
        return;
      }

      window.cancelAnimationFrame(inertiaFrameId);
      inertiaFrameId = 0;
      rail.classList.remove("is-inertia");
    };

    const stopEasing = () => {
      if (!easingFrameId) {
        return;
      }

      window.cancelAnimationFrame(easingFrameId);
      easingFrameId = 0;
    };

    const easeToTarget = () => {
      const delta = targetScrollLeft - rail.scrollLeft;
      rail.scrollLeft += delta * 0.2;

      if (Math.abs(delta) > 0.35) {
        easingFrameId = window.requestAnimationFrame(easeToTarget);
        return;
      }

      rail.scrollLeft = targetScrollLeft;
      easingFrameId = 0;
    };

    const setScrollTarget = (nextTarget) => {
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      targetScrollLeft = Math.max(0, Math.min(maxScrollLeft, nextTarget));
      if (easingFrameId) {
        return;
      }

      easingFrameId = window.requestAnimationFrame(easeToTarget);
    };

    const startInertia = () => {
      const maxMomentum = 2.6;
      let momentum = Math.max(Math.min(-velocity * 16, maxMomentum), -maxMomentum);

      if (Math.abs(momentum) < 0.08) {
        return;
      }

      rail.classList.add("is-inertia");
      const tick = () => {
        setScrollTarget(targetScrollLeft + momentum * 16);
        momentum *= 0.94;

        if (Math.abs(momentum) >= 0.02) {
          inertiaFrameId = window.requestAnimationFrame(tick);
          return;
        }

        inertiaFrameId = 0;
        rail.classList.remove("is-inertia");
      };

      inertiaFrameId = window.requestAnimationFrame(tick);
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || isInteractiveTarget(event.target)) {
        return;
      }

      stopInertia();
      stopEasing();
      isDragging = true;
      moved = false;
      suppressClick = false;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      targetScrollLeft = rail.scrollLeft;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;

      rail.setPointerCapture(event.pointerId);
      rail.classList.add("is-dragging");
      document.body.classList.add("is-rail-dragging");
    };

    const handlePointerMove = (event) => {
      if (!isDragging) {
        return;
      }

      const delta = event.clientX - startX;
      const now = performance.now();
      const deltaTime = Math.max(1, now - lastTime);
      const instantVelocity = (event.clientX - lastX) / deltaTime;
      velocity = velocity * 0.75 + instantVelocity * 0.25;
      lastX = event.clientX;
      lastTime = now;

      if (Math.abs(delta) > 4) {
        moved = true;
        suppressClick = true;
      }

      setScrollTarget(startScrollLeft - delta);
      event.preventDefault();
    };

    const endPointerDrag = () => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      rail.classList.remove("is-dragging");
      document.body.classList.remove("is-rail-dragging");

      if (moved) {
        startInertia();
      }
    };

    const handleClickCapture = (event) => {
      if (!suppressClick) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };

    const handleDragStart = (event) => {
      event.preventDefault();
    };

    const handleStopMotion = () => {
      stopInertia();
      stopEasing();
      targetScrollLeft = rail.scrollLeft;
      rail.classList.remove("is-dragging");
      rail.classList.remove("is-inertia");
      document.body.classList.remove("is-rail-dragging");
      isDragging = false;
    };

    rail.addEventListener("pointerdown", handlePointerDown);
    rail.addEventListener("pointermove", handlePointerMove, { passive: false });
    rail.addEventListener("pointerup", endPointerDrag);
    rail.addEventListener("pointercancel", endPointerDrag);
    rail.addEventListener("lostpointercapture", endPointerDrag);
    rail.addEventListener("dragstart", handleDragStart);
    rail.addEventListener("rail-stop-motion", handleStopMotion);
    rail.addEventListener("click", handleClickCapture, true);

    return () => {
      stopInertia();
      stopEasing();
      rail.classList.remove("is-dragging");
      rail.classList.remove("is-inertia");
      document.body.classList.remove("is-rail-dragging");
      rail.removeEventListener("pointerdown", handlePointerDown);
      rail.removeEventListener("pointermove", handlePointerMove);
      rail.removeEventListener("pointerup", endPointerDrag);
      rail.removeEventListener("pointercancel", endPointerDrag);
      rail.removeEventListener("lostpointercapture", endPointerDrag);
      rail.removeEventListener("dragstart", handleDragStart);
      rail.removeEventListener("rail-stop-motion", handleStopMotion);
      rail.removeEventListener("click", handleClickCapture, true);
    };
  }, [ref]);
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActivePanel, setMobileActivePanel] = useState(null);
  const [mobileSalesSection, setMobileSalesSection] = useState("featured");
  const scenarioRailRef = useRef(null);
  const eventRailRef = useRef(null);
  const serviceRailRef = useRef(null);

  useDraggableRail(scenarioRailRef);
  useDraggableRail(eventRailRef);
  useDraggableRail(serviceRailRef);

  const duplicatedAwards = useMemo(() => [...AWARD_LOGOS, ...AWARD_LOGOS], []);

  useEffect(() => {
    setHeroProgress(0);
    const start = performance.now();

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const nextProgress = Math.min((elapsed / HERO_AUTOPLAY_MS) * 100, 100);
      setHeroProgress(nextProgress);
    }, HERO_PROGRESS_TICK_MS);

    const autoAdvanceTimer = window.setTimeout(() => {
      setHeroIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_AUTOPLAY_MS);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(autoAdvanceTimer);
    };
  }, [heroIndex]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileActivePanel(null);
      setMobileSalesSection("featured");
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
      return () => {
        document.body.classList.remove("menu-open");
      };
    }

    document.body.classList.remove("menu-open");
    return undefined;
  }, [mobileMenuOpen]);

  return (
    <main className="homepage">
      <div className="promo-bar">
        New member can earn 100 Eureka Points! <a href="#">Register now</a>
      </div>

      <div className="desktop-only"><DesktopHeader /></div>
      <div className="mobile-only">
        <MobileHeader
          isOpen={mobileMenuOpen}
          onToggleMenu={() => setMobileMenuOpen((current) => !current)}
          activePanel={mobileActivePanel}
          onChangePanel={setMobileActivePanel}
          salesSection={mobileSalesSection}
          onChangeSalesSection={setMobileSalesSection}
        />
      </div>

      <section className="hero">
        {HERO_SLIDES.map((slide, index) => (
          <article
            key={slide.id}
            className={`hero-slide${index === heroIndex ? " is-active" : ""}`}
            aria-hidden={index === heroIndex ? "false" : "true"}
          >
            <img
              src={slide.desktopImage}
              alt={slide.title}
              className="hero-image desktop"
              onError={(event) => withFallback(event, FALLBACKS.hero)}
            />
            <img
              src={slide.mobileImage}
              alt={slide.title}
              className="hero-image mobile"
              onError={(event) => withFallback(event, FALLBACKS.hero)}
            />

            <div className="hero-content">
              <p className="hero-eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button type="button" className="pill-btn">{slide.cta}</button>
            </div>
          </article>
        ))}

        <button
          type="button"
          className="hero-arrow is-left"
          aria-label="Previous slide"
          onClick={() => setHeroIndex((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        >
          ‹
        </button>

        <button
          type="button"
          className="hero-arrow is-right"
          aria-label="Next slide"
          onClick={() => setHeroIndex((current) => (current + 1) % HERO_SLIDES.length)}
        >
          ›
        </button>

        <div className="hero-controls">
          <div className="hero-pagination">
            <ul className="hero-nav-list" aria-label="Hero slides">
              {HERO_SLIDES.map((slide, index) => (
                <li key={slide.id}>
                  <button
                    type="button"
                    className={index === heroIndex ? "is-active" : ""}
                    onClick={() => setHeroIndex(index)}
                  >
                    {slide.navLabel}
                  </button>
                </li>
              ))}
            </ul>
            <div className="hero-mini-progress" aria-hidden="true">
              <span style={{ width: `${heroProgress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <h2 className="section-title center">Shop by Category</h2>
          <div className="category-grid">
            {CATEGORIES.map((item) => (
              <article className="category-card" key={item.title}>
                <img src={item.image} alt={item.title} onError={(event) => withFallback(event, FALLBACKS.card)} />
                <p>{item.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-head with-metadata">
            <h2 className="section-title">Featured Products</h2>
            <div className="featured-metadata">
              <div className="featured-awards">
                <div className="featured-awards-logos">
                  <img
                    src={FEATURED_METADATA_ASSETS.ces}
                    alt="CES"
                    className="featured-award-logo ces"
                    onError={(event) => withFallback(event, FALLBACKS.card)}
                  />
                  <img
                    src={FEATURED_METADATA_ASSETS.ifa}
                    alt="IFA"
                    className="featured-award-logo ifa"
                    onError={(event) => withFallback(event, FALLBACKS.card)}
                  />
                </div>
                <span className="featured-awards-text">Featured at CES &amp; IFA</span>
              </div>
              <img
                src={FEATURED_METADATA_ASSETS.divider}
                alt=""
                aria-hidden="true"
                className="featured-award-divider"
                onError={(event) => withFallback(event, FALLBACKS.card)}
              />
              <span className="featured-metadata-note">100+ Years of Innovation Since 1909</span>
            </div>
          </div>

          <div className="featured-grid">
            {FEATURED_PRODUCTS.map((item) => (
              <FeaturedCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section scenarios-section">
        <div className="container">
          <div className="section-head with-actions">
            <h2 className="section-title">Choose the Best Fits Your Home</h2>
            <div className="section-arrows desktop-only-inline">
              <button type="button" onClick={() => scrollRail(scenarioRailRef, "left")} aria-label="Scroll left">‹</button>
              <button type="button" onClick={() => scrollRail(scenarioRailRef, "right")} aria-label="Scroll right">›</button>
            </div>
          </div>

          <div className="horizontal-rail scenario-rail" ref={scenarioRailRef}>
            {SCENARIOS.map((item) => (
              <ScenarioCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section quiz-banner-section">
        <div className="container">
          <article className="quiz-banner">
            <img
              src="https://www.figma.com/api/mcp/asset/2252bda6-e1d0-4ace-9f63-1ab6630d6433"
              alt="Which robot vacuum cleaner is right for you"
              className="desktop"
              onError={(event) => withFallback(event, FALLBACKS.card)}
            />
            <img
              src="https://www.figma.com/api/mcp/asset/b03d2f2c-3717-4b16-93db-2c14b7e4be4e"
              alt="Which robot vacuum cleaner is right for you"
              className="mobile"
              onError={(event) => withFallback(event, FALLBACKS.card)}
            />
            <div className="quiz-banner-content">
              <h3>Which robot vacuum cleaner is right for you?</h3>
              <button type="button" className="pill-btn">Help me choose</button>
            </div>
          </article>
        </div>
      </section>

      <section className="section events-section">
        <div className="container">
          <div className="section-head with-actions">
            <h2 className="section-title">Events &amp; Special</h2>
            <div className="section-arrows desktop-only-inline">
              <button type="button" onClick={() => scrollRail(eventRailRef, "left")} aria-label="Scroll left">‹</button>
              <button type="button" onClick={() => scrollRail(eventRailRef, "right")} aria-label="Scroll right">›</button>
            </div>
          </div>

          <div className="horizontal-rail event-rail" ref={eventRailRef}>
            {EVENT_CARDS.map((item) => (
              <EventCard key={item.title + item.description} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section service-section">
        <div className="container">
          <div className="section-head with-actions">
            <h2 className="section-title">Why should I buy from the official Eureka online store?</h2>
            <div className="section-arrows desktop-only-inline">
              <button type="button" onClick={() => scrollRail(serviceRailRef, "left")} aria-label="Scroll left">‹</button>
              <button type="button" onClick={() => scrollRail(serviceRailRef, "right")} aria-label="Scroll right">›</button>
            </div>
          </div>
          <div className="horizontal-rail service-rail" ref={serviceRailRef}>
            {SERVICE_CARDS.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title">What customers are saying</h2>
        </div>
        <div className="video-rail-wrap">
          <div className="video-rail">
            {CUSTOMER_VIDEOS.map((video, index) => (
              <VideoCard key={video.user + index} item={video} />
            ))}
          </div>
        </div>
      </section>

      <section className="section awards-section">
        <div className="awards-marquee">
          <div className="awards-track">
            {duplicatedAwards.map((logo, index) => (
              <div className="award-logo-wrap" key={logo + index}>
                <img src={logo} alt="Award logo" onError={(event) => withFallback(event, FALLBACKS.card)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="desktop-only"><DesktopFooter /></div>
      <div className="mobile-only"><MobileFooter /></div>
    </main>
  );
}
