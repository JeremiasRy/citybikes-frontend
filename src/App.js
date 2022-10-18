import './cssfiles/App.css';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from './components/Navigation/Navbar';
import { ListJourneys } from './components/Journeys/ListJourneys';
import { AddJourney } from './components/Journeys/AddJourney';
import { SearchJourneys } from './components/Journeys/SearchJourneys';
import { ListStations } from './components/Stations/ListStations';
import { AddStation } from './components/Stations/AddStations';
import { SearchStations } from './components/Stations/SearchStations';
import { SingleStationView } from './components/Stations/SingleStationView';
import stationService from './services/stationService'
import { useEffect, useState } from 'react';
import journeyService from './services/journeyService';

function App() {
  const [stations, setStations] = useState();
  const [journeys, setJourneys] = useState();

  useEffect(() => {
    async function InitStations() {
      var res = await stationService.getStations();
      setStations(res);
  } async function InitJourneys() {
      var res = await journeyService.getJourneys();
      setJourneys(res);
  } if (stations === undefined)
      InitStations();
    if (journeys === undefined)
      InitJourneys();}, [])

  if (stations === undefined || journeys === undefined)
    return;

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journeys/list" element={<ListJourneys stations={stations} journeys={journeys} setJourneys={setJourneys}/>}/>
        <Route path="/journeys/search" element={<SearchJourneys />}/>
        <Route path="/journeys/add" element={<AddJourney />}/>

        <Route path="/stations/list" element={<ListStations stations={stations}/>} />
        <Route path="/stations/add" element={<AddStation />} />
        <Route path="/stations/search" element={<SearchStations/>} />
        <Route path="/stations/:id" element={<SingleStationView />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
