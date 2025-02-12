import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp) => (
          <div key={exp._id}>
            <h3 className='text-dark'>{exp.company}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
              {exp.to ? (
                <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
              ) : (
                'Current'
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            {exp.description && (
              <p>
                <strong>Description: </strong> {exp.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>No experience credentials</h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
