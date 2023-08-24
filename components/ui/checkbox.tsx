interface Props {
    isChecked: boolean
    label: string
    checkHandler: () => void
    index: number
}

const Checkbox: React.FC<Props> = ({ isChecked, label, checkHandler, index }) => {
    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
                className="mr-4"
            />
            <label 
                htmlFor={`checkbox-${index}`}
                className="text-lg font-medium"
            >{label}</label>
        </div>
    )
}

export default Checkbox