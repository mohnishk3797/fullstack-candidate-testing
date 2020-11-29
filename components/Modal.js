import { useState, useEffect } from 'react'

export default function Modal({ content }) {

    const [modalContent, setModalContent] = useState(content)
    useEffect(() => {
        const timer = setInterval(() => {
            setModalContent(modalContent + '.')
        }, 250);
        return () => clearInterval(timer);
    });
    return (
        <div className="container h-screen flex items-center justify-center w-full absolute">
            <div className="container flex justify-center rounded-lg shadow-lg bg-blue-500 text-white w-6/12 p-6 content-center">
                {modalContent}
            </div>
        </div>
    )

}

