import { useEffect } from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

const StreamEdit = ({
  stream,
  match: {
    params: { id },
  },
  fetchStream,
  editStream,
}) => {
  useEffect(
    (stream) => {
      if (!stream) fetchStream(id);
    },
    [id, fetchStream]
  );

  const onSubmit = (formValues) => {
    editStream(id, formValues);
  };

  return (
    <div>
      <h2>Edit a stream</h2>
      {stream ? (
        <StreamForm
          initialValues={_.pick(stream, "title", "description")}
          onSubmit={onSubmit}
        />
      ) : (
        "Loading..."
      )}
    </div>
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

export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
