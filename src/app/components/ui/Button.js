function Button({text, onClick, type}) {
    return (
        <button
            className="bg-black hover:bg-gray-800 font-bold text-white py-1 px-3 rounded"
            onClick={onClick}
                type={type || 'button'}>

            {text}
        </button>
    );
}

export default Button;