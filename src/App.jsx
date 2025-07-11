import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DetailSearch from "./components/DetailSearch";

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginTop: "100px", marginLeft: "10px", padding: "20px" }}>
          <h1>메인 콘텐츠</h1>
          <DetailSearch />
        </main>
      </div>
    </div>
  );
}

export default App;
