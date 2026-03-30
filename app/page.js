"use client";

import { useEffect, useState } from "react";

const ASSETS = {
  logo: "https://www.figma.com/api/mcp/asset/da15dba7-18d2-4fd5-8c42-5515a244b48c",
  logoMobile: "https://www.figma.com/api/mcp/asset/da15dba7-18d2-4fd5-8c42-5515a244b48c",
  iconSearch: "https://www.figma.com/api/mcp/asset/1028c650-b686-42d6-b21a-cd3eb908ea71",
  iconBag: "https://www.figma.com/api/mcp/asset/5f93fabd-87b0-48a8-9870-d8e21610b73a",
  iconAccount: "https://www.figma.com/api/mcp/asset/a38cda0a-8d0d-42aa-9ba1-dc23d67370f7",
  heroSales: "https://www.figma.com/api/mcp/asset/585af39a-6f6f-43ef-a2f5-5427673a62a9",
  heroSalesMobile: "https://www.figma.com/api/mcp/asset/585af39a-6f6f-43ef-a2f5-5427673a62a9",
};

const ROBOT_SERIES = [
  {
    name: "J15 Max Ultra",
    image: "https://www.figma.com/api/mcp/asset/b1bd66ca-fc71-4147-a95d-9c2714495fb0",
    isNew: true,
  },
  {
    name: "J15 Evo Ultra",
    image: "https://www.figma.com/api/mcp/asset/0ac017c7-2584-46a9-a91c-5e4d1d1545bf",
    isNew: true,
  },
  {
    name: "J15 Pro Ultra",
    image: "https://www.figma.com/api/mcp/asset/d6b374a7-f689-4778-bd9b-e23dcf600e67",
  },
  {
    name: "J15 Ultra",
    image: "https://www.figma.com/api/mcp/asset/6a7e3c16-1b6b-4df6-8c8c-8887c3572958",
  },
  {
    name: "J12 Ultra",
    image: "https://www.figma.com/api/mcp/asset/ac509f3a-ea30-4c5c-b670-090099a60a90",
  },
];

const E_SERIES = [
  {
    name: "E20 Evo Plus",
    image: "https://www.figma.com/api/mcp/asset/ab7a0e75-4e39-4897-8d4b-783fe943562e",
    isNew: true,
  },
  {
    name: "E20 Plus",
    image: "https://www.figma.com/api/mcp/asset/6fb11eda-c8e9-443d-b6d0-c4326ac10e8e",
  },
];

const WET_DRY_PRODUCTS = [
  {
    name: "FloorShine 880",
    image: "https://www.figma.com/api/mcp/asset/f235ea45-1c28-41e5-937e-356ac2f55738",
    isNew: true,
  },
  {
    name: "FloorShine 460",
    image: "https://www.figma.com/api/mcp/asset/0bbc650c-077e-477d-a9a7-8e8f38189de3",
    isNew: true,
  },
  {
    name: "NEW 400",
    image: "https://www.figma.com/api/mcp/asset/b93a605d-4e31-43bc-ab57-d3612c339d3e",
  },
];

const BEST_FITS_SCENARIOS_DESKTOP = [
  {
    title: "Pet Owners",
    image: "https://www.figma.com/api/mcp/asset/05ebce6b-eb49-4abc-9f29-6dd6f614d018",
  },
  {
    title: "Family with Kids",
    image: "https://www.figma.com/api/mcp/asset/48cd117c-d53f-4a7c-8516-934cd4820747",
  },
  {
    title: "Large Homes",
    image: "https://www.figma.com/api/mcp/asset/90698e8f-1939-4675-ae55-686f5e869027",
  },
  {
    title: "Small Apartments",
    image: "https://www.figma.com/api/mcp/asset/0ccafb6d-5c8d-4fe0-ac38-ff8070ba5577",
  },
  {
    title: "Help me Choose",
    image: "https://www.figma.com/api/mcp/asset/8699d491-2801-498e-a1aa-4d13e1b0aec9",
    darkOverlay: true,
  },
];

const BEST_FITS_SCENARIOS_MOBILE = [
  {
    title: "Pet Owners",
    image: "https://www.figma.com/api/mcp/asset/05ebce6b-eb49-4abc-9f29-6dd6f614d018",
  },
  {
    title: "Family with Kids",
    image: "https://www.figma.com/api/mcp/asset/48cd117c-d53f-4a7c-8516-934cd4820747",
  },
  {
    title: "Large Homes",
    image: "https://www.figma.com/api/mcp/asset/90698e8f-1939-4675-ae55-686f5e869027",
  },
  {
    title: "Small Apartments",
    image: "https://www.figma.com/api/mcp/asset/0ccafb6d-5c8d-4fe0-ac38-ff8070ba5577",
  },
  {
    title: "Help me Choose",
    image: "https://www.figma.com/api/mcp/asset/8699d491-2801-498e-a1aa-4d13e1b0aec9",
    darkOverlay: true,
  },
];

