import React from "react";
import { Link } from "react-router-dom";
import { Book } from "./Book";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export function Home({ removeBook, pathForm, info, serch, serchName, onFrom }) {
    let list;
    if (!info.length) {
        list = <div className="list_empty">Книжная полка пуста</div>
    }
    return (
        <div className="container_home">
            <div className="container_button_add_book">
                <CSSTransition timeout={300} classNames="buuton">
                    <Link to="/add"><button onClick={() => pathForm("add")} className="button_add_book">Добавить книгу</button></Link>
                </CSSTransition>
            </div>
            <div className="container_input_search">
                <input type="text" className="input_search" onChange={serch} placeholder="Введите название книги"></input>
            </div>
            <div className="container_list_books">
                <TransitionGroup>
                    {list || info.filter(({ name }) => name.includes(serchName.trim())).map((item) =>
                        <CSSTransition key={item.id} timeout={500} classNames="book" >
                            <Book info={item} removeBook={removeBook} pathForm={pathForm} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        </div>

    )
}