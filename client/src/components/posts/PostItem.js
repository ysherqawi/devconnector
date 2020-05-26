import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
}) => {
  const firstName =
    name.trim().split(' ')[0][0].toUpperCase() +
    name.trim().split(' ')[0].slice(1);
  const lastName = name.trim().split(' ')[1]
    ? name.trim().split(' ')[1][0].toUpperCase() +
      name.trim().split(' ')[1].slice(1)
    : '';

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>
            {firstName} {lastName}
          </h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY-MM-DD'>{date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => addLike(_id)}
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>
            {likes.length > 0 && (
              <span className='comment-count'>{likes.length}</span>
            )}
          </span>
        </button>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => removeLike(_id)}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && auth.user._id === user && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
