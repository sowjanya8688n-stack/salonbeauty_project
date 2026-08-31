// // 
// import { Link } from "react-router-dom";
// import "./styles/Hero.css";

// function Hero() {
//   return (
//     <section className="hero">

//       <div className="hero-circle circle-one"></div>
//       <div className="hero-circle circle-two"></div>

//       <div className="hero-container">

//         {/* LEFT SIDE */}
//         <div className="hero-content">

//           <div className="hero-badge">
//             ✨ Premium Beauty Experience
//           </div>

//           <p className="eyebrow">
//             WELCOME TO SALONBEAUTY
//           </p>

//           <h1>
//             Beauty Begins
//             <br />
//             With <span>Confidence.</span>
//           </h1>

//           <p className="hero-text">
//             Experience professional salon and beauty services
//             created especially for you. Discover hair care,
//             skincare, makeup and premium beauty treatments and
//             book your appointment in just a few clicks.
//           </p>

//           <div className="hero-actions">

//             <Link
//               to="/services"
//               className="hero-btn primary-btn"
//             >
//               Explore Services
//               <span>→</span>
//             </Link>

//             <Link
//               to="/booking"
//               className="hero-btn secondary-btn"
//             >
//               📅 Book Appointment
//             </Link>

//           </div>

//           {/* FEATURES */}
//           <div className="hero-features">

//             <div className="feature-box">
//               <div className="feature-icon">
//                 💄
//               </div>

//               <div>
//                 <h4>Premium Products</h4>
//                 <p>Quality beauty care</p>
//               </div>
//             </div>

//             <div className="feature-box">
//               <div className="feature-icon">
//                 ⭐
//               </div>

//               <div>
//                 <h4>4.9 Rating</h4>
//                 <p>Loved by clients</p>
//               </div>
//             </div>

//             <div className="feature-box">
//               <div className="feature-icon">
//                 💖
//               </div>

//               <div>
//                 <h4>Expert Care</h4>
//                 <p>Professional services</p>
//               </div>
//             </div>

//           </div>

//         </div>


//         {/* RIGHT SIDE */}
//         <div className="beauty-products-section">

//           <div className="beauty-background"></div>

//           <div className="beauty-products-card">

//             <img
//               src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90"
//               alt="Group of beauty and makeup products"
//               className="beauty-products-image"
//             />

//             <div className="image-overlay"></div>

//             <div className="product-title">
//               <span>Premium Collection</span>
//               <h3>Beauty Essentials</h3>
//             </div>

//           </div>


//           {/* TOP CARD */}
//           <div className="beauty-floating-card top-card">

//             <div className="floating-icon">
//               💄
//             </div>

//             <div>
//               <strong>Premium Beauty</strong>
//               <p>Top quality products</p>
//             </div>

//           </div>


//           {/* BOTTOM CARD */}
//           <div className="beauty-floating-card bottom-card">

//             <div className="floating-icon pink-icon">
//               ✨
//             </div>

//             <div>
//               <strong>Glow Naturally</strong>
//               <p>Professional beauty care</p>
//             </div>

//           </div>


//           {/* DISCOUNT BADGE */}
//           <div className="offer-badge">

//             <span>UP TO</span>

//             <strong>30%</strong>

//             <p>Beauty Offers</p>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Hero;
import { Link } from "react-router-dom";
import "./styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-circle circle-one"></div>
      <div className="hero-circle circle-two"></div>

      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-content">

          <div className="hero-badge">
            ✨ Premium Beauty Experience
          </div>

          <p className="eyebrow">
            WELCOME TO SALONBEAUTY
          </p>

          <h1>
            Beauty Begins
            <br />
            With <span>Confidence.</span>
          </h1>

          <p className="hero-text">
            Experience professional salon and beauty services
            created especially for you. Discover hair care,
            skincare, makeup and premium beauty treatments and
            book your appointment in just a few clicks.
          </p>

          <div className="hero-actions">

            <Link
              to="/services"
              className="hero-btn primary-btn"
            >
              Explore Services
              <span>→</span>
            </Link>

            <Link
              to="/booking"
              className="hero-btn secondary-btn"
            >
              📅 Book Appointment
            </Link>

          </div>

          {/* FEATURES */}
          <div className="hero-features">

            <div className="feature-box">
              <div className="feature-icon">
                💇‍♀️
              </div>

              <div>
                <h4>Expert Stylists</h4>
                <p>Professional care</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                ⭐
              </div>

              <div>
                <h4>4.9 Rating</h4>
                <p>Loved by clients</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                💖
              </div>

              <div>
                <h4>Premium Care</h4>
                <p>Quality services</p>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE SALON IMAGE */}
        <div className="salon-image-section">

          <div className="salon-background"></div>

          <div className="salon-image-card">

            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90"
              alt="Modern professional beauty salon"
              className="salon-image"
            />

            <div className="salon-overlay"></div>

            <div className="salon-image-text">
              <span>WELCOME TO</span>

              <h3>
                SalonBeauty
              </h3>

              <p>
                Relax • Refresh • Glow
              </p>
            </div>

          </div>


          {/* RATING CARD */}
          <div className="salon-floating-card rating-card">

            <div className="floating-icon">
              ⭐
            </div>

            <div>
              <strong>4.9 / 5</strong>
              <p>Customer Rating</p>
            </div>

          </div>


          {/* STYLIST CARD */}
          <div className="salon-floating-card stylist-card">

            <div className="floating-icon pink-icon">
              💇‍♀️
            </div>

            <div>
              <strong>Expert Stylists</strong>
              <p>Professional beauty care</p>
            </div>

          </div>


          {/* CLIENT BADGE */}
          <div className="clients-badge">

            <strong>
              1000+
            </strong>

            <div>
              <span>
                Happy
              </span>

              <p>
                Clients
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;