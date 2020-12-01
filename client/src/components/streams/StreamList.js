import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

const StreamList = ({ streams, isSignedIn, userId, fetchStreams }) => {
  const renderAdminButton = (stream) =>
    stream.userId === userId && (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link
          to={`/streams/delete/${stream.id}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );

  const renderCreateButton = () =>
    isSignedIn && (
      <div style={{ textAlign: "right" }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );

  const renderList = () =>
    streams.map((stream) => (
      <div className="item" key={stream.id}>
        {renderAdminButton(stream)}
        <i className="large middle aligned icon camera"></i>
        <div className="content">
          <Link to={`/streams/${stream.id}`} className=" header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreateButton()}
    </div>
  );
};

const mapStateToProps = ({ streams, auth: { isSignedIn, userId } }) => ({
  streams: Object.values(streams),
  userId,
  isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
