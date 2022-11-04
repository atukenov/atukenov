import About from "./components/About/About";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";

const App = () => {
  return (
    <div>
      <Header />
      <Intro />
      <About />
      <Skills />
      <Projects />
    </div>
  );
};

export default App;
