export default function About() {
  return (
    <div style={{ backgroundColor: "#FFFAF5", minHeight: "100vh" }}>

      {/* Hero Section */}
      <div style={{ backgroundColor: "#FEF7F0", padding: "100px 48px 80px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", letterSpacing: "0.35em", color: "#C45E0A", marginBottom: "20px" }}>
          OUR STORY
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "56px", color: "#7B1818", marginBottom: "20px" }}>
          Art is not a luxury. It is a language.
        </h1>
        <div style={{ height: "1px", width: "240px", background: "linear-gradient(90deg, transparent, #C45E0A, transparent)", margin: "0 auto 24px" }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "26px", color: "#A07850", marginBottom: "24px" }}>
          Where every stroke tells a story
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "20px", color: "#5A3A20", maxWidth: "640px", margin: "0 auto", lineHeight: "1.9" }}>
          ChitraSangam Arts was born from one simple belief. That every artist deserves
          to be seen, and every home deserves to have a story on its walls.
        </p>
      </div>

      {/* 4 Story Blocks */}
      <div style={{ padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "32px", maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "16px", padding: "40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", color: "#C45E0A", marginBottom: "12px", lineHeight: "1", filter: "opacity(0.3)" }}>01</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "16px" }}>
              The Artists Behind Every Painting
            </h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#5A3A20", lineHeight: "1.9" }}>
              Every painting on ChitraSangam Arts is made by a real artist from Mumbai.
              Someone who has spent years learning their craft, mixing colors at midnight,
              and pouring their heart into every stroke. These are not factory paintings.
              These are stories painted by hand.
            </p>
          </div>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "16px", padding: "40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", color: "#C45E0A", marginBottom: "12px", lineHeight: "1", filter: "opacity(0.3)" }}>02</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "16px" }}>
              Why We Started
            </h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#5A3A20", lineHeight: "1.9" }}>
              We saw talented artists struggling to find buyers, and people who wanted
              original art but did not know where to find it. ChitraSangam Arts is the
              bridge connecting passionate artists with people who appreciate real,
              handmade, original work.
            </p>
          </div>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "16px", padding: "40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", color: "#C45E0A", marginBottom: "12px", lineHeight: "1", filter: "opacity(0.3)" }}>03</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "16px" }}>
              Our Promise to Artists
            </h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#5A3A20", lineHeight: "1.9" }}>
              Every artist on our platform is paid fairly and on time within 2 days of
              delivery confirmation. We believe that when an artist thrives, better art
              is created. Their success is our success and every purchase you make
              directly supports a real persons livelihood.
            </p>
          </div>

          <div style={{ backgroundColor: "#fff", border: "1px solid #E8D5C0", borderRadius: "16px", padding: "40px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", color: "#C45E0A", marginBottom: "12px", lineHeight: "1", filter: "opacity(0.3)" }}>04</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7B1818", marginBottom: "16px" }}>
              Art for Every Home
            </h3>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "#5A3A20", lineHeight: "1.9" }}>
              Not everyone can afford to buy art permanently and that is why we offer
              renting too. We want every home to experience the warmth of original art,
              even if just for a few days. Art should be for everyone, not just collectors.
            </p>
          </div>

        </div>
      </div>

      {/* Contact Bar */}
      <div style={{ backgroundColor: "#1A0A04", padding: "64px 48px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "38px", color: "#F4A030", marginBottom: "28px" }}>
          Get in touch with us
        </h2>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/917208567930"
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: "#25D366", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "18px", padding: "16px 36px", borderRadius: "4px", textDecoration: "none" }}
          >
            WhatsApp
          </a>
          <a
            href="tel:7208567930"
            style={{ backgroundColor: "#C45E0A", color: "#fff", fontFamily: "'Cinzel', serif", fontSize: "18px", padding: "16px 36px", borderRadius: "4px", textDecoration: "none" }}
          >
            7208567930
          </a>
          <a
            href="mailto:alexshah8168911@gmail.com"
            style={{ backgroundColor: "transparent", color: "#F4A030", fontFamily: "'Cinzel', serif", fontSize: "18px", padding: "16px 36px", border: "1px solid #F4A030", borderRadius: "4px", textDecoration: "none" }}
          >
            alexshah8168911@gmail.com
          </a>
        </div>
      </div>

    </div>
  );
}