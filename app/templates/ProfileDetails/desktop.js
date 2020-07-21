import React from 'react';
import PersonalDetails from 'components/organisms/ProfileDetails/personal';
import AboutMe from 'components/organisms/ProfileDetails/about';
import Contact from 'components/organisms/ProfileDetails/contact';
import Experience from 'components/organisms/ProfileDetails/experience';
import Portfolio from 'components/organisms/ProfileDetails/portfolio';
import Skills from 'components/organisms/ProfileDetails/skills';

const ProfileDetails = ({ profile }) => {
  const {
    personal,
    about,
    phone,
    email,
    experience,
    portfolio,
    skills,
  } = profile;
  return (
    <div className="D(f) Ai(s) Jc(s)">
      <div className="Mend($lg) Maw($60xl)">
        <PersonalDetails personal={personal} />
        <Contact phone={phone} email={email} />
        <AboutMe about={about} />
        <Skills skills={skills} />
        <Experience experience={experience} />
      </div>
      <div className="Maw($60xl)">
        <Portfolio portfolio={portfolio} />
      </div>
    </div>
  );
};

export default ProfileDetails;
