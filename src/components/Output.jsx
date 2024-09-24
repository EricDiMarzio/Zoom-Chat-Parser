
import { useAtom } from 'jotai';
import {contentArrAtom, oneCountAtom} from '../state/atoms'

function Output() {
  const [contentArr] = useAtom(contentArrAtom);
  const [oneCount] = useAtom(oneCountAtom);
    return (
        <div className='side output'>
        <ul className="outputList">{contentArr}</ul>
        <h2>Score: {oneCount}</h2>
      </div>
    )
}

export default Output
