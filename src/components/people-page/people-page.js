import React, {Component} from "react";
import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
    state = {
        selectedPerson: null,
    };

    swapiService = new SwapiService();

    onPersonSelected = (selectedPerson) => {
        this.setState({
            selectedPerson
        });
    };

    render() {
        const itemList = (
            <ErrorBoundry>
                <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                >
                    {(item) => (
                        `${item.name} (${item.gender}, ${item.birthYear})`
                    )}
                </ItemList>
            </ErrorBoundry>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return(
                <Row left={itemList} right={personDetails}/>
        );
    };
}