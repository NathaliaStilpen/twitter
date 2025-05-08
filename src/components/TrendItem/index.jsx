import PropTypes from "prop-types"

export function TrendItem ({category, name, TweetCount}) {

    return(
        <div className="py-3 hoverÇ bg-gray-800 transition duration-200 cursor-pointer">
            <p className="text-gray-500 text-sm">{category}</p>
            <p className="text-bold">{name}</p>
            { TweetCount && <p className="text-gray-500 text-sm">{TweetCount}</p> }
        </div>
    )

}

TrendItem.prototype = {
    category: PropTypes.string,
    name: PropTypes.string,
    TweetCount: PropTypes.string
}