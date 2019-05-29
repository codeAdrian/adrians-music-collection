import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import heroImage from "assets/hero.png";

const Home: React.FC = () => (
  <section className="hero container--pattern">
    <article className="hero__wrapper hero__wrapper--content">
      <div className="hero__inner">
        <h2 className="heading heading--level1">Long live rock 'n' roll</h2>
        <p className="paragraph hero__text">
          Collecting oldschool rock and metal CDs since childhood. Proud owner
          of some of the rare releases.
        </p>
        <Link className="button button--linkToButton button--cta" to="/albums">
          View Collection
        </Link>
      </div>
    </article>
    <article className="hero__wrapper hero__wrapper--image">
      <LazyLoad offsetVertical={0}>
        <img className="image hero__image" src={heroImage} alt="Adrian Bece" />
      </LazyLoad>
    </article>
  </section>
);

export default Home;
