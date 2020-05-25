import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
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
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>
            {firstName} {lastName}
          </h2>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p className='my-1'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
