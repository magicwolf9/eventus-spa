import React from 'react';
import styled from 'styled-components';
import EventCategory from './components/EventCategory';
import FloatingSubmitMenu from './components/FloatingSubmitMenu';

const EventCategoriesHolder = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 40vh;
`;

export default class EventSearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeCategories: []
        };
    }

    render() {
        let {categories, filters, onSubmit} = this.props;
        return <div>
            <EventCategoriesHolder>
                {categories.map((category, ind) => {
                    return <EventCategory selected={this.state.activeCategories.find((id) => id === category.id)} onClick={() => {
                        let activeCategories = this.state.activeCategories;
                        if (activeCategories.find((id) => id === category.id)) {
                            activeCategories = activeCategories.filter(id => id !== category.id)
                        } else {
                            activeCategories.push(category.id);
                        }
                        this.setState({activeCategories})
                    }} category={category} key={ind}/>
                })}
            </EventCategoriesHolder>
            <FloatingSubmitMenu filters={filters} onSubmit={(filters) => onSubmit(this.state.activeCategories, filters)}/>
        </div>
    }
}