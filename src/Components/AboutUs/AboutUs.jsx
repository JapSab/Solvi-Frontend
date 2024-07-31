// src/components/AboutUs.js
import React, { useContext } from 'react';
import LanguageContext from '../../utils/LanguageContext';

const AboutUs = () => {
  const { language } = useContext(LanguageContext);

  const content = {
    ENG: {
      title: 'About Us',
      paragraph1: '"Solvi" - a platform where a lawyer will be unlimited, by your side indefinitely, at any time, in any place and from any place.',
      paragraph2: 'Do you have a legal question and don\'t know how to find the answer? Did something happen to you and you are looking for a legal solution? Do you have a problem with the police and/or state organization and don\'t know what to do? Do you need a document and don\'t know who to contact? Write to us, a qualified lawyer from the relevant field, specialization and competence will give you an answer. We are a platform that gives everyone the opportunity to quickly, at any time of the day, in Georgia or abroad, write online to our legal operator and ask a question, describe his case and get a qualified answer. The team that works 24 hours a day for "SOLVI" was specially selected in Georgia. For us, each customer is special and individual. Our main goal is to make "SOLVI" a friendly, reliable virtual lawyer you can trust on anytime, anywhere.',
      paragraph3: 'All SOLVI lawyers are ready to solve your legal problems, give you reliable legal advice and be your virtual lawyer. SOLVI SOLVES ALL PROBLEMS! Sincerely, Gvantsa Zhorzholiani Author and founder of the idea of ​​"solvi".',
    },
    GEO: {
      title: 'ჩვენ შესახებ',
      paragraph1: '„solvi”- პლატფორმა, სადაც ულიმიტოდ, ნებისმიერ დროს, ნებისმიერ ადგილას და ნებისმიერი ადგილიდან იურისტი იქნება შენს გვერდით.',
      paragraph2: 'იურიდიული კითხვა გაქვს და პასუხი არ იცი როგორ იპოვო? რაღაც შეგემთხვა და   გამოსავალს სამართლებრივად ეძებ?   პოლიციასთან  ან/და სახელმწიფო ორგანოსთან გაქვს პრობლემა და არ იცი რა ქნა? დოკუმენტი გჭირდება და არ იცი ვის მიმართო? მოგვწერე, შენ პასუხს კვალიფიციური იურისტი გაგცემს შესაბამისი სფეროდან, სპეციალიზაციით და კომპეტენციით. ჩვენ ვართ პლატფორმა, რომელიც ყველა ადამიანს  აძლევს შესაძლებლობას,  სწრაფად, დღე-ღამის ნებისმიერ მონაკვეთში, საქართველოში თუ საზღვარგარეთ მიწეროს ონლაინ ჩვენს  იურისტ ოპერატორს და დაუსვას  შეკითხვა, აღწეროს მისი შემთხვევა და მიიღოს კვალიფიციური პასუხი. გუნდი, რომელიც 24 საათი მუშაობს „SOLVI“-სთვის, საქართველოში  სპეციალურად შეირჩა. ჩვენთვის თითოეული მომხმარებელი განსაკუთრებული და ინდივიდუალურია. ჩვენი მთავარი მიზანია  „SOLVI” ვაქციოთ  მეგობარ, სანდო ვირტუალურ იურისტად, რომლის იმედიც გექნებათ ყოველთვის და ყველგან.',

      paragraph3: '„SOLVI”-ის  ყველა იურისტი მზადაა მოაგვაროს თქვენი სამართლებრივი პრობლემები, მოგცეთ სანდო იურიდიული რჩევები და იყოს თქვენი ვირტუალური იურისტი. SOLVI SOLVES ALL PROBLEMS! პატივისცემით, გვანცა ჟორჟოლიანი „solvi”-ის იდეის ავტორი და დამფუძნებელი',
    },
  };

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
        <h1 style={styles.heading}>{content[language].title}</h1>
        <p style={styles.paragraph}>{content[language].paragraph1}</p>
        <p style={styles.paragraph}>{content[language].paragraph2}</p>
        <p style={styles.paragraph}>{content[language].paragraph3}</p>
      </div>
    </div>
  );
};

export default AboutUs;
