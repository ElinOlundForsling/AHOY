const Collapse = props => {
  return (
    <div
      className='collapse'
      style={{
        maxHeight: props.isOpen ? 350 : 0,
      }}>
      <div>{props.children}</div>
    </div>
  );
};

export default Collapse;
