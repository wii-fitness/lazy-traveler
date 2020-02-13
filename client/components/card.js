import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';

const Container = styled.div`
  background-color: white;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 3px solid lightgrey;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`
const Title = styled.h4`
  position: relative;
  line-height: 1;
`
const Description = styled.h5`
  position: relative;
  font-weight: 500;
  line-height: 1;
`
// material UI styles
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 500,
//   },
//   image: {
//     width: 128,
//     height: 128,
//   },
//   img: {
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
// }));

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      photo: ''
    }
    this.getPhoto = this.getPhoto.bind(this)
  }

  async componentDidMount() {
    const photo = localStorage.getItem(this.props.place.id)
    if (photo) {
      this.setState({photo: photo})
    } else {
      this.setState({photo: await this.getPhoto()})
    }
  }

  componentWillUnmount() {
    localStorage.setItem(this.props.place.id, this.state.photo)
    //document bug-fix for rendering images
  }

  //move to thunk
  async getPhoto() {
    if (this.props.place.photos) {
      const {data} = await axios.post('/api/places/photo', {
        photoreference: this.props.place.photos[0].photo_reference
      })
      return data
    }
  }

  render() {
    return (
      <Draggable draggableId={this.props.place.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="container-div">
              <div className="pic-container">
                <img src={'https://' + this.state.photo} className="photo" />
              </div>
              <div className="description-container">
                <Title>{this.props.place.name}</Title>
                <Description>
                  Rating:{' '}
                  {this.props.place.rating ? this.props.place.rating : 'N/A'}
                </Description>
                <Description>Address: {this.props.place.vicinity}</Description>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Card
// return (
//   <div className={classes.root}>
//     <Paper className={classes.paper}>
//       <Grid container spacing={2}>
//         <Grid item>
//           <ButtonBase className={classes.image}>
//             <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
//           </ButtonBase>
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography gutterBottom variant="subtitle1">
//                 Standard license
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 Full resolution 1920x1080 • JPEG
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 ID: 1030114
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography variant="body2" style={{ cursor: 'pointer' }}>
//                 Remove
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Typography variant="subtitle1">$19.00</Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Paper>
//   </div>
// );