const HOME_FITS = [
  {
    title: "Pet Owners",
    image: "https://www.figma.com/api/mcp/asset/c911ad71-6c4e-464b-89b0-88bc92ab2f40",
  },
  {
    title: "Family with Kids",
    image: "https://www.figma.com/api/mcp/asset/6f632982-eae3-4b15-afd2-c224ea621e83",
  },
  {
    title: "Large Homes",
    image: "https://www.figma.com/api/mcp/asset/bcc9502a-9ef6-4f7d-ac1f-d7e295c4ef3a",
  },
  {
    title: "Small Apartments",
    image: "https://www.figma.com/api/mcp/asset/9d340bc2-843f-4596-9e2b-dc38239fe8f6",
  },
  {
    title: "Help me Choose",
    image: "https://www.figma.com/api/mcp/asset/6c963183-fb3a-45a8-9746-53a6545468c1",
    darkOverlay: true,
  },
];

const SALES_COLUMNS = [
  {
    title: "Featured Sale",
    links: ["Spring Sale", "Bundle & Save"],
  },
  {
    title: "Offer",
    links: [
      "Subscribe - Get 10% OFF!",
      "Key Worker Discount",
      "Student & Youth Saving",
      "Senior Saving",
    ],
  },
  {
    title: "Loyalty",
    links: ["Eureka Rewards Program", "Redeem Rewards"],
  },
  {
    title: "New Product Launch",
    links: ["Z20 Ultra Preview"],
  },
];

const FALLBACKS = {
  logo: "/fallback/logo.svg",
  iconSearch: "/fallback/icon-search.svg",
  iconBag: "/fallback/icon-bag.svg",
  iconAccount: "/fallback/icon-account.svg",
  card: "/fallback/card.svg",
  hero: "/fallback/hero-sales.svg",
};

