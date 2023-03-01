import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {data: []}

  componentDidMount() {
    this.getCovidStats()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {statesList} = this.props
    const {data} = this.state

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getCovidStats = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const data = await response.json()
    console.log(data)
    this.setState({data})
    const result = this.convertObjectsDataIntoListItemsUsingForInMethod()
    console.log(result)
  }

  handleChange = event => {
    console.log(event.target.value)
  }

  render() {
    return (
      <div className="Home-bg">
        <Header />
        <div className="home-card">
          <div className="search-tab">
            <BiSearchAlt2 className="search-icon" />
            <input
              className="input"
              type="search"
              onChange={this.handleChange}
              placeholder="Enter the State"
            />
          </div>
          <div className="state-container">
            <div className="stat-tab">
              <p className="state-heading">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1677677820/Confirmed_logo_eahbvq.png"
                alt="Confirmed"
                className="stat-logo"
              />
              <p className="total-count">15616511</p>
            </div>
            <div className="stat-tab">
              <p className="state-heading1">Active</p>
              <img
                src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1677677820/Active_logo_ildn2r.png"
                alt="Confirmed"
                className="stat-logo"
              />
              <p className="total-count1">15616511</p>
            </div>
            <div className="stat-tab">
              <p className="state-heading2">Recovered</p>
              <img
                src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1677677820/recovered_logo_d2h6x5.png"
                alt="Confirmed"
                className="stat-logo"
              />
              <p className="total-count2">15616511</p>
            </div>
            <div className="stat-tab">
              <p className="state-heading3">Deceased</p>
              <img
                src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1677677820/Deseced_logo_jtzm0t.png"
                alt="Confirmed"
                className="stat-logo"
              />
              <p className="total-count3">15616511</p>
            </div>
          </div>
          <div className="table-container">
            <div className="table-card">
              <div className="sorting-icons-tab">
                <p className="table-headings">State/UT</p>
                <FcGenericSortingAsc className="sorting-icons" />
                <FcGenericSortingDesc className="sorting-icons" />
              </div>
              <p className="table-headings">Confirmed</p>
              <p className="table-headings">Active</p>
              <p className="table-headings">Recovered</p>
              <p className="table-headings">Deceased</p>
              <p className="table-headings">Population</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
