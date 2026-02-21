import './App.css'
import Photo from './assets/pikar.png'
// import GitHub from './components/GitHub'

function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="portfolio">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">Portfolio</div>
        <ul className="nav-links">
          <li><button onClick={() => scrollTo('hero')}>Home</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
          <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-photo">
            <img src={Photo} alt="Pikar" />
          </div>
          <h1>Halo, Saya <span className="highlight">NelsFikar</span></h1>
          <p className="hero-subtitle">Web Developer & Designer</p>
          <button className="cta-button" onClick={() => scrollTo('contact')}>
            Hubungi Saya
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
              Saya adalah seorang web developer yang passionate dalam membangun
              aplikasi web modern dan responsif. Dengan pengalaman dalam
              berbagai teknologi front-end dan back-end, saya selalu berusaha
              menciptakan solusi digital yang efektif dan menarik.
            </p>
            <div className="skills">
              <span className="skill-tag">React</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML & CSS</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Git</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">🌐</div>
              <h3>Website Portfolio</h3>
              <p>Landing page portfolio pribadi yang dibangun dengan React dan TypeScript.</p>
              <div className="project-tags">
                <span>React</span>
                <span>TypeScript</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">🛒</div>
              <h3>E-Commerce App</h3>
              <p>Aplikasi e-commerce lengkap dengan fitur keranjang belanja dan pembayaran.</p>
              <div className="project-tags">
                <span>React</span>
                <span>Node.js</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-icon">📱</div>
              <h3>Task Manager</h3>
              <p>Aplikasi manajemen tugas dengan fitur drag & drop dan notifikasi.</p>
              <div className="project-tags">
                <span>TypeScript</span>
                <span>CSS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <GitHub /> */}

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <p className="contact-subtitle">Tertarik untuk bekerja sama? Hubungi saya!</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Nama" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Pesan" rows={5} required></textarea>
            <button type="submit" className="cta-button">Kirim Pesan</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Dayat. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
