import React from 'react'
import LanguagesNav from './LanguagesNav'
import { fetchPopularRepos } from '../utils/api'

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null
    })
    fetchPopularRepos(selectedLanguage)
    .then((repos) => this.setState({
      repos,
      error: null
    }))
    .catch(() => {
      console.warn('Error fetching repositories')

      this.setState({
        error: 'There was an error fetching repositories'
      })
    })
  }

  isLoading() {
    return this.state.repos === null && this.state.error === null;
  }

  render () {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}hello</pre>}

      </React.Fragment>
    )
  }
}