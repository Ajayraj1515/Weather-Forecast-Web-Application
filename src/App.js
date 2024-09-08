import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import CitiesTable from './components/CitiesTable'
import WeatherDetails from './components/WeatherDetails'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CitiesTable} />
      <Route exact path="/weather/:cityName" component={WeatherDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
