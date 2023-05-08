import {FC, ReactNode} from "react";
import "./FieldValueTable.css"

interface FieldValueTableProps {
  data:Record<string, ReactNode>;
}

const FieldValueTable:FC<FieldValueTableProps> = (props) => {
  return (
    <div className="field-value-table">
      {
        Object.entries(props.data).map( (entry:[string, ReactNode]) =>
          <div className="field-value-row row">
            <div className="field-col col-3 col-md-3">{entry[0]}</div>
            <div className="value-col col-9 col-md-3">{entry[1]}</div>
          </div>
        )
      }
    </div>
  )
}

export default FieldValueTable;