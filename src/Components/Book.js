import React from "react";
import { Link } from "react-router-dom";

export function Book({info, removeBook, pathForm}) {
    return (
        <div className="container_book">
            <div className="container_book_cover">
                <img className="book_cover" src={info.cover} alt="Обложка" />
            </div>
            <div className="container_book_description">
                <div className="name">{info.name[0].toUpperCase()+info.name.slice(1,)}</div>
                <div className="author">{info.author}</div>
                <div className="yearRelease">{info.yearRelease}</div>
            </div>
            <div className="container_button_book">
                <div className="container_button_edit">
                    <Link to={`/edit/${info.id}`}><button className="button_edit" onClick={() => pathForm("edit")}>Редактировать</button></Link>
                </div>
                <div className="container_button_remove">
                    <button className="button_remove" onClick={() => removeBook(info.id)}>Удалить</button>
                </div>
            </div>
        </div>
    )
}