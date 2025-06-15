// this infos on the buttom right of the screen 
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles.css'; // Correct import path for the CSS file

const grundgesetzeLinks = [
  { paragraph: 'Grundgesetz für die Bundesrepublik Deutschland', link: 'https://www.gesetze-im-internet.de/gg/BJNR000010949.html' },
  { paragraph: 'Staatsangehörigkeitsgesetz (StAG)', link: 'https://www.gesetze-im-internet.de/stag/BJNR005830913.html' },

];

const passRequirements = [
  { label: 'Mindestens 8 Jahre in Deutschland gelebt', checked: false },
  { label: 'Deutschkenntnisse auf B1-Niveau', checked: false },
  { label: 'Kein strafrechtliches Vergehen', checked: false },
  { label: 'Eigenständige Sicherung des Lebensunterhalts', checked: false },
  // Add more requirements as needed
];

const documentRequirements = [
    "Antragsformular: Ausgefüllt und unterschrieben.",
    "Personalausweis oder Reisepass: Kopie.",
    "Aufenthaltstitel: Kopie des aktuellen Aufenthaltstitels.",
    "Geburtsurkunde: Original oder beglaubigte Kopie.",
    "Meldebescheinigung: Aktuelle Bescheinigung vom Einwohnermeldeamt.",
    "Nachweis der Sprachkenntnisse: Deutschkenntnisse auf mindestens B1-Niveau.",
    "Nachweis des Lebensunterhalts: Gehaltsabrechnungen und Einkommenssteuerbescheide.",
    "Strafregisterauszug: Aktuelles Führungszeugnis.",
    "Einbürgerungstest: Bescheinigung über das Bestehen.",
    "Eheurkunde (falls zutreffend): Original oder beglaubigte Kopie.",
    "Kinder (falls zutreffend): Geburtsurkunden.",
  "Erklärung zur Verfassungstreue: Schriftliche Erklärung."
];

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FactsLegal = () => {
  const [showFacts, setShowFacts] = useState(false);
  const [showPassRequirements, setShowPassRequirements] = useState(false);
  const [showDocumentRequirements, setShowDocumentRequirements] = useState(false);
  const [showGrundgesetze, setShowGrundgesetze] = useState(false);
  const [showUserTerms, setShowUserTerms] = useState(false);
  const [requirements, setRequirements] = useState(passRequirements);
  const [openDialog, setOpenDialog] = useState(false);
  const [eligibilityMessage, setEligibilityMessage] = useState('');

  const handleFactsClick = () => {
    setShowFacts(!showFacts);
  };

  const handlePassRequirementsClick = () => {
    setShowPassRequirements(!showPassRequirements);
  };

  const handleDocumentRequirementsClick = () => {
    setShowDocumentRequirements(!showDocumentRequirements);
  };

  const handleGrundgesetzeClick = () => {
    setShowGrundgesetze(!showGrundgesetze);
  };

  const handleUserTermsClick = () => {
    setShowUserTerms(!showUserTerms);
  };

  const handleSubmit = () => {
    const isEligible = requirements.every(req => req.checked);
    setEligibilityMessage(isEligible ? 'Sie haben das Recht, die deutsche Staatsbürgerschaft zu beantragen.' : 'Sie erfüllen noch nicht alle Voraussetzungen für die deutsche Staatsbürgerschaft.');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box mt={10} p={2} border={1} borderColor="grey.300" borderRadius="8px">
      <Button
        variant="contained"
        color="primary"
        onClick={handleFactsClick}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {showFacts ? 'Wichtige Informationen ausblenden' : 'Wichtige Informationen'}
      </Button>

      {showFacts && (
        <StyledCard>
        <CardContent>
          <Typography variant="h6" align='center' gutterBottom>
            Einbürgerungstest: Wichtige Informationen
          </Typography>
          <Typography variant="caption"  gutterBottom>
            <strong> Allgemeines</strong>
            <br />
            <div className="indented-list" style={{ textAlign: "justify", hyphens: "auto" }}>
              <strong>Ziel:</strong> Überprüfung des Wissens über deutsche Rechts- und Gesellschaftsordnung.
              <br />
              <strong>Pflicht:</strong> Erforderlich für die meisten Erwachsenen, die die deutsche Staatsangehörigkeit anstreben.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong> Testaufbau</strong>
            <br />
            <div className="indented-list">
              <strong>Fragen:</strong> 33 Multiple-Choice-Fragen.
              <br />
              <strong>Themen:</strong> Deutsches Recht, Geschichte, gesellschaftliche Werte, Bundesländer.
              <br />
              <strong>Zeit:</strong> 60 Minuten.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Ablauf</strong>
            <br />
            <div className="indented-list" style={{ textAlign: "justify", hyphens: "auto" }}>
              1. <strong>Anmeldung:</strong> Bei der Volkshochschule oder einem Testzentrum.
              <br />
              2. <strong>Vorbereitung:</strong> Nutzung offizieller Lernmaterialien und Übungsfragen.
              <br />
              3. <strong>Test:</strong> Vorlage eines gültigen Ausweises; der Test wird überwacht.
              <br />
              4. <strong>Auswertung:</strong> Mindestens 17 von 33 Fragen müssen richtig beantwortet werden.
              <br />
              5. <strong>Ergebnis:</strong> Schriftliche Benachrichtigung.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Vorbereitung</strong>
            <br />
            <div className="indented-list">
              <strong>Materialien:</strong> Offizielle Lernmaterialien vom BAMF.
              <br />
              <strong>Kurse:</strong> Vorbereitungskurse bei Volkshochschulen.
              <br />
              <strong>Online:</strong> Übungstests und Apps nutzen.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Tipps</strong>
            <br />
            <div className="indented-list">
              <strong>Frühzeitig beginnen:</strong> Gründlich studieren.
              <br />
              <strong>Regelmäßig üben:</strong> Mit offiziellen Fragenkatalogen.
              <br />
              <strong>Kurse:</strong> Zur Klärung offener Fragen und Wissensvertiefung.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }}  gutterBottom>
            <strong>Ausnahmen</strong>
            <br />
            <div className="indented-list" >
              <strong>Befreiung: </strong> 
              <br />
              1. Deutscher Schulabschluss.
              <br />
              2. Unzureichende Lesefähigkeit, Schreibfähigkeit oder Sprachfähigkeit aufgrund von Behinderung, Krankheit oder altersbedingten Einschränkungen.
              <br />
              3. Kinder unter 16 Jahren.
              <br />
            </div>
          </Typography>

          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Referenzen:</strong>
            <br /> &#x2192; &nbsp;
            <a href="https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html" target="_blank" rel="noopener noreferrer"> 
              Bundesamt für Migration und Flüchtlinge (BAMF) - Informationen zum Einbürgerungstest
            </a> 
            <br /> &#x2192; &nbsp;
            <a href="https://www.integrationsbeauftragte.de/ib-de/ich-moechte-mehr-wissen-ueber/einbuergerung/" target="_blank" rel="noopener noreferrer"> 
              Der Weg zum deutschen Pass            </a> 
            <br /> &#x2192; &nbsp;
            <a href="https://www.volkshochschule.de/verbandswelt/projekte/vhs-lernportal/test-trainer-einbuergerungstest.php" target="_blank" rel="noopener noreferrer">
               Deutscher Volkshochschul-Verband (DVV) - Einbürgerungstest
            </a>
          </Typography>


          <Typography align="center" variant="body1" mt={3}>
            Viel Erfolg beim Einbürgerungstest!
          </Typography>
        </CardContent>
      </StyledCard>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handlePassRequirementsClick}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {showPassRequirements ? 'Einbürgerungsvoraussetzungen ausblenden' : 'Einbürgerungsvoraussetzungen'}
      </Button>

      {showPassRequirements && (
        <StyledCard>
        <CardContent>
          <Typography variant="h6" align='center' gutterBottom>
            To-Do Liste für die Einbürgerung in Deutschland
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Voraussetzungen</strong>
            <div className="indented-list">
              1. <strong>Aufenthalt:</strong> Mindestens 8 Jahre rechtmäßiger Aufenthalt, 5 Jahre bei besonderen Integrationsleistungen.<br/>
              2. <strong>Lebensunterhalt:</strong> Selbstständige Sicherung ohne Sozialleistungen.<br/>
              3. <strong>Sprache:</strong> Deutschkenntnisse auf B1-Niveau.<br/>
              4. <strong>Rechtsordnung:</strong> Bekenntnis zur freiheitlichen demokratischen Grundordnung, Einbürgerungstest.<br/>
              5. <strong>Strafregister:</strong> Keine wesentlichen strafrechtlichen Verurteilungen.<br/>
              6. <strong>Mehrstaatigkeit:</strong> Beibehaltung der bisherigen Staatsangehörigkeit möglich.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Kategorien für Ausnahmen</strong>
            <div className="indented-list">
              1. <strong>Gastarbeiter und Vertragsarbeiter:</strong> Erleichterte Einbürgerung.<br/>
              2. <strong>Erwerbstätige und deren Ehepartner:</strong> Einbürgerung trotz Sozialleistungen möglich.<br/>
              3. <strong>Strafrechtliche Bagatellen:</strong> Kleinere Strafen hindern nicht die Einbürgerung.
            </div>
          </Typography>
          <Typography variant="caption" gutterBottom>
            <strong>Analyse</strong>
            <div className="indented-list" style={{ textAlign: "justify", hyphens: "auto" }}>
              <strong>Pressemitteilung (BMI):</strong> Beschleunigung der Einbürgerung, strengere Voraussetzungen.<br/>
              <strong>Gesetz (StAG):</strong> Detaillierte Regelungen für verschiedene Bewerbergruppen.<br/>
              <strong>FAQs (BMI):</strong> Klärung häufiger Fragen, Anerkennung der Lebensleistung von Gastarbeitern.
            </div>
          </Typography>
          <Typography variant="caption" style={{ textAlign: "justify", hyphens: "auto" }} gutterBottom>
            <strong>Ist eine Einbürgerung für Sie möglich?</strong>
            <div className="indented-list" > &#x2192; &nbsp;
            Prüfen Sie mit dem &nbsp;
              <a href="https://www.xn--einbrgerung-whb.de/fragebogen.php#quickcheck">Quick Check</a> &nbsp;
              schnell und unverbindlich, ob Sie die Voraussetzungen für die deutsche Staatsangehörigkeit erfüllen.
            </div>
          </Typography>

          <Typography variant="caption" gutterBottom>
            <strong>Weitere Informationen</strong>
            <div className="indented-list" > &#x2192; &nbsp;
              <a href="https://www.bmi.bund.de/SharedDocs/pressemitteilungen/DE/2024/06/stag-inkraft.html">BMI Pressemitteilung</a><br/> &#x2192; &nbsp;
              <a href="https://www.bmi.bund.de/SharedDocs/faqs/DE/themen/heimat/reform-staatsangehoerigkeitsrecht/reform-staatsangehoerigkeitsrecht-liste.html">BMI FAQs zur Reform</a>
            </div>
          </Typography>
        </CardContent>
      </StyledCard>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleDocumentRequirementsClick}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {showDocumentRequirements ? 'Erforderliche Unterlagen ausblenden' : 'Erforderliche Unterlagen'}
      </Button>

      {showDocumentRequirements && (
        <StyledCard>
          <CardContent>
            <Typography variant="h6" align='center' gutterBottom>
            Benötigen Unterlagen:
            </Typography>
            <ol style={{ listStyleType: 'decimal', fontWeight: 'bold' }}>
              {documentRequirements.map((doc, index) => {
          const [boldPart, ...rest] = doc.split(':');
          return (
            <li key={index}>
              <Typography variant="caption">
                <strong>{boldPart}</strong>: {rest.join(':')}
              </Typography>
            </li>
            
          );
        })}
        </ol>
              
            <Typography variant="caption" marginBlockStart={2} marginInlineStart={0}>
              Für detaillierte Informationen besuchen Sie bitte die offiziellen Webseiten der{" "}
            <a href="https://www.bundesregierung.de" target="_blank" rel="noopener noreferrer">
                Bundesregierung
            </a>{" "}
              und des{" "}
            <a href="https://www.bmi.bund.de" target="_blank" rel="noopener noreferrer">
            Bundesministeriums des Innern
           </a>.
          </Typography>
            
          </CardContent>
        </StyledCard>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleGrundgesetzeClick}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {showGrundgesetze ? 'Gesetze ausblenden' : 'Gesetze'}
      </Button>

      {showGrundgesetze && (
        <StyledCard>
          <CardContent>
            {grundgesetzeLinks.map((item, index) => (
              <Typography key={index} variant="caption" component="div"> &#x2192; &nbsp;
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.paragraph}
                </a>
              </Typography>
            ))}
          </CardContent>
        </StyledCard>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUserTermsClick}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        {showUserTerms ? 'Rechtliche Hinweise ausblenden' : 'Rechtliche Hinweise'}
      </Button>

      {showUserTerms && (

<StyledCard>
  <CardContent>
    <Typography variant="h6" align="center">
      AGB, Impressum und Datenschutz.
    </Typography>
    <Typography variant="caption">
      <div className="agb-container" style={{ textAlign: "justify", hyphens: "auto" }}>
        <h3>Allgemeine Geschäftsbedingungen</h3>
        <h4>1. Allgemeines</h4>
        <p>
          1.1. Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Einbürgerungs-
          test-App (nachfolgend "die App" genannt).<br /> 1.2. Mit dem Herunterladen und der Nutzung der App akzeptieren Sie diese AGB.
        </p>
        <h4>2. Nutzung der App</h4>
        <p>
          2.1. Die App bietet Ihnen die Möglichkeit, sich auf den Einbürgerungstest in Deutschland vorzubereiten. Alle Fragen und Bilder stammen von den offiziellen Quellen des Bundesamtes für Migration und Flüchtlinge (BAMF).<br /> 2.2. Die Nutzung der App ist kostenlos und erfordert keine Anmeldung.
        </p>
        <h4>3. Haftung</h4>
        <p>
          3.1. Die App wurde mit größter Sorgfalt erstellt. Dennoch kann keine Garantie für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte übernommen werden.<br /> 3.2. Der Betreiber der App haftet nicht für etwaige Schäden, die durch die Nutzung der App entstehen könnten.
        </p>
        <h4>4. Änderungen der AGB</h4>
        <p>
          4.1. Der Betreiber der App behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden in der App bekanntgegeben.
        </p>
        <h4>5. Schlussbestimmungen</h4>
        <p>
          5.1. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </div>
      <div className="impressum-container" style={{ textAlign: "justify", hyphens: "auto" }}>
        <h3>Impressum</h3>
        <p>Verantwortlich gemäß § 5 TMG:</p>
        <p>
          Shekhzad Khudeeda<br />
          E-Mail: postifygermany@gmail.com
        </p>
        <Typography variant="body1">Haftungsausschluss:</Typography>
        <p>
          Die Inhalte dieser App wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Dienstanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Dienstanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </div>
      <div className="datenschutz-container" style={{ textAlign: "justify", hyphens: "auto" }}>
        <h3>Datenschutzerklärung</h3>
        <h4>1. Allgemeines</h4>
        <p>
          1.1. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutz-
          erklärung.
        </p>
        <h4>2. Erhebung und Verarbeitung personenbezogener Daten</h4>
        <p>
          2.1. Die Nutzung unserer App ist ohne Angabe personenbezogener Daten möglich. Wir erheben, verarbeiten und speichern keine personenbezogenen Daten der Nutzer.
        </p>
        <h4>3. Datenübermittlung</h4>
        <p>
          3.1. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutz-
          erklärung.
        </p>
        <h4>4. Datensicherheit</h4>
        <p>
          4.1. Da wir keine personenbezogenen Daten erheben, verarbeiten oder speichern, erübrigen sich Maßnahmen zur Datensicherheit im üblichen Sinne. Die App selbst wird jedoch regelmäßig überprüft, um sicherzustellen, dass keine Datenlecks oder Sicherheitslücken bestehen.
        </p>
        <h4>5. Rechte der betroffenen Personen</h4>
        <p>
          5.1. Da keine personenbezogenen Daten erhoben werden, sind Rechte wie Auskunft, Berichtigung, Sperrung oder Löschung von Daten im Zusammenhang mit dieser App nicht relevant.<br /><br />Diese Datenschutz-
          erklärung gilt ab dem 13.07.2024.
        </p>
      </div>
    </Typography>
  </CardContent>
</StyledCard>



      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ergebnis</DialogTitle>
        <DialogContent>
          <DialogContentText>{eligibilityMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FactsLegal;
