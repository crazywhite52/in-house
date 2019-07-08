// src/components/CatInputs.js
import React from "react"
const CatInputs = (props) => {
  return (
    props.cats.map((val, idx)=> {
      let rentId = `rent-${idx}`, serviceId = `service-${idx}`,centerchargeId = `centercharge-${idx}`, noteId = `note-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={rentId}>{`ค่าเช่า #${idx + 1}`}</label>
          <input
            type="text"
            name={rentId}
            data-id={idx}
            id={rentId}
            value={props.cats[idx].list} 
            className="form-control form-control-sm"
          />
          <label htmlFor={serviceId}>{`ค่าบริการ #${idx + 1}`}</label>
          <input
            type="text"
            name={serviceId}
            data-id={idx}
            id={serviceId}
            value={props.cats[idx].service} 
            className="form-control form-control-sm"
          />
          <label htmlFor={centerchargeId}>{`ค่าบริการส่วนกลาง #${idx + 1}`}</label>
          <input
            type="text"
            name={centerchargeId}
            data-id={idx}
            id={centerchargeId}
            value={props.cats[idx].centercharge} 
            className="form-control form-control-sm"
          />
          <label htmlFor={noteId}>{`หมายเหตุ #${idx + 1}`}</label>
          <input
            type="text"
            name={noteId}
            data-id={idx}
            id={noteId}
            value={props.cats[idx].note} 
            className="form-control form-control-sm"
          />
        </div>
      )
    })
  )
}
export default CatInputs
