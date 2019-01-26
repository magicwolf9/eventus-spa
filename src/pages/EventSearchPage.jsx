import React from 'react';
import styled from 'styled-components';

const EventCategory = styled.div`
    width: 100px;
    height: 250px;
    background: url(${props => props.imageUrl || 'none'});
`;

const SubmitComponent = styled.div`
    width: 100%;
    height: 400px;
`;


export default class EventSearchPage extends React.Component {

    render() {
        let {categories, filters, onSubmit} = this.props;
        categories = [{
            id: '1',
            name: 'test cat1',
            imageUrl: 'dd'
        }, {
            id: '2',
            name: 'test cat2'
        }];
        filters = [{
            id: '1',
            name: 'filter1',
            inputType: 'PRICE'
        }, {
            id: '2',
            name: 'filter2',
            inputType: 'PRICE'
        }];
        return <div>
            {categories.map((category, ind) => {
                return <EventCategory image={category.imageUrl} id={ind}>
                    {category.id}
                    {category.name}
                    {category.imageUrl}
                </EventCategory>
            })}
            <SubmitComponent>
                {filters.map((filter, ind) => {
                    switch (filter.inputType) {
                        case 'PRICE':
                            return <div key={ind}>PRICE. {filter.id} {filter.name}</div>
                        case 'LOCATION':
                            return <div key={ind}>LOCATION. {filter.id} {filter.name}</div>
                        case 'DATE':
                            return <div key={ind}>DATE. {filter.id} {filter.name}</div>
                        default:
                            return <input/>
                    }
                })}
                <button onClick={onSubmit}>Поиск</button>
            </SubmitComponent>
        </div>
    }
}