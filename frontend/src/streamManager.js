let source = null;

const videoSource = {
  setSource(stream) {
    console.log(stream);
    source = stream;
  },
  getSource() {
    console.log(source);
    return source;
  },
};

Object.freeze(videoSource);
export { videoSource };
