import { createContext, useContext, useState } from 'react';
import router from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStorage } from '../hooks/useStorage';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const storage = () => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return null;
        }
    };

    const [user, setUser] = useState(storage);
    const [courseCart, setCourseCart] = useStorage('course', {});

    const getUser = async () => {
        const url = 'http://164.92.76.51:3000/user/' + user?.data?.user_id;
        try {
            const res = await axios.get(`${url}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUser({ message: 'OK', data: res.data.data[0], token: user?.token });
            localStorage.setItem(
                'user',
                JSON.stringify({ message: 'OK', data: res.data.data[0], token: user?.token })
            );
        } catch (error) {
            localStorage.setItem('user', null);
            console.log('error: ', error);
            router.push('/');
        }
        return user;
    };

    const addCourse = (course, schedule_id) => {
        setCourseCart({ ...course, schedule_id });
        router.push('/checkout');
    };

    // Delete Product from List
    const deleteProduct = (id) => {
        courseCart.splice(
            courseCart.findIndex((course) => course.id === id),
            1
        );
        setProduct([...courseCart]);
    };

    const emptyCart = () => {
        courseCart.splice(0, courseCart.length);
        return setProduct([...courseCart]);
    };
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                getUser,
                addCourse,
                deleteProduct,
                emptyCart,
                courseCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default useAppContext;
