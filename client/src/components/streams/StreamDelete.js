import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import Modal from "../Modal";

const StreamDelete = ({
  stream,
  match: {
    params: { id },
  },
  fetchStream,
  deleteStream,
}) => {
  useEffect(
    (stream) => {
      if (!stream) {
        fetchStream(id);
      }
    },
    [id, fetchStream]
  );

  const renderActions = () => (
    <>
      <Link to="/" className="ui  button">
        Cancel
      </Link>
      <button
        onClick={() => {
          deleteStream(id);
          return false;
        }}
        className="ui negative button"
      >
        Delete
      </button>
    </>
  );

  const renderContent = () =>
    `Are you sure you want to delete this stream${
      stream ? " with title: " + stream.title : ""
    }?`;
  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

const mapStateToProps = (
  { streams },
  {
    match: {
      params: { id },
    },
  }
) => ({ stream: streams[id] });

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
