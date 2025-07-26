import { useState, useEffect } from "react";
import { useAuth } from "../../contex/auth.js";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API}api/v1/auth/admin-auth`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setOk(res.data.ok);
                if (!res.data.ok) navigate("/login");
            } catch (err) {
                setOk(false);
                navigate("/login");
            }
        };

        if (auth?.token) authCheck();
        else navigate("/login");
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}
