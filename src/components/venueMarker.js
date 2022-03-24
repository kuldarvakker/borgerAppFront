import {Marker, Popup} from "react-leaflet";
import {Button, Card} from "react-bootstrap";

const VenueMarker = (props) => {

    const venue = props.venue;

    const dateStringFormat = (dateString) => {

        let year = dateString.substring(0,4);
        let month = dateString.substring(5,7);
        let day = dateString.substring(8,10);
        let time = dateString.substring(11,16);

        return day + "." + month + "." + year + " " + time;
    }

    return(
        <Marker position={[venue.longitude, venue.latitude]}>
            <Popup>
                <Card style={{maxWidth: "20vw", height: "auto", border: 'none' }}>
                    {venue.photoUrl &&  <Card.Img variant="top" src={venue.photoUrl} alt={venue.name + " food picture"} /> }
                    <Card.Body>
                        <Card.Title>{venue.name}</Card.Title>
                        <Card.Text>
                            Added to our database: {dateStringFormat(venue.createdAt)} (UTC)
                        </Card.Text>
                        <Button
                            variant="primary"
                            target="_blank"
                            href={"https://www.google.ee/maps/place/"+
                            encodeURIComponent(venue.longitude + " " + venue.latitude)}
                            style={{ color: 'white' }}
                        >
                            Directions from google
                        </Button>
                    </Card.Body>
                </Card>
            </Popup>
        </Marker>
    );
}

export default VenueMarker;
