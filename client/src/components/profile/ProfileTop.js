import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
  },
}) => {
  const firstName =
    name.trim().split(' ')[0][0].toUpperCase() +
    name.trim().split(' ')[0].slice(1);
  const lastName = name.trim().split(' ')[1]
    ? name.trim().split(' ')[1][0].toUpperCase() +
      name.trim().split(' ')[1].slice(1)
    : '';

  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>
        {firstName} {lastName}
      </h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}
      </p>
      <p className='my-1'>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a
            href={`http://${website}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social.twitter && (
          <a
            href={`http://${social.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social.facebook && (
          <a
            href={`http://${social.facebook}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social.linkedin && (
          <a
            href={`http://${social.linkedin}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social.youtube && (
          <a
            href={`http://${social.youtube}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social.instagram && (
          <a
            href={`http://${social.instagram}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
