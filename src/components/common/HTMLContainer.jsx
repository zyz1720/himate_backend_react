const HTMLContainer = (props) => {
  const {
    content,
    width = 'auto',
    maxHeight = 'auto',
    isCompact = false,
  } = props;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={`overflow-scroll ${
        isCompact ? 'scroll-container-compact' : 'scroll-container'
      }`}
      style={{ width, maxHeight }}
    />
  );
};

export default HTMLContainer;
