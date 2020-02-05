// import React, { Component } from 'react'
// import { DragSource } from 'react-dnd';

//   const cardSource = {
//   dragStart (event) {
//     const target = event.target;
//     console.log('dragging',props)
//     event.dataTransfer.setData('card_id', target.id)
//     setTimeout(() => {
//       target.style.display = 'none'
//     }, 0)
//     event.preventDefault();
//   },
//   dragOver (event) {
//     console.log('has been dropped', event.stopPropagation)
//     event.stopPropagation()
//   //   event.preventDefault();
//   }}

// function collect(connect, monitor) {
//     return {
//         connectDragSource: connect.dragSource(),
//         connectDragPreview: connect.dragPreview(),
//         isDragging: monitor.isDragging()
//     }
// }

// class Card extends Component {
//     render() {
//     const {isDragging, connectDragSource, card} = this.props
//     const opacity = isDragging ? 0 : 1
//     return connectDragSource(
//         <div className='card' style={{ opacity }}>
//         <span>{card.name}</span>
//         </div>
//     )
//     // return (<div
//     //     id={props.id}
//     //     className={props.className}
//     //     draggable={props.draggable}
//     //     droppable='true'
//     //     onDragStart={dragStart}
//     //     onDragOver={dragOver}>
//     //         {props.children}
//     //     </div>)
//     }
// }

// export default DragSource('type', cardSource, collect)(Card)
