
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";

import {
  Coffee,
  IceCreamBowl,
  GlassWater,
  Flame,
  Snowflake,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Menu as MenuIcon,
  X,
  ArrowRight,
  Star,
  Volume2,
  VolumeX,
  Camera,
  Users,
  MessageCircle,
} from "lucide-react";

import "./styles.css";

/* =========================
   PRODUCT CATEGORIES
========================= */

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Popular", icon: Star },
  { name: "Milk Tea", icon: GlassWater },
  { name: "Hot Tea", icon: Flame },
  { name: "Iced Tea", icon: Snowflake },
  { name: "Americano", icon: Coffee },
  { name: "Espresso", icon: Coffee },
  { name: "Ice Cream", icon: IceCreamBowl },
];

/* =========================
   PRODUCTS
========================= */

const products = [
  {
    id: 1,
    name: "Brown Sugar Pearl Milk Tea",
    category: "Milk Tea",
    price: 850,
    popular: true,
    description:
      "Creamy milk tea layered with caramelized brown sugar and chewy tapioca pearls.",
    image: "/products/brown-sugar-milk-tea.png",
    sizes: "Regular / Large",
    options: "Sugar 0–100%, pearls, jelly",
  },
  {
    id: 2,
    name: "Classic Ceylon Milk Tea",
    category: "Milk Tea",
    price: 700,
    popular: true,
    description:
      "Strong Ceylon tea softened with velvety milk and a touch of sweetness.",
    image: "/products/ceylon-milk-tea.png",
    sizes: "Regular / Large",
    options: "Hot or iced, sugar 0–100%",
  },
  {
    id: 3,
    name: "Honey Lemon Hot Tea",
    category: "Hot Tea",
    price: 620,
    popular: false,
    description:
      "Bright citrus, soothing honey and fragrant tea served warm.",
    image: "/products/honey-lemon-tea.png",
    sizes: "Regular",
    options: "Extra honey, ginger",
  },
  {
    id: 4,
    name: "Peach Paradise Iced Tea",
    category: "Iced Tea",
    price: 760,
    popular: true,
    description:
      "A refreshing peach tea with citrus notes and crystal-clear ice.",
    image: "/products/peach-iced-tea.png",
    sizes: "Regular / Large",
    options: "Less ice, jelly add-on",
  },
  {
    id: 5,
    name: "Golden Citrus Americano",
    category: "Americano",
    price: 780,
    popular: false,
    description:
      "Bold espresso, chilled water and a bright citrus twist.",
    image: "/products/citrus-americano.png",
    sizes: "Regular / Large",
    options: "Hot or iced, extra shot",
  },
  {
    id: 6,
    name: "Double Velvet Espresso",
    category: "Espresso",
    price: 590,
    popular: true,
    description:
      "A rich double shot with a silky crema and deep cocoa aroma.",
    image: "/products/double-espresso.png",
    sizes: "Single / Double",
    options: "Extra shot, brown sugar",
  },
  {
    id: 7,
    name: "Vanilla Bean Cloud",
    category: "Ice Cream",
    price: 690,
    popular: false,
    description:
      "Smooth vanilla bean ice cream finished with golden caramel.",
    image: "/products/vanilla-ice-cream.png",
    sizes: "Single / Double scoop",
    options: "Caramel, chocolate, nuts",
  },
  {
    id: 8,
    name: "Chocolate Coffee Affogato",
    category: "Ice Cream",
    price: 890,
    popular: true,
    description:
      "Vanilla ice cream drowned in fresh espresso and dark chocolate.",
    image: "/products/coffee-affogato.png",
    sizes: "Standard",
    options: "Extra espresso, nuts",
  },
  {
    id: 9,
    name: "Jasmine Moon Tea",
    category: "Hot Tea",
    price: 640,
    popular: false,
    description:
      "Delicate jasmine aroma with a clean, calming finish.",
    image: "/products/jasmine-tea.png",
    sizes: "Pot for one",
    options: "Honey, lemon",
  },
  {
    id: 10,
    name: "Caramel Cream Iced Coffee",
    category: "Americano",
    price: 920,
    popular: true,
    description:
      "Chilled coffee with caramel, cream and a soft foam cap.",
    image: "/products/caramel-iced-coffee.png",
    sizes: "Regular / Large",
    options: "Less ice, oat milk",
  },
  {
    id: 11,
    name: "Strawberry Milk Tea",
    category: "Milk Tea",
    price: 840,
    popular: false,
    description:
      "Fruity strawberry milk tea with a creamy, playful finish.",
    image: "/products/strawberry-milk-tea.png",
    sizes: "Regular / Large",
    options: "Pearls, jelly, less ice",
  },
  {
    id: 12,
    name: "Coconut Espresso Float",
    category: "Espresso",
    price: 950,
    popular: false,
    description:
      "Espresso over coconut ice cream for a tropical coffee finish.",
    image: "/products/coconut-espresso-float.png",
    sizes: "Standard",
    options: "Extra shot, toasted coconut",
  },
];

