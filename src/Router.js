import React from 'react';
import axios from 'axios'
import EventSearchPage from './pages/EventSearchPage';
import EventPage, {StyledNoneLeftPage} from './pages/EventPage'
import Loader from './pages/components/Loader'

const timeout = ms => new Promise(res => setTimeout(res, ms));

const LoaderWrapper = ({isLoading, children}) => {
    return isLoading ? <Loader />: children
}

export default class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            page: "PAGE_1",
            isLoadingConfig: true,
            isLoadingEvents: true,
            
            availableFilters: [],
            availableCategories: [],
            
            filters: [],
            categories: [],

            eventOffset: 0,
            events: []
        }

        this.axios = axios.create({
            baseURL: 'http://eventus-api.herokuapp.com/eventus-api/api/v1/',
        })
    }

    fetchFilters = () => this.axios.get('config/filters/').then(res => res.data)

    fetchCategories = () => this.axios.get('config/categories/').then(res => res.data)

    componentWillMount(){
        Promise.all([
            this.fetchFilters(),
            this.fetchCategories()
        ]).then(([filters, categories]) =>
            this.setState({
                availableFilters: filters,
                availableCategories: categories,
                isLoadingConfig: false
            })
        )
    }

    postSearchParams = async ({categories, filters}) => {
        await timeout(1000);
        return [{
            name: 'Конно спортивный центр',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptates vel corporis rem consequuntur eaque dignissimos dolorum ratione quae inventore? Deleniti ipsa libero provident corrupti officiis aperiam perferendis reprehenderit obcaecati!",
            redirectUrl: "google.com",
            price: "1500p",
            imageUrl: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        }];
    }

    onSubmitForm = async ({categories, filters}) => {
        this.setState({
            page: "PAGE_2",
            isLoadingEvents: true,
            categories,
            filters
        })

        const events = await this.postSearchParams({categories, filters})

        this.setState({
            isLoadingEvents: false,
            events
        })
    }

    getNextEvent = () => {
        this.setState({...this.state, eventOffset: this.state.eventOffset+1})
    }

    onBackToPage1 = () => this.setState({page: 'PAGE_1'});

    render() {
        switch (this.state.page) {
            case 'PAGE_1':
                return <LoaderWrapper isLoading={this.state.isLoadingConfig}>
                    <EventSearchPage
                        onSubmit={this.onSubmitForm}
                        categories = {this.state.availableCategories}
                        filters={this.state.availableFilters}
                    />
                </LoaderWrapper>
            case 'PAGE_2':
                return <LoaderWrapper isLoading={this.state.isLoadingEvents}>
                {
                    this.state.events.length > this.state.eventOffset
                    ?
                    <EventPage
                        {...this.state.events[this.state.eventOffset]}
                        getNext = {this.getNextEvent}
                        backToPage1 = {this.onBackToPage1}
                    />
                    :
                    <StyledNoneLeftPage />
                }

                </LoaderWrapper>
            default:
                throw new Error('Something went wrong')
        }
    }
}