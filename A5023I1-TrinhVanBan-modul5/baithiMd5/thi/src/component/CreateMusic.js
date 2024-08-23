import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Music from "../service/MusicService"
import React, {useEffect, useState} from 'react';
import "../css/Create.css"
import * as Yup from 'yup';
import axios from "axios";
import {toast} from "react-toastify";

function CreateMusic(){
    const [stateMusic, setStateMusic] = useState({
        ten: '',
        caSi: '',
        nhacSi:'',
        thoiGian: '',
        soYeuThich: 0,
        states: {
            tt:'Luu tru'
        }
    })
    const navigate = useNavigate();
    const validationSchema= {
        ten: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        caSi: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        nhacSi: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        thoiGian: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
    };


    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.states = stateMusic.states;
            values.soYeuThich = stateMusic.soYeuThich;
            await Music.saveMusic(values);
            toast.success("Thêm mới thành công 🤩");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra");
        } finally {
            setSubmitting(false);
        }
    };


    return(
        <Formik
            initialValues={stateMusic} onSubmit={handleSubmit} validationSchema={Yup.object(validationSchema)}>
            <div className="container">
                <div className="form">
                    <div className="title" style={{ textAlign: 'left', marginBottom: '25px', fontWeight:'700'}}>
                        <h2>Create Product</h2>
                    </div>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="ten">Ten bai hat</label>
                            <Field type="text" name="ten" placeholder="Enter"
                            ></Field>
                            <ErrorMessage className="err" name="ten" component="div"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="caSi">Ca si</label>
                            <Field type="text" name="caSi" placeholder="Enter"
                            ></Field>
                            <ErrorMessage className="err" name="caSi" component="div"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nhacSi">Nhac si</label>
                            <Field type="text" name="nhacSi" placeholder="Enter"
                            ></Field>
                            <ErrorMessage className="err" name="nhacSi" component="div"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="thoiGian">Thoi gian phat</label>
                            <Field type="time" name="thoiGian" placeholder="Enter"
                            ></Field>
                            <ErrorMessage className="err" name="thoiGian" component="div"/>
                        </div>

                        <button type="submit">Create</button>
                        <Link to="/"><button className="backbtn">Back</button></Link>
                    </Form>
                </div>
            </div>
        </Formik>
    )
}
export default CreateMusic;