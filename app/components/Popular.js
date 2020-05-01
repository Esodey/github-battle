import React from 'react'
import LanguagesNav from './LanguagesNav'
import { fetchPopularRepos } from '../utils/api'
import ReposGrid from './ReposGrid'

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
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
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
      .then((data) => {
        this.setState(( { repos }) => ({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        }))
      })
      .catch(() => {
        console.warn('Error fetching repositories')

        this.setState({
          error: 'There was an error fetching repositories'
        })
      })
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
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
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}

      </React.Fragment>
    )
  }
}