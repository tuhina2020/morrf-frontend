import React, { Component, useState, useRef, useEffect } from 'react';
class DragAndDrop extends Component {
  componentDidMount() {
    let div = dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }
  componentWillUnmount() {
    let div = dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }
  render() {}
}

const DragAndDropFn = () => {
  const [drag, setDrag] = useState(false);
  const [dragCounter, setCounter] = useState(0);
  const dropRef = useRef();
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    setCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };
  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    setCounter(dragCounter - 1);
    if (dragCounter === 0) {
      setDrag(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setCounter(0);
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);
    return () => {
      let div = dropRef.current;
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  }, [dropRef]);

  return (
    <div className="Pos(r) D(ib)" ref={dropRef}>
      <div
        style={{
          border: 'dashed grey 4px',
          backgroundColor: 'rgba(255,255,255,.8)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: 'grey',
          }}
        >
          <div>drop here :)</div>
        </div>
      </div>
    </div>
  );
};
export default DragAndDropFn;
