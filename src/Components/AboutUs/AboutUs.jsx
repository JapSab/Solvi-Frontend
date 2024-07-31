import React from 'react';

const AboutUs = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    imageContainer: {
      marginBottom: '20px',
    },
    portrait: {
      width: '100%',
      maxWidth: '300px',
      borderRadius: '50%',
    },
    textContainer: {
      maxWidth: '90%',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      textAlign: 'left',
      color: 'purple',
      fontSize: '3rem', // Increase font size for title
    },
    paragraph: {
      marginBottom: '10px',
      fontSize: '1.8rem', // Increase font size for text
      textAlign: 'left',

    },
    '@media (min-width: 768px)': {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      },
      imageContainer: {
        marginBottom: '0',
        marginRight: '20px',
      },
      textContainer: {
        textAlign: 'left',
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* <div style={styles.imageContainer}>
        <img src="portrait.jpg" alt="Portrait" style={styles.portrait} />
      </div> */}
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.paragraph}>
          "Solvi" - a platform where a lawyer will be unlimited, by your side indefinitely, at any time, in any place and from any place.
        </p>
        <p style={styles.paragraph}>
          Do you have a legal question and don't know how to find the answer? Did something happen to you and you are looking for a legal solution? Do you have a problem with the police and/or state organization and don't know what to do? Do you need a document and don't know who to contact?
          Write to us, a qualified lawyer from the relevant field, specialization and competence will give you an answer.
          We are a platform that gives everyone the opportunity to quickly, at any time of the day, in Georgia or abroad, write online to our legal operator and ask a question, describe his case and get a qualified answer.
          The team that works 24 hours a day for "SOLVI" was specially selected in Georgia. For us, each customer is special and individual. Our main goal is to make "SOLVI" a friendly, reliable virtual lawyer you can trust on anytime, anywhere.
        </p>
        <p style={styles.paragraph}>
          All SOLVI lawyers are ready to solve your legal problems, give you reliable legal advice and be your virtual lawyer.
          SOLVI SOLVES ALL PROBLEMS!
          Sincerely, Gvantsa Zhorzholiani
          Author and founder of the idea of ​​"solvi".
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