/* =========================
   INTRO SECTION
========================= */

function Intro({ onEnter }) {
  const [muted, setMuted] = useState(true);

  const introRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const introElement = introRef.current;
    const videoElement = videoRef.current;

    if (!introElement || !videoElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoElement.play().catch(() => {
            // Some browsers may block playback until user interaction.
          });
        } else {
          videoElement.pause();
          videoElement.muted = true;
          setMuted(true);
        }
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(introElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSound = () => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    const newMutedState = !muted;

    videoElement.muted = newMutedState;
    setMuted(newMutedState);

    if (!newMutedState) {
      videoElement.play().catch(() => {
        videoElement.muted = true;
        setMuted(true);
      });
    }
  };

  return (
    <section
      ref={introRef}
      id="intro"
      className="intro-screen"
      aria-label="Flavor Heaven cinematic introduction"
    >
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/videos/flavor-heaven-intro.mp4"
          type="video/mp4"
        />

        Your browser does not support video playback.
      </video>

      <div className="intro-overlay" />

      <button
        type="button"
        className="sound-button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="intro-content">
        <p className="eyebrow">Welcome to</p>

        <h1>Flavor Heaven</h1>

        <p>Where every sip feels extraordinary.</p>

        <button
          type="button"
          className="primary-button"
          onClick={onEnter}
        >
          Enter the Experience
          <ArrowRight size={18} />
        </button>
      </div>

      <button
        type="button"
        className="scroll-down-button"
        onClick={onEnter}
        aria-label="Scroll to home section"
      >
        <span>Scroll to discover</span>
        <span className="scroll-arrow">↓</span>
      </button>
    </section>
  );
}

/* =========================
   MAIN APPLICATION
========================= */

