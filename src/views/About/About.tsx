import React from "react";
import imageTdyk from "assets/tdyk.jpg";
import imageMusic from "assets/music.jpg";

const About: React.FC = () => (
  <section className="about">
    <article className="about__wrapper">
      <h1 className="heading heading--level2">About me</h1>
      <p className="paragraph">
        Hello and welcome to my site. My name is Adrian Bece and I collect
        oldschool rock and metal CDs. I am really passionate about it so I
        created this site to keep track of my collection and share it with the
        world.
      </p>
      <p className="paragraph">
        Some of the questions you might have are: "What's the story behind this
        hobby?" or "Why CDs and not LPs?" or "Do you have any crazy rare CDs?".
        Read on.
      </p>

      <img
        className="image about__image"
        src={imageMusic}
        alt="My music gear"
      />

      <h2 className="heading heading--level3">Humble beginnings</h2>
      <p className="paragraph">
        My story starts around 2001, While most of my peers were into
        Card-Collecting Games (CCGs), I wanted to spend little money I had on
        something that I will enjoy longer than one summer. As I was a music
        buff even back then, I got my first music CD. It was AC/DC's "For those
        about to rock". During the next 14 years, I managed to collect few more
        CDs with little money I had or I've been gifted for holidays, but after
        I got my first proper job, I could have properly engage in my hobby and
        my collection grew exponentially.
      </p>

      <p className="paragraph">
        About the LP question... I may start collect LPs in the future, once I
        get a proper LP player. But I am collecting CDs primarily.
      </p>

      <h2 className="heading heading--level3">The Devil You Know</h2>
      <p className="paragraph">
        Around 2007, there was a lot of buzz around Black Sabbath. Dio-era
        lineup has just reunited and they begin touring the world under the
        moniker "Heaven & Hell", named after first Dio-era Black Sabbath album
        that gave the band new life and set the world on fire. With the world
        tour being a major success, the band decided to record an album.
      </p>
      <p className="paragraph">
        In early 2009. I was really active on an Black Sabbath fan site. An
        competition was announced a few months before album release date.
        Several lucky winners would get the following award:
      </p>
      <p className="paragraph">
        New album and an booklet with autographs by all members of the band:{" "}
        <br />
        Tony Iommi - the creator of heavy metal and a guitar legend, <br />
        Ronnie James Dio - arguably one of the most powerful voices in metal
        history, <br /> Geezer Butler - one of the best bass players in rock and
        metal, <br /> Vinny Appice - an absolutely great drummer.
      </p>
      <p className="paragraph">
        Competition rules required people to submit their design on the album
        artwork. Even though this artwork won't be used on the album, the
        winners would be hand-picked by the guitar legend himself, Tony Iommi.
      </p>

      <p className="paragraph">
        And somehow...{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.black-sabbath.com/2009/04/devil_you_know_cover_art_winners/"
        >
          I was picked as one of the winners... by Tony Iommi.
        </a>{" "}
        And I was the only non-US winner.
      </p>
      <img
        className="image about__image"
        src={imageTdyk}
        alt='Heaven & Hell - "The Devil you know" autographed by the members of the band'
      />

      <p className="paragraph">
        Suffices to say, this is the best thing I own in my collection and one
        of my proudest moments.
      </p>
    </article>
  </section>
);

export default About;
