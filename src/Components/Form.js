import React from "react";
import { Link, withRouter } from "react-router-dom";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", author: "", yearRelease: "", cover: "", valid: "" };
        this.title = "Добавить книгу";
    }

    onChange =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveBook = () => {
        this.props.saveBook(this.state, this.props.match.params.id ? "edit" : "add")
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            const book = this.props.info.find(item => +this.props.match.params.id === item.id);
            this.title = "Редактировать книгу";
            this.setState(book);
        }
    }

    render() {
        return (
            <div className="container_form">
                <div className="container_form_title">
                    <div className="form_title">{this.title}</div>
                </div>
                <div className="container_inputs_form">
                    <div className="container_input_name_form all_input">
                        <label htmlFor="input_name pad_b_20">Наименование</label>
                        <input className="input_name_form pad_b_20" type="text" id="input_name" name="name" value={this.state.name} onChange={this.onChange} placeholder="Введите наименование книги"></input>
                    </div>
                    <div className="container_input_author_form all_input">
                        <label htmlFor="input_author">Автор</label>
                        <input className="input_author_form pad_b_20" type="text" id="input_author" name="author" value={this.state.author} onChange={this.onChange} placeholder="Введите имя автора"></input>
                    </div>
                    <div className="container_input_yearRelease_form all_input">
                        <label htmlFor="input_yearRelease">Год издания</label>
                        <input className="input_yearRelease_form pad_b_20" type="text" id="input_yearRelease" name="yearRelease" value={this.state.yearRelease} onChange={this.onChange} placeholder="Введите год издания"></input>
                    </div>
                    <div className="container_input_cover_form all_input">
                        <label htmlFor="input_cover">Обложка</label>
                        <input className="input_cover_form pad_b_20" type="text" id="input_cover" name="cover" value={this.state.cover} onChange={this.onChange} placeholder="Введите ссылку на изображение обложки"></input>
                    </div>
                    <div className="container_buuton_form">
                        <div className="container_buuton_save">
                            <Link to="/"><button className="buuton_save" onClick={() => this.saveBook()}>Сохранить</button></Link>
                        </div>
                        <div className="container_buuton_cancel">
                            <Link to="/"><button className="buuton_cancel" onClick={() => this.props.onHome()}>Отменить</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Form);