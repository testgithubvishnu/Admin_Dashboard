//import "./index.css";
export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>we are the best mobile/iphone sellers</p>
              <h1>Welcome to Rashmika Mobiles</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptate deleniti quia iste, quis maxime error. Quas odit vitae
                deleniti quae voluptatum, natus dolores praesentium alias odit
                libero reprehenderit tenetur similique excepturi explicabo modi
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect to us</button>
                </a>
                <a href="/services">
                  <button className="btn">Learn More Now</button>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="#" alt="" width="400" height="500" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
