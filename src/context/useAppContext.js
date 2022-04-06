import { createContext, useContext, useState } from 'react';
import router from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    console.log('🚀 ~ file: useAppContext.js ~ line 11 ~ AppProvider ~ product', products);

    const storage = () => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return null;
        }
    };
    const [user, setUser] = useState(storage);
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

    const addProduct = (product) => {
        console.log('🚀 ~ file: useAppContext.js ~ line 41 ~ addProduct ~ product', product);
        const existingProduct = products.find((prod) => prod.course_id === product.course_id);

        if (existingProduct) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>',
            });
        } else {
            setProducts([...products, product]);
            router.push('/checkout');
        }
    };

    //Total Quantity in Cart
    const productsQuantity = () => {
        return products.reduce((acc, product) => (acc += product.quantity), 0);
    };

    // Delete Product from List
    const deleteProduct = (id) => {
        products.splice(
            products.findIndex((product) => product.id === id),
            1
        );
        setProducts([...products]);
    };

    // Total $ Shopping Cart
    const totalPrice = () => {
        return products.reduce((acc, product) => (acc += product.quantity * product.price), 0);
    };

    const emptyCart = () => {
        products.splice(0, products.length);
        return setProducts([...products]);
    };
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                getUser,
                addProduct,
                deleteProduct,
                totalPrice,
                emptyCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default useAppContext;
