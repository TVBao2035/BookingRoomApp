import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";



export default function Pagination({isNext, isPrevious, pageNumber, fnNext, fnPrevious}) {

  return (
    <div className='d-flex fs-5 justify-content-center gap-4 align-items-center text-primary user-select-none'>
          <div 
              className={isPrevious ? 'd-flex align-items-center border p-1' : 'd-flex align-items-center border p-1 text-secondary' }
            onClick={isPrevious ? fnPrevious : ()=>{}}
          ><GrFormPrevious className=''/></div>

          <div className='d-flex align-items-center'>{pageNumber}</div>
        <div 
              className={isNext ? 'd-flex align-items-center border p-1' : 'd-flex align-items-center border p-1 text-secondary'}
            onClick={isNext ? fnNext : ()=> {}}
        ><MdNavigateNext/></div>
    </div>
  )
}
