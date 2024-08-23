import NotFound from "../pages/NotFound";
import * as Music from "../service/MusicService"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../css/List.css";
function ListMusic(){
    const [musics, setMusics] = useState([]);
    const [value, setValue] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 3;
    const lastIndex = recordPerPage * currentPage;
    const firstIndex = lastIndex - recordPerPage;
    const record = musics.slice(firstIndex, lastIndex);
    const npage = Math.ceil(musics.length /recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const getAllMusic = async ()=>{
        const temp = await Music.getAllMusic();
        setMusics(temp);
    }

    const search = async (value) => {
        const temp = await Music.searchMusic(value);
        setMusics(temp);
    }

    const handleSearch = (e) => {
        const {name, value } = e.target;
        if(name === 'input') setValue(value);
    }

    useEffect(() => {
        getAllMusic();
    }, []);
    const onsubmit = (e) =>{
        e.preventDefault();
        search(value);
    }

    const changePrev = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const changeNPage = (id) =>{
        setCurrentPage(id);
    }
    const changeNext = () =>{
        if(currentPage < npage){
            setCurrentPage(currentPage + 1);
        }
    }

    const handleBt = () =>{

    }
    const [like, setLike] = useState(0);
    return(
        <div className="container">
            <div className="content">
                <form style={{ display: "flex" }}>
                    <div>
                        <input name="input" id="input" placeholder="Tìm kiếm mã sản phẩm"
                               onChange={handleSearch}
                               type="text"/>
                    </div>
                    <div>
                        <button onClick={onsubmit}>Search</button>
                        {/*<button onClick={reset}>Reset</button>*/}
                    </div>
                </form>
                <h1 className="title">List Music</h1>
                <div className="btnAddn">
                    <Link to="/create" className="btnAdd">Dang ky bai hat+</Link>
                </div>
                <table>
                    <thead>
                    <tr className="row">
                        <th>STT</th>
                        <th>Tên bài hát</th>
                        <th>Ca sĩ</th>
                        <th>Thời gian phát</th>
                        <th>Số lượng yêu thích</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {record.length > 0 ? (
                        record.map((music, key) => (
                            <tr key={key}>
                                <td>{firstIndex + key + 1}</td>
                                <td>{music.ten}</td>
                                <td>{music.caSi}</td>
                                {/*<td>{Moment(music.thoiGian).format("hh:mm")}</td>*/}
                                <td>{music.thoiGian}</td>
                                {
                                    music.soYeuThich !== 0 ? (<td defaultValue={0}>{music.soYeuThich}</td>) : <td>{like}</td>
                                }
                                <td>{music.states.tt}</td>
                                <td className="button">
                                    <button className="btn3" onClick={handleBt}>Công khai</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">
                                <NotFound />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <nav>
                    <ul>
                        <li className='page-item'>
                            <a className='page-link' href='#' onClick={changePrev}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) =>(
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a className='page-link' href="#" onClick={() => changeNPage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a className='page-link' href="#" onClick={changeNext}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default ListMusic;