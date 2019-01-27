import React from 'react';
import styled from 'styled-components';
import EventCategory from './components/EventCategory';
import FloatingSubmitMenu from './components/FloatingSubmitMenu';

const EventCategoriesHolder = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
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
        }, {
            id: '1',
            name: 'test cat1',
            imageUrl: 'dd'
        }, {
            id: '2',
            name: 'test cat2'
        }, {
            id: '1',
            name: 'test cat1',
            imageUrl: 'dd'
        }, {
            id: '2',
            name: 'test cat2 ggggggggggggggggggggggggggggggggggggggggggg'
        }];
        filters = [{
            "group": "LOCATION",
            "items": [{"id": 1, "name": "Москва"}, {"id": 2, "name": "Питер"}, {"id": 3, "name": "Другое"}]
        }, {
            "group": "DATE",
            "items": [{"id": 1, "name": "Сегодня"}, {"id": 2, "name": "Завтра"}, {
                "id": 3,
                "name": "1 неделя"
            }, {"id": 4, "name": "2 недели"}]
        }, {
            "group": "PRICE",
            "items": [{"id": 1, "name": "до 500р"}, {"id": 2, "name": "до 1000р"}, {
                "id": 3,
                "name": "до 3000р"
            }, {"id": 4, "name": "от 3000р"}]
        }];
        return <div>
            <EventCategoriesHolder>
                {categories.map((category, ind) => {
                    return <EventCategory category={category} id={ind}/>
                })}
            </EventCategoriesHolder>
            <FloatingSubmitMenu filters={filters} onSubmit={onSubmit}/>
        </div>
    }
}