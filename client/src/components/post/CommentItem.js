import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

function CommentItem({
  auth,
  comment: { _id, user, name, avatar, text, date },
  deleteComment,
  postId,
}) {
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

        {!auth.loading && auth.user._id === user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => deleteComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
