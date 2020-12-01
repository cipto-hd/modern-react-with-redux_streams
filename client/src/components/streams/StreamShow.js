import { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";
const StreamShow = ({
  stream,
  match: {
    params: { id },
  },
  fetchStream,
}) => {
  const videoRef = useRef();
  const playerRef = useRef();

  const buildPlayer = useCallback(() => {
    if (playerRef.current || !stream) return;

    playerRef.current = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    playerRef.current.attachMediaElement(videoRef.current);
    playerRef.current.load();
    playerRef.current.play();
  }, [stream, id]);

  useEffect(
    (stream) => {
      if (!stream) fetchStream(id);
      buildPlayer();
    },
    [id, fetchStream, buildPlayer]
  );

  useEffect(() => {
    return () => {
      playerRef.current.destroy();
    };
  }, []);

  return stream ? (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  ) : (
    "Loading..."
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

export default connect(mapStateToProps, { fetchStream })(StreamShow);
