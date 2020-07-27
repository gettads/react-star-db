import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../spinner";

const Record = ({item, field, label}) => {
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {Record};

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({item: null});
            this.updateItem();
        }
    }

    updateItem = () => {
        const {itemId, getData, getImageUrl} = this.props;
        if (itemId === null) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            })
    };

    render() {
        if (this.props.itemId === null) {
            return <span>Select an item for details.</span>
        } else if (this.state.item === null) {
            return(
                <div className="item-details card">
                    <Spinner />
                </div>
            );
        }


        const item = this.state.item;
        const {id, name, gender, birthYear, eyeColor} = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={this.state.image} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(
                                this.props.children,
                                (child, index) => {
                                    return React.cloneElement(
                                        child,
                                        {item}
                                    );
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}