function withImageFallback(event, fallbackSrc) {
  if (event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackSrc;
}

function Logo({ mobile = false }) {
  if (mobile) {
    return (
      <span className="mobile-logo-slot" aria-label="Eureka">
        <img
          className="eureka-logo"
          src={ASSETS.logoMobile}
          alt="Eureka"
          onError={(event) => withImageFallback(event, FALLBACKS.logo)}
        />
      </span>
    );
  }

  return (
    <img
      className="eureka-logo"
      src={ASSETS.logo}
      alt="Eureka"
      onError={(event) => withImageFallback(event, FALLBACKS.logo)}
    />
  );
}

function HeaderIcons() {
  return (
    <div className="header-icons">
      <button className="icon-btn icon-search" aria-label="Search">
        <img
          src={ASSETS.iconSearch}
          alt=""
          onError={(event) => withImageFallback(event, FALLBACKS.iconSearch)}
        />
      </button>
      <button className="icon-btn icon-bag" aria-label="Bag">
        <img
          src={ASSETS.iconBag}
          alt=""
          onError={(event) => withImageFallback(event, FALLBACKS.iconBag)}
        />
      </button>
      <button className="icon-btn icon-account" aria-label="Account">
        <img
          src={ASSETS.iconAccount}
          alt=""
          onError={(event) => withImageFallback(event, FALLBACKS.iconAccount)}
        />
      </button>
    </div>
  );
}

function ArrowBadge({ down = false }) {
  return (
    <span className={`arrow-badge${down ? " is-down" : ""}`} aria-hidden="true">
      <span>›</span>
    </span>
  );
}

function DesktopCard({ item }) {
  return (
    <article className="product-card desktop-card">
      <div className="product-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="product-image"
          onError={(event) => withImageFallback(event, FALLBACKS.card)}
        />
      </div>
      <p className="product-name">{item.name}</p>
      {item.isNew && <span className="product-new">New</span>}
    </article>
  );
}

function MobileCard({ item }) {
  return (
    <article className="product-card mobile-card">
      <div className="product-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="product-image"
          onError={(event) => withImageFallback(event, FALLBACKS.card)}
        />
      </div>
      <p className="product-name">{item.name}</p>
      {item.isNew && <span className="product-new">New</span>}
    </article>
  );
}

function FitScenarioCard({ item, compact = false, noDivider = false }) {
  return (
    <article className={`bestfits-scenario-card${compact ? " is-compact" : ""}`}>
      <button className="bestfits-scenario-image-wrap" type="button" aria-label={item.title}>
        <img
          src={item.image}
          alt={item.title}
          className="bestfits-scenario-image"
          onError={(event) => withImageFallback(event, FALLBACKS.card)}
        />
        {item.darkOverlay && <div className="bestfits-scenario-overlay" />}
      </button>
      <div className={`bestfits-scenario-meta${noDivider ? " no-divider" : ""}`}>
        <p className="bestfits-scenario-title">{item.title}</p>
        <span className="bestfits-scenario-arrow" aria-hidden="true">
          ›
        </span>
      </div>
    </article>
  );
}

function DesktopVacuumMenu({ vacuumCategory, onCategoryChange }) {
  const isRobot = vacuumCategory === "robot";
  const isWetDry = vacuumCategory === "wetdry";

  return (
    <section className="desktop-menu desktop-vacuum-menu">
      <aside className="desktop-side-menu">
        <button
          className={`side-item${isRobot ? " is-active" : ""}`}
          onClick={() => onCategoryChange("robot")}
          type="button"
        >
          Robot Vacuums <ArrowBadge />
        </button>
        <button
          className={`side-item${isWetDry ? " is-active" : ""}`}
          onClick={() => onCategoryChange("wetdry")}
          type="button"
        >
          Wet/Dry Cleaners <ArrowBadge />
        </button>
        <button className="side-item" type="button" onClick={() => onCategoryChange("robot")}>
          Stick Vacuums <ArrowBadge />
        </button>
      </aside>

      {isRobot && (
        <>
          <div className="desktop-vacuum-content">
            <div className="menu-row-head">
              <p className="menu-row-title">J Series</p>
              <button className="menu-link" type="button">
                All Robot Vacuums <span>›</span>
              </button>
            </div>
            <div className="desktop-card-grid">{ROBOT_SERIES.map((item) => <DesktopCard item={item} key={item.name} />)}</div>
            <p className="menu-row-title section-gap">E Series</p>
            <div className="desktop-card-grid desktop-card-grid-short">
              {E_SERIES.map((item) => (
                <DesktopCard item={item} key={item.name} />
              ))}
            </div>
          </div>

          <aside className="best-fit-panel">
            <p className="menu-row-title">Best Fits Your Home</p>
            <div className="fit-grid">
              {HOME_FITS.map((fit) => (
                <article className="fit-card" key={fit.title}>
                  <img
                    src={fit.image}
                    alt={fit.title}
                    onError={(event) => withImageFallback(event, FALLBACKS.card)}
                  />
                  {fit.darkOverlay && <div className="fit-overlay" />}
                  <p>{fit.title}</p>
                </article>
              ))}
            </div>
          </aside>
        </>
      )}

      {isWetDry && (
        <div className="desktop-vacuum-content wetdry-only">
          <div className="menu-row-head">
            <button className="menu-link" type="button">
              All Wet/Dry Cleaners <span>›</span>
            </button>
          </div>
          <div className="desktop-card-grid desktop-card-grid-short">
            {WET_DRY_PRODUCTS.map((item) => (
              <DesktopCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function DesktopBestFitsMenu() {
  return (
    <section className="desktop-menu desktop-bestfits-menu">
      {BEST_FITS_SCENARIOS_DESKTOP.map((scenario) => (
        <FitScenarioCard item={scenario} key={scenario.title} />
      ))}
    </section>
  );
}

function SalesColumnBlock({ column }) {
  if (!column) {
    return null;
  }

  return (
    <article className="sales-column">
      <h4>{column.title}</h4>
      <ul>
        {column.links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </article>
  );
}

function DesktopSalesMenu() {
  const featuredSaleColumn = SALES_COLUMNS.find((column) => column.title === "Featured Sale");
  const offerColumn = SALES_COLUMNS.find((column) => column.title === "Offer");
  const loyaltyColumn = SALES_COLUMNS.find((column) => column.title === "Loyalty");
  const newProductLaunchColumn = SALES_COLUMNS.find((column) => column.title === "New Product Launch");

  return (
    <section className="desktop-menu desktop-sales-menu">
      <div className="sales-columns">
        <div className="sales-primary-column">
          <SalesColumnBlock column={featuredSaleColumn} />
          <SalesColumnBlock column={newProductLaunchColumn} />
        </div>
        <SalesColumnBlock column={offerColumn} />
        <SalesColumnBlock column={loyaltyColumn} />
      </div>

      <aside className="sales-hero-wrap">
        <div className="sales-hero-image">
          <img
            src={ASSETS.heroSales}
            alt="Spring sale"
            onError={(event) => withImageFallback(event, FALLBACKS.hero)}
          />
        </div>
        <h3>
          Bloom Into Big Savings
          <br />
          Up To EUR400 Off This Spring
        </h3>
        <button className="menu-link" type="button">
          Shop Now <span>›</span>
        </button>
      </aside>
    </section>
  );
}

function MobileMenuRow({
  label,
  onClick,
  showArrow = true,
  selected = false,
  noBorder = false,
  rowIndex = 0,
}) {
  return (
    <button
      className={`mobile-menu-row${selected ? " is-selected" : ""}${noBorder ? " no-border" : ""}`}
      onClick={onClick}
      style={{ "--menu-row-index": rowIndex }}
      type="button"
    >
      <span>{label}</span>
      {showArrow && <ArrowBadge down={selected} />}
    </button>
  );
}

export default function Home() {
  const [desktopMenu, setDesktopMenu] = useState("vacuum");
  const [vacuumCategory, setVacuumCategory] = useState("robot");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePrimary, setMobilePrimary] = useState("none");
  const [mobileSalesExpanded, setMobileSalesExpanded] = useState({
    "Featured Sale": false,
    Offer: false,
    Loyalty: false,
    "New Product Launch": false,
  });

  const showDesktopVacuum = desktopMenu === "vacuum";
  const showDesktopSales = desktopMenu === "sales";
  const showDesktopBestFits = desktopMenu === "bestfits";

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 960px)");
    const previousOverflow = document.body.style.overflow;
    const applyOverflow = () => {
      document.body.style.overflow = mobileOpen && mediaQuery.matches ? "hidden" : previousOverflow;
    };

    applyOverflow();
    mediaQuery.addEventListener("change", applyOverflow);

    return () => {
      mediaQuery.removeEventListener("change", applyOverflow);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const resetMobilePanels = () => {
    setMobilePrimary("none");
    setMobileSalesExpanded({
      "Featured Sale": false,
      Offer: false,
      Loyalty: false,
      "New Product Launch": false,
    });
  };

  return (
    <main className="eureka-page">
      <section className="desktop-shell">
        <div className="top-banner">
          New member can earn 100 Eureka Points! <span>Register now</span> | All order can enjoy free shipping
        </div>

        <header className="desktop-header">
          <div className="desktop-left">
            <Logo />
            <nav className="desktop-nav" aria-label="Main">
              <button
                type="button"
                className={`desktop-nav-item${showDesktopVacuum ? " is-active" : ""}`}
                onMouseEnter={() => setDesktopMenu("vacuum")}
                onClick={() => setDesktopMenu("vacuum")}
              >
                Vacuum Cleaner
              </button>
              <button type="button" className="desktop-nav-item" onMouseEnter={() => setDesktopMenu("none")}>
                Accessories
              </button>
              <button type="button" className="desktop-nav-item" onMouseEnter={() => setDesktopMenu("none")}>
                About Eureka
              </button>
              <button type="button" className="desktop-nav-item" onMouseEnter={() => setDesktopMenu("none")}>
                Support
              </button>
              <button
                type="button"
                className={`desktop-nav-item${showDesktopBestFits ? " is-active" : ""}`}
                onMouseEnter={() => setDesktopMenu("bestfits")}
                onClick={() => setDesktopMenu("bestfits")}
              >
                Best Fits Your Home
              </button>
              <button
                type="button"
                className={`desktop-nav-item${showDesktopSales ? " is-active" : ""}`}
                onMouseEnter={() => setDesktopMenu("sales")}
                onClick={() => setDesktopMenu("sales")}
              >
                Sales &amp; Offers
              </button>
            </nav>
          </div>

          <div className="desktop-right">
            <HeaderIcons />
            <button type="button" className="shop-btn">
              Geschaft
            </button>
          </div>
        </header>

        {showDesktopVacuum && (
          <DesktopVacuumMenu vacuumCategory={vacuumCategory} onCategoryChange={setVacuumCategory} />
        )}
        {showDesktopBestFits && <DesktopBestFitsMenu />}
        {showDesktopSales && <DesktopSalesMenu />}
      </section>

      <section className="mobile-shell" data-menu-open={mobileOpen ? "true" : "false"}>
        <header className="mobile-header">
          <button
            className="menu-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => {
              setMobileOpen((current) => {
                const next = !current;
                if (!next) {
                  resetMobilePanels();
                }
                return next;
              });
            }}
            type="button"
          >
            <span className="menu-toggle-icon" aria-hidden="true">
              <span className="menu-toggle-bar menu-toggle-bar--top" />
              <span className="menu-toggle-bar menu-toggle-bar--bottom" />
            </span>
          </button>
          <Logo mobile />
          <HeaderIcons />
        </header>

        <div id="mobile-menu-panel" className="mobile-drawer" data-open={mobileOpen ? "true" : "false"} aria-hidden={!mobileOpen}>
          <div className="mobile-drawer-inner">
            <div className="mobile-drawer-content">
              <MobileMenuRow
                label="Vacuum Cleaner"
                rowIndex={0}
                selected={mobilePrimary === "vacuum"}
                onClick={() => {
                  setMobilePrimary((current) => (current === "vacuum" ? "none" : "vacuum"));
                  setMobileSalesExpanded({
                    "Featured Sale": false,
                    Offer: false,
                    Loyalty: false,
                    "New Product Launch": false,
                  });
                }}
              />

              {mobilePrimary === "vacuum" && (
                <section className="mobile-vacuum-panel">
                  <div className="menu-row-head">
                    <p className="menu-row-title">J Series</p>
                    <button className="menu-link" type="button">
                      All Robot Vacuums <span>›</span>
                    </button>
                  </div>

                  <div className="mobile-card-grid">
                    {ROBOT_SERIES.map((item) => (
                      <MobileCard item={item} key={item.name} />
                    ))}
                  </div>

                  <p className="menu-row-title section-gap">E Series</p>
                  <div className="mobile-card-grid">
                    {E_SERIES.map((item) => (
                      <MobileCard item={item} key={item.name} />
                    ))}
                  </div>
                </section>
              )}

              <MobileMenuRow label="Accessories" rowIndex={1} showArrow={false} onClick={() => {}} />
              <MobileMenuRow label="About Eureka" rowIndex={2} onClick={() => {}} />
              <MobileMenuRow label="Support" rowIndex={3} onClick={() => {}} />
              <MobileMenuRow
                label="Best Fits Your Home"
                rowIndex={4}
                selected={mobilePrimary === "bestfits"}
                onClick={() => {
                  setMobilePrimary((current) => (current === "bestfits" ? "none" : "bestfits"));
                  setMobileSalesExpanded({
                    "Featured Sale": false,
                    Offer: false,
                    Loyalty: false,
                    "New Product Launch": false,
                  });
                }}
              />

              {mobilePrimary === "bestfits" && (
                <section className="mobile-bestfits-panel">
                  {BEST_FITS_SCENARIOS_MOBILE.map((scenario) => (
                    <FitScenarioCard item={scenario} key={scenario.title} compact noDivider />
                  ))}
                </section>
              )}
              <MobileMenuRow
                label="Sales & Offers"
                rowIndex={5}
                selected={mobilePrimary === "sales"}
                onClick={() => {
                  setMobilePrimary((current) => (current === "sales" ? "none" : "sales"));
                  setMobileSalesExpanded({
                    "Featured Sale": false,
                    Offer: false,
                    Loyalty: false,
                    "New Product Launch": false,
                  });
                }}
              />

              {mobilePrimary === "sales" && (
                <section className="mobile-sales-panel">
                  <article className="mobile-hero">
                    <div className="mobile-hero-image">
                      <img
                        src={ASSETS.heroSalesMobile}
                        alt="Bloom into big savings"
                        onError={(event) => withImageFallback(event, FALLBACKS.hero)}
                      />
                    </div>
                    <h3>
                      Bloom Into Big Savings
                      <br />
                      Up To EUR400 Off This Spring
                    </h3>
                    <button className="menu-link" type="button">
                      Shop Now <span>›</span>
                    </button>
                  </article>

                  <div className="mobile-sub-menu">
                    {SALES_COLUMNS.map((column, index) => {
                      const isExpanded = mobileSalesExpanded[column.title];

                      return (
                        <div key={column.title}>
                          <MobileMenuRow
                            label={column.title}
                            rowIndex={6 + index}
                            selected={isExpanded}
                            onClick={() =>
                              setMobileSalesExpanded((current) => ({
                                ...current,
                                [column.title]: !current[column.title],
                              }))
                            }
                          />
                          {isExpanded && (
                            <div className="mobile-sub-links">
                              {column.links.map((link) => (
                                <p key={link}>{link}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            <div className="mobile-cta-wrap">
              <button className="mobile-cta" type="button">
                Sign up for Eureka
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
