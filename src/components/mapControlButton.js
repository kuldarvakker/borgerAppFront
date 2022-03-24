import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class MapControlButton extends Component {
    helpDiv;

    createButtonControl() {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const controlButton = L.DomUtil.create("div", "btn btn-secondary custom-leaflet-control");
                this.helpDiv = controlButton;
                controlButton.innerHTML = this.props.title;
                controlButton.addEventListener("click", this.props.clickFunction);
                return controlButton;
            }
        });
        return new MapHelp({ position: "topleft" });
    }

    componentDidMount() {
        const { map } = this.props;
        const control = this.createButtonControl();
        control.addTo(map);
    }

    componentWillUnmount() {
        this.helpDiv.remove();
    }

    render() {
        return null;
    }
}

function withMap(Component) {
    return function WrappedComponent(props) {
        const map = useMap();
        return <Component {...props} map={map} />;
    };
}

export default withMap(MapControlButton);
