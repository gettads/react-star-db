import React, {Component} from "react";
import './people-page.css';
import ItemList from "../components/item-list";
import PersonDetails from "../components/person-details";
import SwapiService from "../services/swapi-service";
import Row from "../components/row";
import ErrorBoundry from "../components/error-boundry";

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
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return(
                <Row left={itemList} right={personDetails}/>
        );
    };
}