import React from 'react'
import { Router, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'
import IfOffline from './components/IfOffline'
import './App.css'

import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

const history = createBrowserHistory()

ReactGA.initialize('UA-000000-01')
ReactGA.pageview(window.location.pathname + window.location.search)

history.listen(function(location) {
  ReactGA.pageview(window.location.pathname + window.location.search)
})

export default class App extends React.Component {

    showNotification = async () => {
    if(! ("Notification" in window) || ("serviceworker" in navigator)){
      return alert("Tu Browser no soporta notificaciones!")
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission()
    }

    if (Notification.permission === "blocked") {
      return alert("Bloqueaste las Notificaciones!")
    }

    if (Notification.permission === "granted") {
      return;
    }    

  }

  sendNotification = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (! registration ) return alert("No hay un SW :(")

     registration.showNotification("Listo el Timer",
     {
      body: "Ding Ding Ding!",
      img: "/icon.png"
     }) 
  }

  render() {
    return (
      <Router history={ history }>
        <div>
          <header>
            <Link to="/">Recetas <IfOffline>Offline</IfOffline></Link>
            <Link to="/timer" className="timerLink">⏱</Link>
            <button onClick={this.showNotification}>PUSH</button>
            <button onClick={this.sendNotification}>SEND</button>
            <IfOffline>No hay conexión a internet!</IfOffline>

          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}


