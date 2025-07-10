import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ marginLeft: 220, flexGrow: 1, padding: 20 }}>
          {/* 이 영역이 잘려서 안보이던 콘텐츠를 옮겨줌 */}
          <h1>메인 콘텐츠</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
