// import React from 'react'

// function Board(props) {

//     const drop = (event) => {
//       event.preventDefault();
//       var card_id = event.dataTransfer.getData("card_id");
//       const card = document.getElementById(card_id)
//       card.style.display = 'block'
//       event.target.appendChild(card);
//       console.log('has been dropped')
//     }

//     const dragOver = (event) => {
//         console.log('can now drop')
//         event.preventDefault();
//     }

//     return (<div
//               id={props.id}
//               onDrop={drop}
//               onDragOver={dragOver}
//               className={props.className}>
//         {props.children}
//       </div>)
// }

// export default Board
