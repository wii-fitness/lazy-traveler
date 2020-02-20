import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
  width: 95%;
`

const useStyles = () => ({
  card: {
    display: 'flex',
    background: '#e3e9ff'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
})

class PlaceCard extends React.Component {
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
    const {classes} = this.props
    return (
      <Draggable draggableId={this.props.place.id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="container-div">
              <Grid item xs={10} md={true}>
                <CardActionArea component="a" href="#">
                  <Card className={classes.card}>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={'https://' + this.state.photo}
                      />
                    </Hidden>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h6">
                          {this.props.place.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          Rating:{' '}
                          {this.props.place.rating
                            ? this.props.place.rating
                            : 'N/A'}
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          Address: {this.props.place.vicinity}
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </CardActionArea>
              </Grid>
            </div>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default withStyles(useStyles)(PlaceCard)
