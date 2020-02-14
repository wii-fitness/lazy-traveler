import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// import styled from 'styled-components'
// import {Draggable} from 'react-beautiful-dnd'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'

const useStyles = theme => ({
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

class ItineraryCard extends React.Component {
  constructor() {
    super()
    this.state = {
      photo: ''
    }
    this.getPhoto = this.getPhoto.bind(this)
  }

  async componentDidMount() {
    var photo = await this.getPhoto()
    this.setState({photo: photo})
  }

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
    const time = this.props.timeSlot
    const formattedTime = `${time.slice(0, 2)}:${time.slice(
      2,
      4
    )} to ${time.slice(7, 9)}:${time.slice(9, 11)}`

    return (
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
                  <Typography component="subtitle2" color="textSecondary">
                    Time: {formattedTime}
                  </Typography>
                  <Typography component="h6">
                    {this.props.place.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Rating:{' '}
                    {this.props.place.rating ? this.props.place.rating : 'N/A'}
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
    )
  }
}

export default withStyles(useStyles)(ItineraryCard)
