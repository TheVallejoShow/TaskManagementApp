const Search = ({ placeholder, value, handleChange, ariaLabel }) => {

    return (
        <input
            type="text"
            placeholder={ placeholder }
            className="border rounded px-3 py-2 mb-4 w-full"
            value={ value }
            onChange={ handleChange }
            aria-label={ ariaLabel }
        />
    );
};

export default Search;