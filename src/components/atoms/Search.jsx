const Search = ({ placeholder, value, handleChange, ariaLabel }) => {

    return (
        <input
            type="text"
            placeholder={ placeholder }
            className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={ value }
            onChange={ handleChange }
            aria-label={ ariaLabel }
        />
    );
};

export default Search;