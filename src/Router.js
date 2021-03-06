import React from 'react';
import axios from 'axios'
import EventSearchPage from './pages/EventSearchPage';
import EventPage, {StyledNoneLeftPage} from './pages/EventPage'
import Loader from './pages/components/Loader'

const LoaderWrapper = ({isLoading, children}) => {
    return isLoading ? <Loader />: <React.Fragment>{children}</React.Fragment>
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
            baseURL: 'https://eventus-api.herokuapp.com/eventus-api/api/v1/',
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

    postSearchParams = async ({categories, filters}) => this.axios.post('/events/search/', {
        categories, filters
    }).then(res => res.data)

    onSubmitForm = async (categories, filters) => {
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

    getNextEvent = () => this.setState({...this.state, eventOffset: this.state.eventOffset+1})

    onBackToPage1 = () => this.setState({page: 'PAGE_1', eventOffset: 0});

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
                    <StyledNoneLeftPage backToPage1={this.onBackToPage1} />
                }

                </LoaderWrapper>
            default:
                throw new Error('Something went wrong')
        }
    }
}