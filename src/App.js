import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Footer />     
    </div>
  );
}

export default App;
