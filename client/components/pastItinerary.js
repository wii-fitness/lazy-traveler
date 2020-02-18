import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
})

export default function PastItinerary(props) {
  const classes = useStyles()

  return (
    <div className="itinerary-history-details-container">
      <h4>
        {`${props.itinerary.city} 
      (${props.itinerary.arrival} to ${props.itinerary.departure})`}
      </h4>
      {props.itinerary.places.map(place => {
        return (
          <div key={place.id} className="itinerary-details">
            <Grid key={place.id} item xs={12} md={6}>
              <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h6">{place.name}</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {`Rating: ${place.rating}`}
                      </Typography>
                      <Typography variant="subtitle2" color="primary">
                        <Link href={`${place.website}`}>{place.website}</Link>
                      </Typography>
                    </CardContent>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image={place.photoUrl}
                    />
                  </Hidden>
                </Card>
              </CardActionArea>
            </Grid>
          </div>
        )
      })}
    </div>
  )
}
