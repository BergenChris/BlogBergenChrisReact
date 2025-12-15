import "./about.css"

function About() { 

    return (
      <div className="blog-page-container">
        <header className="blog-header">
          <h1>Over Mij</h1>
          <p>
            Welkom op de over mij pagina van mijn blog!
          </p>
        </header>
        <main>
          <h2>Wie ben ik?</h2>
          <p>
            Ik ben Chris Bergen, student graduaat programmeren te AP-Hogeschool
            Antwerpen. Momenteel in mijn WPL-stage bij DeskDrive.
            Vanaf februari zou ik dan klaar zijn voor de arbeidsmarkt.
          </p>
          <h2>Mijn Blog</h2>
          <p>
            Op mijn blog komen leuke en minder leuke momenten tijdens mijn
            carriere, zodat jullie kunnen zien wat het inhoudt om als nieuwe IT'er in het werkveld te komen.
            Mijn blog zal obstakels bevatten die ik ben tegengekomen, maar ook hoe ik ermee om ben gegaan en ze heb overwonnen.
          </p>
          <h2>Contact</h2>
          <p>
            Als je vragen hebt of gewoon contact wilt opnemen, aarzel dan niet
            om mij een bericht te sturen via <a href="mailto:chris.bergen@student.ap.be">email </a>
            of op mijn <a href="https://be.linkedin.com/in/chris-bergen-68233a271" target="_blank"  >
              Linkedin-profiel
            </a> .
          </p>
        </main>
      </div>
    );

}

export default About;
