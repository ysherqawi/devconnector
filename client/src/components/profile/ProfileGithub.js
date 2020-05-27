import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from './../layout/Spinner';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, loading, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
    //eslint-disable-next-line
  }, []);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {loading || repos.length === 0 ? (
        <Spinner />
      ) : !loading && repos.length === 0 ? (
        'No Repos'
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>Watchers: {repo.watchers}</li>
                <li className='badge badge-light'>Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
