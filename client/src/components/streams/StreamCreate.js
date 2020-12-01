import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = ({ createStream }) => {
  const onSubmit = (formValues) => {
    createStream(formValues);
  };

  return (
    <div>
      <h2>Create a stream</h2>
      <StreamForm {...{ onSubmit }} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
