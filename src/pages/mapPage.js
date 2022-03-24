import {MapContainer, TileLayer} from "react-leaflet";
import WelcomeModal from "../components/welcomeModal";
import {useEffect, useState} from "react";
import MapControlButton from "../components/mapControlButton";
import {Spinner} from "react-bootstrap";
import VenueMarker from "../components/venueMarker";


const MapPage = () => {

    const [welcomeShow, setWelcomeShow] = useState(true);
    const [loadingShow, setLoadingShow] = useState(false);

    const [venues, setVenues] = useState([]);

    useEffect(() => {

        const getVenues = async () => {
            const resp = await fetch(
                "https://qm-kv.herokuapp.com/api/burgerjoints"
            );
            const venuesResp = await resp.json();
            await setVenues(venuesResp);
            sessionStorage.removeItem("joints");
            sessionStorage.setItem("joints", JSON.stringify(venuesResp));
        };

        getVenues();
    }, []);

    const findNewBurgerJoints = async () => {
        await setLoadingShow(true);
        const resp = await fetch(
            "https://qm-kv.herokuapp.com/api/update",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'}
            }
        );
        const newVenuesResp = await resp.json();
        let completeArrayOfVenues = [];
        completeArrayOfVenues.push(...JSON.parse(sessionStorage.getItem("joints")));
        completeArrayOfVenues.push(...newVenuesResp);
        await setVenues(completeArrayOfVenues);
        await setLoadingShow(false);
        if (newVenuesResp.length > 0) {
            alert("Quickly, " + newVenuesResp.length + " new venue(s) on the map.");
        }
    }

    return (
        <div id="map">
            <WelcomeModal
                show={welcomeShow}
                onHide={() => setWelcomeShow(false)}
            />
            {loadingShow &&
                <div className="loading-screen text-center">
                    <Spinner className="loading-screen-spinner" animation="border" role="status">
                    </Spinner>
                </div>
            }
            <MapContainer center={[58.3714,26.7234]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {venues.map((venue) => (
                    <VenueMarker key={venues.indexOf(venue)} venue={venue} />
                ))}
                <MapControlButton
                    title={"&#8634;"}
                    clickFunction={() => findNewBurgerJoints()}
                />
                <MapControlButton
                    title={"?"}
                    clickFunction={() => setWelcomeShow(true)}
                />
            </MapContainer>
        </div>
    );
}

export default MapPage;