function App() {
  const [mobileNav, setMobileNav] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (filter === "All") {
        return true;
      }

      if (filter === "Popular") {
        return item.popular;
      }

      return item.category === filter;
    });
  }, [filter]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setMobileNav(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const goTo = (id) => {
    setMobileNav(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const enterSite = () => {
    goTo("home");
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    alert(
      "Thank you! Your message form is ready to be connected to an email service."
    );

    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      {/* Cinematic intro appears first and remains scrollable */}
      <Intro onEnter={enterSite} />

      {/* Navigation */}
      <header className="navbar">
        <button
          type="button"
          className="brand"
          onClick={() => goTo("home")}
          aria-label="Go to home section"
        >
          <img
            src="/images/flavor-heaven-logo.png"
            alt="Flavor Heaven logo"
            className="brand-logo"
          />

          <span className="brand-name">Flavor Heaven</span>
        </button>

        <nav className={mobileNav ? "nav-links open" : "nav-links"}>
          {["home", "menu", "about", "contact"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => goTo(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo("intro")}
          >
            Intro
          </button>

          <a
            className="nav-order"
            href="https://wa.me/94770000000?text=Hello%20Flavor%20Heaven!%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noreferrer"
          >
            Order Now
          </a>
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileNav((current) => !current)}
          aria-label="Toggle navigation"
        >
          {mobileNav ? <X /> : <MenuIcon />}
        </button>
      </header>

      <main>
        {/* Home */}
        <section
          id="home"
          className="hero section-anchor"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Handcrafted in every cup
            </p>

            <h1>
              Discover the art of <em>perfect flavor.</em>
            </h1>

            <p className="hero-text">
              From bold espresso to silky milk tea and heavenly desserts,
              every creation is made with care, premium ingredients and a
              little golden magic.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => goTo("menu")}
              >
                Explore Menu
                <ArrowRight size={18} />
              </button>

              
            </div>

            <div className="stats">
              <div>
                <strong>50+</strong>
                <span>Menu items</span>
              </div>

              <div>
                <strong>13+</strong>
                <span>Years of trust</span>
              </div>

              <div>
                <strong>1000+</strong>
                <span>Happy guests</span>
              </div>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section
          id="menu"
          className="menu-section section-anchor"
        >
          <div className="section-heading centered">
            <p className="eyebrow">Taste the collection</p>

            <h2>
              Explore our products, <em>made with love.</em>
            </h2>

            <p>
              Filter by category and discover your next favourite drink or
              dessert.
            </p>
          </div>

          <div
            className="category-bar"
            role="tablist"
            aria-label="Product categories"
          >
            {categories.map(({ name, icon: Icon }) => (
              <button
                type="button"
                key={name}
                className={filter === name ? "active" : ""}
                onClick={() => setFilter(name)}
                role="tab"
                aria-selected={filter === name}
              >
                <Icon size={19} />
                <span>{name}</span>
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >
                <div className="card-badges">
                  {product.popular ? <span>Popular</span> : <span />}

                  <span>{product.category}</span>
                </div>

                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                <div className="product-body">
                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="product-footer">
                    <strong>LKR {product.price.toLocaleString()}</strong>

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section section-anchor">
  <div className="about-visual">
    

    <div className="about-logo-box">
      <img
        src="/images/flavor-heaven-logo.png"
        alt="Flavor Heaven logo"
        className="about-logo"
      />
    </div>

    <div className="year-badge">
      <strong>2013</strong>
      <span>Established</span>
    </div>

    <div className="trust-badge">
      <strong>13+</strong>
      <span>Years of Trust</span>
    </div>
  </div>

  <div className="about-card">
    <p className="eyebrow">Our Story</p>

    <h2>
      A little café with a <em>big heart.</em>
    </h2>

    <p>
      Flavor Heaven began with one simple belief: a wonderful drink can
      brighten an ordinary day. We combine premium ingredients, carefully
      developed recipes and warm service to create memorable experiences.
    </p>

    <div className="values">
      <div>
        <Sparkles />

        <span>
          <strong>Premium ingredients</strong>
          Carefully selected for freshness, flavour and consistency.
        </span>
      </div>

      <div>
        <Coffee />

        <span>
          <strong>Handcrafted daily</strong>
          Every drink is prepared with attention and care.
        </span>
      </div>

      <div>
        <Star />

        <span>
          <strong>Warm hospitality</strong>
          A welcoming place to meet, relax and enjoy.
        </span>
      </div>
    </div>
  </div>
</section>

        {/* Testimonial */}
        <section className="testimonial-section">
          <p className="eyebrow">Loved by our guests</p>

          <blockquote>
            “The brown sugar milk tea is dangerously good. The café feels
            premium, but still warm and friendly.”
          </blockquote>

          <div className="stars">★★★★★</div>

          <span>— A happy Flavor Heaven customer</span>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="contact-section section-anchor"
        >
          <div className="contact-copy">
            <p className="eyebrow">Visit Flavor Heaven</p>

            <h2>
              Let’s talk over <em>a cup.</em>
            </h2>

            <p>
              Come by for your favourite drink, message us for an order, or
              send a note through the form.
            </p>

            <div className="contact-list">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin />

                <span>
                  <strong>Address</strong>
                  123 Café Street, Colombo, Sri Lanka
                </span>
              </a>

              <a href="tel:+94770000000">
                <Phone />

                <span>
                  <strong>Phone</strong>
                  +94 77 000 0000
                </span>
              </a>

              <a href="mailto:hello@flavorheaven.lk">
                <Mail />

                <span>
                  <strong>Email</strong>
                  hello@flavorheaven.lk
                </span>
              </a>

              <div>
                <Clock3 />

                <span>
                  <strong>Opening hours</strong>
                  Daily, 8:00 AM – 10:00 PM
                </span>
              </div>
            </div>

            <div className="socials">
              <a
                href="#instagram"
                aria-label="Instagram"
              >
                <Camera />
              </a>

              <a
                href="#facebook"
                aria-label="Facebook"
              >
                <Users />
              </a>

              <a
                href="https://wa.me/94770000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle />
              </a>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            <div className="form-row">
              <label>
                Full name

                <input
                  name="name"
                  required
                  placeholder="Your name"
                />
              </label>

              <label>
                Phone

                <input
                  name="phone"
                  required
                  placeholder="07X XXX XXXX"
                />
              </label>
            </div>

            <label>
              Email

              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </label>

            <label>
              Subject

              <input
                name="subject"
                required
                placeholder="How can we help?"
              />
            </label>

            <label>
              Message

              <textarea
                name="message"
                required
                rows="5"
                placeholder="Write your message here..."
              />
            </label>

            <button
              className="primary-button"
              type="submit"
            >
              Send Message
              <ArrowRight size={18} />
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="brand footer-brand">
          <img
            src="/images/flavor-heaven-logo.png"
            alt="Flavor Heaven logo"
            className="brand-logo"
          />

          <span className="brand-name">Flavor Heaven</span>
        </div>

        <p>Crafted with love. Served with happiness.</p>

        <span>
          © {new Date().getFullYear()} Flavor Heaven. All rights reserved.
        </span>
      </footer>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setSelectedProduct(null)}
          role="presentation"
        >
          <div
            className="product-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <X />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div>
              <span className="modal-category">
                {selectedProduct.category}
              </span>

              <h2 id="product-modal-title">
                {selectedProduct.name}
              </h2>

              <p>{selectedProduct.description}</p>

              <dl>
                <div>
                  <dt>Sizes</dt>
                  <dd>{selectedProduct.sizes}</dd>
                </div>

                <div>
                  <dt>Options</dt>
                  <dd>{selectedProduct.options}</dd>
                </div>
              </dl>

              <strong className="modal-price">
                LKR {selectedProduct.price.toLocaleString()}
              </strong>

              <a
                className="primary-button"
                href={`https://wa.me/94770000000?text=${encodeURIComponent(
                  `Hello Flavor Heaven! I would like to order ${selectedProduct.name}.`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   RENDER APPLICATION
========================= */

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element was not found. Make sure index.html contains <div id="root"></div>.'
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);