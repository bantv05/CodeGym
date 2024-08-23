import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Music from "../service/MusicService";
import React, { useEffect, useState } from 'react';
import "../css/Create.css";
import * as Yup from 'yup';
import { toast } from "react-toastify";

function UpdateMusic() {
    const { id } = useParams(); // Lấy ID từ URL
    const [music, setMusic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await Music.getMusic(id); // Hàm lấy dữ liệu bài hát
                setMusic(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Không thể tải dữ liệu bài hát.");
            }
        };

        fetchMusic();
    }, [id]);

    const validationSchema = Yup.object({
        ten: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        caSi: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        nhacSi: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
        thoiGian: Yup.string().required("Khong duoc de trong").max(30, "khong duoc qua 30 ki tu"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await Music.updateMusic(id, values); // Cập nhật bài hát
            toast.success("Cập nhật thành công 🤩");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra");
        } finally {
            setSubmitting(false);
        }
    };

    if (!music) {
        return <div>Loading...</div>; // Hiển thị trạng thái tải dữ liệu
    }

    return (
        <Formik
            initialValues={music}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <div className="container">
                    <div className="form">
                        <div className="title" style={{ textAlign: 'left', marginBottom: '25px', fontWeight: '700' }}>
                            <h2>Update Music</h2>
                        </div>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="ten">Tên bài hát</label>
                                <Field type="text" name="ten" placeholder="Enter" />
                                <ErrorMessage className="err" name="ten" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="caSi">Ca sĩ</label>
                                <Field type="text" name="caSi" placeholder="Enter" />
                                <ErrorMessage className="err" name="caSi" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nhacSi">Nhạc sĩ</label>
                                <Field type="text" name="nhacSi" placeholder="Enter" />
                                <ErrorMessage className="err" name="nhacSi" component="div" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="thoiGian">Thời gian phát</label>
                                <Field type="time" name="thoiGian" placeholder="Enter" />
                                <ErrorMessage className="err" name="thoiGian" component="div" />
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                Update
                            </button>
                            <Link to="/"><button className="backbtn">Back</button></Link>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default UpdateMusic;
