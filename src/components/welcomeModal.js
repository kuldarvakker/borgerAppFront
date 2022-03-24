import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

const WelcomeModal = (props) => {
    return (
        <Modal
            {...props}
            keyboard={true}
        >
            <ModalHeader>
                <ModalTitle>Börger map guide</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <h5>
                    You came here to crave for burgers, huh?
                </h5>
                <p>
                    I got you! Now you could be the first one in the town to have a burger when a new venue pops up.
                </p>
                <h6>
                    Here are some helpful tips!
                </h6>
                <ul>
                    <li>
                        Buttons on the left are helpful. Especially the refresh button to look for new venues.
                    </li>
                    <li>
                        To get more info about the venue click on the marker.
                    </li>
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={props.onHide}>Understood</Button>
            </ModalFooter>
        </Modal>
    );
}

export default WelcomeModal;
