import Navbar from './components/Navbar';
import Card from './components/Card';
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Card title="Product 1" description="This is cool" />
        <Card title="Product 2" description="This is better" />
        <Card title="Product 3" description="This is the best" />
      </div>
    </>
  )
}

export default App