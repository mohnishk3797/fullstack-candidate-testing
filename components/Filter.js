import { parseFilterName, thousandsFormatNumber } from '../utils'
export default function Filter({ filters, apply, selectedFilter }) {

    const handleClick = (key, value) => {
        apply(key, value)
    }

    const isSelectedFormat = (key, value) => {
        if (key in selectedFilter && selectedFilter[key] == value) {
            return "text-sm font-medium"
        }
        return "text-sm"
    }


    let filtersToDisplay = Object.keys(filters).map((key) => {
        return (<div className="bg-white m-3 px-10 max-w-full"
            key={key}><p className="font-medium text-black">{parseFilterName(key)}</p>
            {filters[key].map(value => {
                return (
                    <div key={value.key}>
                        <label className={isSelectedFormat(key, value.key)} onClick={handleClick.bind(this, key, value.key)}>{value.key}&nbsp;&nbsp;&nbsp;</label>
                        <label className="text-xs text-gray-500">{thousandsFormatNumber(value.doc_count)}</label>
                    </div>)
            })
            }
        </div >)
    })

    return (
        <div>
            {filtersToDisplay}
        </div>

    );
}