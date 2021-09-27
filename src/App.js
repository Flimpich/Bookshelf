import React from "react";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import { Home } from "./Components/Home";
import { CSSTransition } from "react-transition-group";
import Form from "./Components/Form";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [{
        name: "Властелин колец. Возвращение короля", author: "Джон Р.Р. Толкин", yearRelease: "2018",
        cover: "https://фантазеры.рф/wa-data/public/shop/products/05/03/20305/images/55626/55626.750x0.jpg", id: 1
      }],
      serchName: "",
      pathForm: "",
      inHome: true,
      inForm: false
    };
  }

  onChange = (e) => {
    this.setState(() => ({
      serchName: e.target.value
    }))
  }

  pathForm = (active) => {
    this.onForm();
    if (active === "edit") {
      this.setState({
        pathForm: "/edit/:id",
      })
    }
    if (active === "add") {
      this.setState({
        pathForm: "/add",
      })
    }
  }

  saveBook = (info, active) => {
    this.onHome();
    if (active === "add") {
      this.setState({
        books: [...this.state.books, this.state.books.length ? { ...info, id: this.state.books.length + 1 } : { ...info, id: 1 }]
      })
    }
    if (active === "edit") {
      this.setState({
        books: this.state.books.map(item => item.id === info.id ? { ...item, ...info } : item)
      })
    }
  }

  removeBook = (id) => {
    this.setState({
      books: this.state.books.filter(item => item.id !== id)
    })
  }

  componentDidUpdate() {
    localStorage.setItem("books", JSON.stringify(this.state.books));
  }
  componentDidMount() {
    if (localStorage.length) {
      this.setState({
        books: JSON.parse(localStorage.getItem("books"))
      })
    }
  }

  onForm = () => {
    this.setState({
      inForm: true
    })
  }
  onHome = () => {
    this.setState({
      inForm: false
    });
  }
  clearStorige = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="header_container">
            <div className="header_title"><NavLink to="/" activeClassName="hurray"><span>Книжная полка</span></NavLink></div>
            <div className="clear_localstorige">
              <button className="button_clear_localstorige" onClick={this.clearStorige}>Очистить ЛокалСторидж</button>
            </div>
          </div>
        </header>
        <div className="container">
          <main>
            <CSSTransition in={this.state.inForm} timeout={1000} classNames="page" onEnter={() => this.setState({ inHome: false })} onExit={() => this.setState({ inHome: true })}>
              <Switch>
                <Route render={props => <Home info={this.state.books} onFrom={this.onForm} pathForm={this.pathForm} removeBook={this.removeBook} serchName={this.state.serchName} serch={this.onChange} />} path="/" exact></Route>
                <Route render={props => <Form info={this.state.books} onHome={this.onHome} saveBook={this.saveBook} />} path={this.state.pathForm} exact></Route>
              </Switch>
            </CSSTransition>
          </main>
        </div>
      </div>
    );
  }
}
