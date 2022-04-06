import { createContext, useContext, useState } from 'react';
import router from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [product, setProduct] = useState([]);

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
        setProduct([product]);
        router.push('/checkout');
    };

    //Total Quantity in Cart
    const productsQuantity = () => {
        return product.reduce((acc, product) => (acc += product.quantity), 0);
    };

    // Delete Product from List
    const deleteProduct = (id) => {
        product.splice(
            product.findIndex((product) => product.id === id),
            1
        );
        setProduct([...product]);
    };

    // Total $ Shopping Cart
    const totalPrice = () => {
        return product.reduce((acc, product) => (acc += product.quantity * product.price), 0);
    };

    const emptyCart = () => {
        product.splice(0, product.length);
        return setProduct([...product]);
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
                product,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default useAppContext;
