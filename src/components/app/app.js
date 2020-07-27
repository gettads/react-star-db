import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorIndicator from "../error-indicator";
import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";


export default class App extends Component{

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false,
        selectedPerson: 3
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {showRandomPlanet: !state.showRandomPlanet};
        });
    };

    render() {
        if (this.state.hasError === true) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={this.swapiService.getPerson}
                getImageUrl={this.swapiService.getPersonImage}
            >
                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={this.swapiService.getStarship}
                getImageUrl={this.swapiService.getStarshipImage}
            >
                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );

        return (
            <div className={`stardb-app`}>
                <Header />
                {planet}
                <div className={`row mb2 button-row`}>
                    <button
                        className={`toggle-planet btn btn-warning`}
                        onClick={this.toggleRandomPlanet}
                    >
                        Toggle Random Planet Slider
                    </button>
                </div>

                {/*<PeoplePage />*/}
                <Row left={personDetails} right={starshipDetails} />

                {/*<div className="row mb2">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllPlanets}*/}
                {/*        >*/}
                {/*            {(item) => item.name}*/}
                {/*        </ItemList>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemDetails itemId={this.state.selectedPerson}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb2">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllStarships}*/}
                {/*        >*/}
                {/*            {(item) => item.name}*/}
                {/*        </ItemList>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemDetails itemId={this.state.selectedPerson}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }

};
